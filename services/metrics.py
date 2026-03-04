from prometheus_client import Counter, Gauge

# 1. Track how many Slack alerts we send
ALERTS_SENT = Counter(
    "opsagent_alerts_total", 
    "Total number of Slack alerts sent",
    ["status", "namespace"] # We can filter by status (Failed/Warning) or namespace
)

# 2. Track how many AI analyses are performed
AI_ANALYSES = Counter(
    "opsagent_ai_analysis_total", 
    "Total number of AI cluster analyses performed"
)

# 3. Track if we are currently connected to Kubernetes (1 = Yes, 0 = No)
K8S_CONNECTION = Gauge(
    "opsagent_k8s_connected", 
    "Current connection status to the Kubernetes cluster"
)
