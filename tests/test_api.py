from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_read_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"

def test_get_settings():
    response = client.get("/settings")
    assert response.status_code == 200
    assert "auto_heal" in response.json()

def test_cluster_status_mock():
    # Even if K8s is disconnected, it should return mock data
    response = client.get("/cluster/status")
    assert response.status_code == 200
    assert "pods" in response.json()
    assert len(response.json()["pods"]) > 0
