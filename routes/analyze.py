from fastapi import APIRouter
from services.kubernetes import get_cluster_status
from services.ai import analyze_cluster

router = APIRouter(prefix="/analyze", tags=["analyze"])

@router.get("/")
def analyze():
    status = get_cluster_status()
    return analyze_cluster(status)

@router.get("/quick")
def quick_analyze():
    status = get_cluster_status()
    health_score = (status.running / status.total_pods) * 100 if status.total_pods > 0 else 0
    return {
        "health_score": round(health_score, 1),
        "running": status.running,
        "failed": status.failed,
        "pending": status.pending,
        "needs_attention": status.failed > 0 or status.pending > 0
    }
