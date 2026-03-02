from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from routes import cluster, analyze, alerts
import platform
import os

app = FastAPI(
    title="OpsAgent API",
    description="AI-powered Kubernetes monitoring and healing",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cluster.router)
app.include_router(analyze.router)
app.include_router(alerts.router)

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "os": platform.system(),
        "python": platform.python_version(),
        "hostname": platform.node()
    }

@app.get("/")
@app.get("/dashboard")
def serve_dashboard():
    path = os.path.join(os.path.dirname(__file__), "dashboard.html")
    return FileResponse(path, media_type="text/html")
