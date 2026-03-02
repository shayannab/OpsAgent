from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class Pod(BaseModel):
    name: str
    namespace: str
    status: str
    restarts: int
    age: Optional[str] = None

class ClusterStatus(BaseModel):
    total_pods: int
    running: int
    pending: int
    failed: int
    pods: List[Pod]

class AnalysisResult(BaseModel):
    timestamp: datetime
    cluster_status: ClusterStatus
    analysis: str
    alerts: List[str]
    recommendations: List[str]

class HealingAction(BaseModel):
    pod_name: str
    namespace: str
    action: str
    reason: str
    timestamp: datetime
    success: bool
