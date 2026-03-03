import httpx
import os
from datetime import datetime

SLACK_WEBHOOK_URL = os.environ.get("SLACK_WEBHOOK_URL")

async def send_slack_alert(pod_name: str, namespace: str, status: str, counts: int, reason: str = None):
    if not SLACK_WEBHOOK_URL:
        print(f"🤫 Slack webhook not configured. Alert for {pod_name} suppressed.")
        return

    color = "#dc2626" if status == "Failed" else "#f59e0b"
    emoji = "🚨" if status == "Failed" else "⚠️"
    
    payload = {
        "attachments": [
            {
                "fallback": f"{emoji} OpsAgent Alert: {pod_name} is {status}",
                "color": color,
                "title": f"{emoji} Pod Alert: {pod_name}",
                "fields": [
                    {"title": "Namespace", "value": namespace, "short": True},
                    {"title": "Status", "value": status, "short": True},
                    {"title": "Restarts", "value": str(counts), "short": True},
                    {"title": "Time", "value": datetime.now().strftime("%H:%M:%S"), "short": True},
                ],
                "text": f"*Analysis:* {reason}" if reason else "*Action:* Pod needs attention.",
                "footer": "OpsAgent Intelligence Engine",
                "ts": int(datetime.now().timestamp())
            }
        ]
    }

    try:
        async with httpx.AsyncClient() as client:
            res = await client.post(SLACK_WEBHOOK_URL, json=payload, timeout=10)
            if res.status_code != 200:
                print(f"⚠️  Slack API error: {res.status_code} - {res.text}")
    except Exception as e:
        print(f"⚠️  Failed to send Slack alert: {e}")

async def send_heal_notification(pod_name: str, action: str, explanation: str):
    if not SLACK_WEBHOOK_URL:
        return

    payload = {
        "attachments": [
            {
                "color": "#00c566",
                "title": f"⚡ Auto-Heal Triggered: {pod_name}",
                "text": f"*Action:* {action}\n*AI Justification:* {explanation}",
                "footer": "OpsAgent Self-Healing Loop"
            }
        ]
    }

    try:
        async with httpx.AsyncClient() as client:
            await client.post(SLACK_WEBHOOK_URL, json=payload, timeout=10)
    except Exception:
        pass
