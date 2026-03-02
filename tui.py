from textual.app import App, ComposeResult
from textual.widgets import Header, Footer, DataTable, Label, Static
from textual.containers import Container, Horizontal, Vertical
from textual import work
from textual.timer import Timer
from rich.text import Text
import httpx
import asyncio
from datetime import datetime

API = "http://127.0.0.1:8000"

class StatsBar(Static):
    def update_stats(self, data):
        total = data.get("total_pods", 0)
        running = data.get("running", 0)
        failed = data.get("failed", 0)
        score = round((running / total * 100) if total > 0 else 0)
        
        color = "green" if score == 100 else "yellow" if score > 50 else "red"
        
        self.update(
            f"  PODS: [bold]{total}[/bold]  │  "
            f"RUNNING: [bold green]{running}[/bold green]  │  "
            f"FAILED: [bold red]{failed}[/bold red]  │  "
            f"HEALTH: [bold {color}]{score}%[/bold {color}]  │  "
            f"[dim]{datetime.now().strftime('%H:%M:%S')}[/dim]"
        )

class AIPanel(Static):
    def update_analysis(self, text, alerts):
        alert_str = ""
        if alerts:
            alert_str = "\n[bold red]⚠ ALERTS:[/bold red] " + " | ".join(alerts[:3])
        self.update(f"[bold cyan]🧠 AI:[/bold cyan] {text}{alert_str}")

class OpsAgentTUI(App):
    CSS = """
    Screen {
        background: $surface;
    }
    
    #stats {
        height: 1;
        background: $boost;
        padding: 0 1;
        color: $text;
    }
    
    #pod-table {
        height: 1fr;
        border: solid $primary;
        margin: 1;
    }
    
    #ai-panel {
        height: 4;
        border: solid $accent;
        margin: 0 1;
        padding: 0 1;
        background: $boost;
    }
    
    #status {
        height: 1;
        background: $boost;
        padding: 0 1;
        color: $text-muted;
    }
    """
    
    BINDINGS = [
        ("r", "refresh", "Refresh"),
        ("h", "heal", "Heal"),
        ("a", "analyze", "Analyze"),
        ("q", "quit", "Quit"),
    ]

    def compose(self) -> ComposeResult:
        yield Header(show_clock=True)
        yield StatsBar("  Connecting to cluster...", id="stats")
        yield DataTable(id="pod-table")
        yield AIPanel("  Waiting for analysis...", id="ai-panel")
        yield Static("  [dim]Auto-refreshes every 30s[/dim]", id="status")
        yield Footer()

    def on_mount(self) -> None:
        table = self.query_one(DataTable)
        table.add_columns("POD NAME", "NAMESPACE", "STATUS", "RESTARTS")
        self.title = "⚡ OpsAgent"
        self.sub_title = "AI-Powered Kubernetes Monitor"
        self.refresh_data()
        self.set_interval(30, self.refresh_data)

    @work(exclusive=True)
    async def refresh_data(self) -> None:
        try:
            async with httpx.AsyncClient() as client:
                status_res = await client.get(f"{API}/cluster/status", timeout=10)
                data = status_res.json()
                
                stats = self.query_one(StatsBar)
                stats.update_stats(data)
                
                table = self.query_one(DataTable)
                table.clear()
                
                for pod in data.get("pods", []):
                    name = pod["name"]
                    namespace = pod["namespace"]
                    status = pod["status"]
                    restarts = pod["restarts"]
                    
                    if status == "Running":
                        status_text = Text("● RUNNING", style="bold green")
                    elif status == "Failed":
                        status_text = Text("● FAILED", style="bold red")
                    else:
                        status_text = Text("● PENDING", style="bold yellow")
                    
                    restart_text = Text(
                        str(restarts),
                        style="bold red" if restarts > 3 else "white"
                    )
                    
                    ns_style = "cyan" if namespace == "default" else "magenta"
                    
                    table.add_row(
                        Text(name, style="bold white"),
                        Text(namespace, style=ns_style),
                        status_text,
                        restart_text
                    )
                
                status_el = self.query_one("#status", Static)
                status_el.update(
                    f"  [dim]Last refreshed: {datetime.now().strftime('%H:%M:%S')} "
                    f"│ {len(data.get('pods', []))} pods loaded │ "
                    f"Press [bold]R[/bold] refresh [bold]H[/bold] heal "
                    f"[bold]A[/bold] analyze [bold]Q[/bold] quit[/dim]"
                )

        except Exception as e:
            self.query_one(StatsBar).update(f"  [bold red]⚠ Connection failed: {e}[/bold red]")

    @work(exclusive=True)
    async def action_analyze(self) -> None:
        ai = self.query_one(AIPanel)
        ai.update("[bold cyan]🧠 AI:[/bold cyan] [dim]Analyzing cluster...[/dim]")
        try:
            async with httpx.AsyncClient() as client:
                res = await client.get(f"{API}/analyze/", timeout=30)
                data = res.json()
                ai.update_analysis(
                    data.get("analysis", "No analysis available"),
                    data.get("alerts", [])
                )
        except Exception as e:
            ai.update(f"[bold red]Analysis failed: {e}[/bold red]")

    @work(exclusive=True)
    async def action_heal(self) -> None:
        ai = self.query_one(AIPanel)
        ai.update("[bold cyan]🧠 AI:[/bold cyan] [dim]Healing cluster...[/dim]")
        try:
            async with httpx.AsyncClient() as client:
                res = await client.post(f"{API}/alerts/heal", timeout=30)
                data = res.json()
                msg = data.get("message", "Heal complete")
                ai.update(f"[bold cyan]🧠 AI:[/bold cyan] [bold green]⚡ {msg}[/bold green]")
                await asyncio.sleep(2)
                self.refresh_data()
        except Exception as e:
            ai.update(f"[bold red]Heal failed: {e}[/bold red]")

    def action_refresh(self) -> None:
        self.refresh_data()

if __name__ == "__main__":
    app = OpsAgentTUI()
    app.run()
