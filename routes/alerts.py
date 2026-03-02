from fastapi import APIRouter
from services.kubernetes import get_cluster_status, restart_pod, get_failed_pods
from services.ai import explain_healing, analyze_cluster
from models.schemas import HealingAction
from datetime import datetime

router = APIRouter(prefix="/alerts", tags=["alerts"])

healing_history = []

@router.get("/")
def get_alerts():
    status = get_cluster_status()
    result = analyze_cluster(status)
    return {
        "alerts": result.alerts,
        "recommendations": result.recommendations,
        "timestamp": result.timestamp
    }

@router.get("/failed-pods")
def failed_pods():
    return {"failed_pods": get_failed_pods()}

@router.post("/heal")
def heal_cluster():
    failed = get_failed_pods()
    if not failed:
        return {"message": "All pods healthy, nothing to heal 🎉", "actions": []}
    actions = []
    for pod in failed:
        reason = f"Pod status is {pod.status} with {pod.restarts} restarts"
        explanation = explain_healing(pod.name, reason)
        success = restart_pod(pod.name, pod.namespace)
        action = HealingAction(
            pod_name=pod.name,
            namespace=pod.namespace,
            action="restart",
            reason=explanation,
            timestamp=datetime.now(),
            success=success
        )
        actions.append(action)
        healing_history.append(action)
    return {"message": f"Healed {len(actions)} pods", "actions": actions}

@router.get("/healing-history")
def get_healing_history():
    return {"history": healing_history}
