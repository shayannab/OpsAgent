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
        <div className="flex flex-col gap-6">
            <h3 className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mb-2 leading-none">Cluster Chronology</h3>
            <div className="space-y-4">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className={`
                            flex items-center gap-6 p-6 rounded-3xl border border-slate-100 bg-white shadow-xl shadow-indigo-500/5
                            transition-all duration-500 var(--ease-premium)
                            ${event.isNew ? 'animate-slide-in-right' : ''}
                        `}
                    >
                        <div className={`w-3 h-3 rounded-full shadow-lg ${event.type === 'teal' ? 'bg-emerald-400 shadow-emerald-400/20' : 'bg-orange-400 shadow-orange-400/20'}`} />
                        <span className="text-[14px] font-bold text-slate-700">{event.text}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
