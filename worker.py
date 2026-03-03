import asyncio
import logging
from services.kubernetes import get_cluster_status, restart_pod
from services.ai import analyze_cluster, explain_healing
from services.slack import send_slack_alert, send_heal_notification
from services.history import add_to_history
from models.schemas import HealingAction
from datetime import datetime

# Configuration
POLL_INTERVAL = 60  # seconds
AUTO_HEAL_ENABLED = False  # Toggle this via API
ALREADY_ALERTED = set()

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("OpsAgentWorker")

async def monitoring_loop():
    global AUTO_HEAL_ENABLED
    logger.info("🚀 OpsAgent Monitoring Worker started.")
    
    while True:
        try:
            status = get_cluster_status()
            failed_pods = [p for p in status.pods if p.status == "Failed" or p.restarts > 5]
            
            # Reset alerts for pods that are now healthy
            current_pod_names = {p.name for p in status.pods}
            for pod in list(ALREADY_ALERTED):
                if pod not in current_pod_names:
                    ALREADY_ALERTED.remove(pod)

            for pod in failed_pods:
                if pod.name not in ALREADY_ALERTED:
                    logger.warning(f"🚨 Issue detected: {pod.name} in {pod.namespace}")
                    
                    # Get AI Analysis for context
                    analysis = analyze_cluster(status)
                    await send_slack_alert(
                        pod.name, 
                        pod.namespace, 
                        pod.status, 
                        pod.restarts, 
                        analysis.analysis
                    )
                    ALREADY_ALERTED.add(pod.name)

                    # Auto-Heal if enabled
                    if AUTO_HEAL_ENABLED:
                        logger.info(f"⚡ Auto-Healing {pod.name}...")
                        reason = f"Status: {pod.status}, Restarts: {pod.restarts}"
                        explanation = explain_healing(pod.name, reason)
                        
                        success = restart_pod(pod.name, pod.namespace)
                        if success:
                            action = HealingAction(
                                pod_name=pod.name,
                                namespace=pod.namespace,
                                action="restart",
                                reason=explanation,
                                timestamp=datetime.now(),
                                success=True
                            )
                            add_to_history(action)
                            await send_heal_notification(pod.name, "Restarted Pod", explanation)
                            logger.info(f"✅ Successfully healed {pod.name}")
                        else:
                            logger.error(f"❌ Failed to heal {pod.name}")

        except Exception as e:
            logger.error(f"Worker Error: {e}")
            
        await asyncio.sleep(POLL_INTERVAL)

def start_worker():
    loop = asyncio.get_event_loop()
    if loop.is_running():
        asyncio.create_task(monitoring_loop())
    else:
        asyncio.run(monitoring_loop())

if __name__ == "__main__":
    asyncio.run(monitoring_loop())
