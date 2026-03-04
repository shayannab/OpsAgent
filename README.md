# 🚀 OpsAgent

**AI-Powered Kubernetes Monitoring & Self-Healing**

OpsAgent is a modern monitoring engine that uses AI to analyze cluster health, detect failures, and automatically heal pods. It bridges the gap between raw telemetry and actionable intelligence.

---

## ✨ Features

- **🤖 AI Diagnosis**: Analyzes pod failures using LLMs (Groq/Llama) to provide human-readable justifications for issues.
- **⚡ Self-Healing**: Automated pod restarts and healing actions based on AI-driven decisions.
- **📊 Real-time Dashboard**: A premium, atmospheric UI for monitoring cluster status at a glance.
- **📈 Prometheus Integration**: Native `/metrics` endpoint for long-term trend analysis and Grafana dashboards.
- **💬 Slack Notifications**: Instant, detailed alerts sent to your team for every critical event and healing action.
- **🎡 Helm Ready**: Packaged for production-grade deployment on any Kubernetes cluster.
- **🏗️ CI/CD Integrated**: GitHub Actions pipelines for automated testing and container image builds.

---

## 🛠️ Architecture

OpsAgent consists of three main components:
1. **The API**: A FastAPI backend that serves as the brain, managing settings and cluster interaction.
2. **The Worker**: A background monitoring loop that watches the cluster and triggers the AI analysis.
3. **The Frontend**: A sleek, React-powered dashboard for real-time visualization.

---

## 🚀 Quick Start

### 1. Prerequisites
- A running Kubernetes cluster (or a valid `~/.kube/config`).
- [Groq API Key](https://console.groq.com/) for AI insights.
- [Slack Webhook URL](https://api.slack.com/messaging/webhooks) for notifications.

### 2. Local Setup
```bash
# Install dependencies
pip install -r requirements.txt

# Set environment variables
export GROQ_API_KEY="your_key"
export SLACK_WEBHOOK_URL="your_webhook"

# Start the agent
python main.py
```

### 3. Deploy to Kubernetes (Helm)
```bash
helm install opsagent ./charts/opsagent \
  --set env.groqApiKey="your_key" \
  --set env.slackWebhookUrl="your_webhook"
```

---

## 📊 Monitoring
Metrics are available at `:8000/metrics`. Point your Prometheus instance here to start collecting data.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

---

<p align="center">
  Developed with ❤️ for the DevOps community.
</p>
