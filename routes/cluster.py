from fastapi import APIRouter
from services.kubernetes import get_cluster_status

router = APIRouter(prefix="/cluster", tags=["cluster"])

@router.get("/status")
def cluster_status():
    return get_cluster_status()

@router.get("/pods")
def list_pods():
    status = get_cluster_status()
    return {"pods": status.pods}

@router.get("/health")
def cluster_health():
    status = get_cluster_status()
    health_score = (status.running / status.total_pods) * 100 if status.total_pods > 0 else 0
    return {
        "health_score": round(health_score, 1),
        "status": "healthy" if health_score == 100 else "degraded" if health_score > 50 else "critical",
        "summary": f"{status.running}/{status.total_pods} pods running"
    }
