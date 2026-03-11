from services.kubernetes import get_cluster_status
from services.ai import analyze_cluster

status = get_cluster_status()
result = analyze_cluster(status)

with open("debug_output.txt", "w") as f:
    f.write(f"Type: {type(result)}\n")
    f.write(f"Repr: {repr(result)}\n")
