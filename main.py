from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse
from routes import cluster, analyze, alerts
from services.ai import client as ai_client
from kubernetes import client as k8s_client, config as k8s_config
import platform
import os

app = FastAPI(
    title="OpsAgent API",
    description="AI-powered Kubernetes monitoring and healing",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

import asyncio
from worker import monitoring_loop, AUTO_HEAL_ENABLED
import worker # For settings access

# Routes
app.include_router(cluster.router)
app.include_router(analyze.router)
app.include_router(alerts.router)

@app.on_event("startup")
async def startup_event():
    # Start the monitoring loop in the background
    asyncio.create_task(monitoring_loop())

@app.get("/settings")
def get_settings():
    return {
        "auto_heal": worker.AUTO_HEAL_ENABLED,
        "poll_interval": worker.POLL_INTERVAL
    }

@app.post("/settings/toggle-heal")
def toggle_heal():
    worker.AUTO_HEAL_ENABLED = not worker.AUTO_HEAL_ENABLED
    return {"message": f"Auto-heal {'enabled' if worker.AUTO_HEAL_ENABLED else 'disabled'}"}

@app.get("/health")
def health():
    k8s_status = "Disconnected"
    try:
        k8s_config.load_kube_config()
        v1 = k8s_client.CoreV1Api()
        v1.get_api_resources()
        k8s_status = "Connected"
    except Exception:
        pass

    return {
        "status": "healthy",
        "os": platform.system(),
        "python": platform.python_version(),
        "kubernetes": k8s_status,
        "ai_service": "Connected" if ai_client else "Mock Mode (No API Key)",
        "hostname": platform.node()
    }

# Serve Static Files
frontend_dist = os.path.join(os.path.dirname(__file__), "frontend", "dist")

if os.path.exists(frontend_dist):
    app.mount("/", StaticFiles(directory=frontend_dist, html=True), name="frontend")
else:
    @app.get("/")
    @app.get("/dashboard")
    def serve_dashboard():
        path = os.path.join(os.path.dirname(__file__), "dashboard.html")
        if os.path.exists(path):
            return FileResponse(path, media_type="text/html")
        return JSONResponse(status_code=404, content={"message": "Frontend not built. Please run 'npm run build' in frontend directory."})
