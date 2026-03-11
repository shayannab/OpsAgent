import traceback
from services.kubernetes import get_cluster_status
from services.ai import analyze_cluster

try:
    status = get_cluster_status()
    result = analyze_cluster(status)
    print("Type of result:", type(result))
    print("Result representation:", repr(result))
except Exception as e:
    print("CRASHED!")
    traceback.print_exc()
