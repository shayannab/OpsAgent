import { useState, useEffect } from 'react'

export default function ActivityFeed() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/alerts/healing-history')
                const data = await response.json()
                const formattedEvents = data.history.map(item => ({
                    id: item.timestamp,
                    type: item.success ? 'teal' : 'orange',
                    text: `Healed: ${item.pod_name} (${item.action})`,
                }))
                setEvents(formattedEvents)
            } catch (error) {
                console.error("Failed to fetch history:", error)
            }
        }

        fetchHistory()
        const interval = setInterval(fetchHistory, 5000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="flex flex-col gap-3">
            <h3 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Live Activity Feed</h3>
            <div className="space-y-3">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`
                            flex items-center gap-4 p-4 rounded-xl border border-[rgba(26,26,46,0.06)] bg-white/50 backdrop-blur-sm
                            transition-all duration-500 ease-premium
                            ${event.isNew ? 'animate-slide-in-right flash-hint' : ''}
                        `}
                    >
                        <div className={`w-2 h-2 rounded-full ${event.type === 'teal' ? 'bg-[#00d9a3]' : 'bg-[#ff4d00]'}`} />
                        <span className="text-[13px] font-medium text-slate-600">{event.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
