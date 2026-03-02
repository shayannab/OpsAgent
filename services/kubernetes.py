from kubernetes import client, config
from models.schemas import Pod, ClusterStatus
from datetime import datetime, timezone

config.load_kube_config()

def get_cluster_status() -> ClusterStatus:
    v1 = client.CoreV1Api()
    pods = v1.list_pod_for_all_namespaces()
    
    pod_list = []
    running = pending = failed = 0

    for pod in pods.items:
        restarts = 0
        if pod.status.container_statuses:
            restarts = sum(c.restart_count for c in pod.status.container_statuses)
        
        phase = pod.status.phase or "Unknown"
        if phase == "Running": running += 1
        elif phase == "Pending": pending += 1
        elif phase == "Failed": failed += 1

        pod_list.append(Pod(
            name=pod.metadata.name,
            namespace=pod.metadata.namespace,
            status=phase,
            restarts=restarts
        ))

    return ClusterStatus(
        total_pods=len(pod_list),
        running=running,
        pending=pending,
        failed=failed,
        pods=pod_list
    )

def restart_pod(pod_name: str, namespace: str) -> bool:
    try:
        v1 = client.CoreV1Api()
        v1.delete_namespaced_pod(name=pod_name, namespace=namespace)
        return True
    except Exception as e:
        print(f"Failed to restart pod {pod_name}: {e}")
        return False

def get_failed_pods():
    status = get_cluster_status()
    return [p for p in status.pods if p.status == "Failed" or p.restarts > 5]
