from kubernetes import client, config
from models.schemas import Pod, ClusterStatus
from datetime import datetime, timezone

# Global flag for K8s connectivity
K8S_CONNECTED = False

try:
    config.load_kube_config()
    # Check if the cluster is actually reachable
    v1 = client.CoreV1Api()
    v1.list_namespace(timeout_seconds=2)
    K8S_CONNECTED = True
    print("✅ Kubernetes cluster connected.")
except Exception:
    K8S_CONNECTED = False
    print("⚠️  Cluster unreachable or no kubeconfig found. Running in MOCK MODE.")

def get_mock_status() -> ClusterStatus:
    pod_list = [
        Pod(name="opsagent-api-7d4b4f5f-abcde", namespace="default", status="Running", restarts=0),
        Pod(name="opsagent-tui-8b9c2d1e-fghij", namespace="default", status="Running", restarts=0),
        Pod(name="db-postgres-0", namespace="prod", status="Running", restarts=1),
        Pod(name="redis-master", namespace="prod", status="Failed", restarts=12),
        Pod(name="auth-service-v2", namespace="staging", status="Pending", restarts=0),
    ]
    return ClusterStatus(
        total_pods=5,
        running=3,
        pending=1,
        failed=1,
        pods=pod_list
    )

def get_cluster_status() -> ClusterStatus:
    if not K8S_CONNECTED:
        return get_mock_status()
        
    try:
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
    except Exception:
        return get_mock_status()

def restart_pod(pod_name: str, namespace: str) -> bool:
    if not K8S_CONNECTED:
        print(f"[MOCK] Restarted pod {pod_name} in {namespace}")
        return True
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
