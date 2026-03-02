from groq import Groq
import os
from models.schemas import ClusterStatus, AnalysisResult, HealingAction
from datetime import datetime

client = Groq(api_key=os.environ.get("GROQ_API_KEY"))

def analyze_cluster(status: ClusterStatus) -> AnalysisResult:
    pod_summary = "\n".join([
        f"- {p.name} in {p.namespace}: {p.status} (restarts: {p.restarts})"
        for p in status.pods
    ])

    prompt = f"""
You are an expert DevOps engineer analyzing a Kubernetes cluster.

Cluster Summary:
- Total pods: {status.total_pods}
- Running: {status.running}
- Pending: {status.pending}
- Failed: {status.failed}

Pod Details:
{pod_summary}

Respond in this exact format:
ANALYSIS: <2-3 sentence plain english summary>
ALERTS: <comma separated list of alerts, or 'none'>
RECOMMENDATIONS: <comma separated list of recommendations, or 'none'>
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are an expert DevOps engineer. Be concise and practical."},
            {"role": "user", "content": prompt}
        ]
    )

    content = response.choices[0].message.content
    
    # Parse response
    lines = content.strip().split("\n")
    analysis = alerts = recommendations = ""
    
    for line in lines:
        if line.startswith("ANALYSIS:"): analysis = line.replace("ANALYSIS:", "").strip()
        elif line.startswith("ALERTS:"): alerts = line.replace("ALERTS:", "").strip()
        elif line.startswith("RECOMMENDATIONS:"): recommendations = line.replace("RECOMMENDATIONS:", "").strip()

    alert_list = [] if alerts.lower() == "none" else [a.strip() for a in alerts.split(",")]
    rec_list = [] if recommendations.lower() == "none" else [r.strip() for r in recommendations.split(",")]

    return AnalysisResult(
        timestamp=datetime.now(),
        cluster_status=status,
        analysis=analysis,
        alerts=alert_list,
        recommendations=rec_list
    )

def explain_healing(pod_name: str, reason: str) -> str:
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": "You are a DevOps engineer. Explain in one sentence why you restarted a pod."},
            {"role": "user", "content": f"Pod {pod_name} was restarted because: {reason}"}
        ]
    )
    return response.choices[0].message.content

