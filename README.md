# OpsAgent 🤖

> AI-powered Kubernetes monitoring and auto-healing platform. OpsAgent watches your cluster, diagnoses issues using LLMs, and heals crashed pods automatically — with Slack alerts delivered in real time.

**Live Demo → [opsagent-five.vercel.app](https://opsagent-five.vercel.app)**

---

## What it does

OpsAgent continuously monitors your Kubernetes cluster and uses Groq's Llama 3 model to diagnose pod failures. When a pod crashes, OpsAgent restarts it automatically and sends a Slack notification — no manual intervention needed.

- 🔍 **Real-time pod monitoring** via Kubernetes API
- 🧠 **AI diagnostics** powered by Groq / Llama 3.3 70B
- 🔧 **Auto-healing** — detects crashed pods and restarts them automatically
- 💬 **Slack alerts** on every heal action
- 📊 **React dashboard** with live event stream and cluster health overview
- 🖥️ **Textual TUI** for terminal-based monitoring

---

## Tech Stack

| Layer | Tech |
|---|---|
| Backend | Python, FastAPI |
| AI | Groq API (llama-3.3-70b-versatile) |
| Kubernetes | minikube, kubectl, Python k8s client |
| Frontend | React, Tailwind CSS, Framer Motion |
| Notifications | Slack Webhooks |
| Containerization | Docker |

---

## Getting Started

### Prerequisites

- Python 3.10+
- Node.js 18+
- Docker Desktop
- minikube
- A Groq API key → [console.groq.com](https://console.groq.com)
- A Slack Webhook URL → [Slack Incoming Webhooks](https://api.slack.com/messaging/webhooks)

### 1. Clone the repo

```bash
git clone https://github.com/shayannab/opsagent.git
cd opsagent
```

### 2. Set up environment variables

Create a `.env` file in the `backend/` directory:

```env
GROQ_API_KEY=your_groq_api_key
SLACK_WEBHOOK_URL=your_slack_webhook_url
```

### 3. Start minikube

```bash
minikube start
```

### 4. Run the backend

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 5. Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

---

## How auto-healing works

1. OpsAgent polls your minikube cluster every few seconds
2. If a pod enters `CrashLoopBackOff` or `Failed` state, it's flagged
3. Groq / Llama 3 diagnoses the failure and generates a summary
4. OpsAgent restarts the pod via the Kubernetes API
5. A Slack notification is sent with pod name, status, and AI diagnosis

---

## Slack Setup

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create an app
2. Enable **Incoming Webhooks** and add it to your workspace
3. Copy the webhook URL
4. Paste it as `SLACK_WEBHOOK_URL` in your `.env` file

---

## Project Structure

```
opsagent/
├── frontend/          # React App
│   └── src/
├── charts/            # Helm charts
├── models/            # Data models
├── routes/            # FastAPI route handlers
├── services/          # Business logic & integrations
├── tests/             # Test suite
├── main.py            # FastAPI app entrypoint
├── worker.py          # Background worker
├── start.py           # Startup script
├── Dockerfile
├── requirements.txt
└── README.md
```



## Author

Built by [Shayanna](https://github.com/shayannab) 

---

## License

MIT
