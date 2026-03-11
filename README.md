# 🚀 OpsAgent

**AI-Powered Kubernetes Monitoring & Self-Healing**

OpsAgent is an intelligent, autonomous backend engine that watches your Kubernetes clusters, analyzes pod failures using Large Language Models, and executes self-healing actions. 

> **Note:** The backend engine (API, AI capabilities, Monitoring Worker, and Slack Alerts) is **fully implemented and operational**. The frontend dashboard is currently a work in progress.

---

## ✨ Fully Implemented Features

- **✅ Native Kubernetes Integration**: Connects seamlessly using your local `~/.kube/config` or in-cluster ServiceAccounts to monitor pod health, deployments, and restarts across all namespaces. (Includes a Mock Mode for testing without a cluster).
- **✅ AI-Driven RCA (Root Cause Analysis)**: Integrates with Groq (`llama-3.3-70b-versatile`) to provide plain-english, human-readable explanations of *why* pods are failing or restarting.
- **✅ Autonomous Self-Healing**: A background worker loop continuously monitors the cluster. When pods fail or enter crash loops, OpsAgent can automatically restart them based on AI justifications (configurable via API).
- **✅ Rich Slack Notifications**: Sends highly detailed, color-coded API-driven Slack alerts complete with pod metrics and AI analysis.
- **✅ Prometheus Metrics**: Exposes a standard `/metrics` endpoint for seamless integration into your existing Grafana & Prometheus monitoring stacks.

---

## 🛠️ Architecture

OpsAgent consists of three main components:
1. **The API (`main.py`)**: A lightning-fast FastAPI backend that serves as the control plane, exposing metrics, health checks, and configuration endpoints.
2. **The Worker (`worker.py`)**: An asynchronous background loop that actively polls Kubernetes, triggers LLM analysis on failures, issues Slack alerts, and executes healing actions.
3. **The AI Engine (`services/ai.py`)**: Bridges the raw K8s status data with prompt-engineered calls to Groq's low-latency inference endpoints.
4. **The Frontend**: *Currently undergoing a UI revamp.*

---

## 🚀 Quick Start

### 1. Prerequisites
- A running Kubernetes cluster (or a valid `~/.kube/config`).
- [Groq API Key](https://console.groq.com/) for AI insights.
- [Slack Webhook URL](https://api.slack.com/messaging/webhooks) for notifications.

### 2. Local Setup
```bash
# Clone the repository
git clone https://github.com/yourusername/opsagent.git
cd opsagent

# Install Python dependencies
pip install -r requirements.txt

# Set required environment variables
export GROQ_API_KEY="your_groq_api_key"
export SLACK_WEBHOOK_URL="your_slack_webhook"

# Start the API & Worker
python main.py
```
*Note: OpsAgent runs on port `8000` by default. You can access the API documentation at `http://localhost:8000/docs`.*

### 3. Deploy to Kubernetes (Helm)
OpsAgent comes packaged and ready for production:
```bash
helm install opsagent ./charts/opsagent \
  --set env.groqApiKey="your_key" \
  --set env.slackWebhookUrl="your_webhook"
```

---

## ⚙️ Configuration & API

The API exposes several endpoints to control the agent:
- `GET /health`: Detailed system health (Python version, K8s connectivity, AI status).
- `GET /settings`: View current worker settings.
- `POST /settings/toggle-heal`: Enable or disable the autonomous Self-Healing loop.
- `GET /metrics`: Prometheus-compatible telemetry endpoint.

## 🤝 Contributing
Contributions are welcome! Whether it's adding a new AI provider, expanding the Kubernetes metrics we collect, or building out the UI, please feel free to submit a Pull Request.

---

<p align="center">
  Developed with ❤️ for the DevOps community.
</p>
