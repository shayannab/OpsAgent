from models.schemas import HealingAction
from datetime import datetime
import json
import os

# In-memory history for fast API access
healing_history = []
LOG_FILE = "opsagent.log"

def add_to_history(action: HealingAction):
    global healing_history
    healing_history.insert(0, action) # Newest first
    # Keep only last 50 items in memory
    healing_history = healing_history[:50]
    
    # Also log to file for "DevOps" auditing
    log_entry = {
        "timestamp": action.timestamp.isoformat(),
        "pod": action.pod_name,
        "namespace": action.namespace,
        "action": action.action,
        "success": action.success,
        "reason": action.reason
    }
    
    with open(LOG_FILE, "a") as f:
        f.write(json.dumps(log_entry) + "\n")

def get_history():
    return healing_history
