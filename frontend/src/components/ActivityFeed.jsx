import { useState, useEffect } from 'react'

export default function ActivityFeed() {
    const [events, setEvents] = useState([
        { id: 1, type: 'teal', text: 'Telemetry sync specialized' },
        { id: 2, type: 'orange', text: 'Anomaly detected in node-04' },
        { id: 3, type: 'indigo', text: 'Protocol-X initialized' }
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            const newEvent = {
                id: Date.now(),
                type: Math.random() > 0.7 ? 'orange' : 'teal',
                text: Math.random() > 0.5 ? 'Node health synchronized' : 'Resource optimization complete',
                isNew: true
            }
            setEvents(prev => [newEvent, ...prev.slice(0, 4)])
        }, 5000)
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
