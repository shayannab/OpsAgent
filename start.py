import os
import subprocess
import time
import sys
import argparse
from concurrent.futures import ThreadPoolExecutor

def check_dependencies():
    print("🔍 Checking dependencies...")
    try:
        import fastapi
        import textual
        import httpx
        import kubernetes
        import groq
        from dotenv import load_dotenv
        load_dotenv() # Load local .env file if it exists
        print("✅ All dependencies found and .env loaded.")
    except ImportError as e:
        missing = e.name if hasattr(e, 'name') else str(e)
        print(f"❌ Missing dependency: {missing}")
        print("\n💡 Please run this command in your terminal:")
        print("   pip install -r requirements.txt")
        sys.exit(1)

def check_k8s():
    print("🔍 Checking Kubernetes connection...")
    from kubernetes import client, config
    try:
        config.load_kube_config()
        v1 = client.CoreV1Api()
        v1.list_namespace(timeout_seconds=2)
        print("✅ Kubernetes connection successful.")
    except Exception as e:
        print(f"⚠️  Kubernetes connection failed: {e}")
        print("💡 OpsAgent will run, but cluster data will be empty.")

def build_frontend():
    frontend_dir = os.path.join(os.getcwd(), "frontend")
    dist_dir = os.path.join(frontend_dir, "dist")
    if os.path.exists(dist_dir):
        print("✅ Frontend already built.")
        return
    
    print("🏗️  Building frontend (this may take a minute)...")
    try:
        if os.name == 'nt': # Windows/WSL handling
            subprocess.run(["npm", "install"], cwd=frontend_dir, check=True, shell=True)
            subprocess.run(["npm", "run", "build"], cwd=frontend_dir, check=True, shell=True)
        else:
            subprocess.run(["npm", "install"], cwd=frontend_dir, check=True)
            subprocess.run(["npm", "run", "build"], cwd=frontend_dir, check=True)
        print("✅ Frontend built successfully.")
    except Exception as e:
        print(f"⚠️  Frontend build failed: {e}")
        print("💡 OpsAgent will fall back to the standalone dashboard.html.")

def run_backend():
    print("🚀 Starting FastAPI backend on http://127.0.0.1:8000...")
    # Use 127.0.0.1 to match TUI expectations
    return subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "main:app", "--host", "127.0.0.1", "--port", "8000", "--log-level", "error"],
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )

def run_tui():
    print("🚀 Launching OpsAgent TUI...")
    subprocess.run([sys.executable, "tui.py"])

def main():
    parser = argparse.ArgumentParser(description="OpsAgent Orchestrator")
    parser.add_argument("--check-only", action="store_true", help="Only check dependencies and K8s")
    parser.add_argument("--skip-build", action="store_true", help="Skip frontend build")
    args = parser.parse_args()

    check_dependencies()
    check_k8s()

    if args.check_only:
        return

    if not args.skip_build:
        build_frontend()

    backend_process = None
    try:
        backend_process = run_backend()
        time.sleep(1) # Give it a second to bind
        run_tui()
    except KeyboardInterrupt:
        print("\n👋 Shutting down OpsAgent...")
    finally:
        if backend_process:
            backend_process.terminate()

if __name__ == "__main__":
    main()
