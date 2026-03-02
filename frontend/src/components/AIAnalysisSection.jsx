import { useState, useEffect, useRef } from 'react'

function TerminalFeed() {
    const [logs, setLogs] = useState([])
    const scrollContainerRef = useRef(null)

    const eventTypes = [
        { type: "POD_RESTART", color: "text-[#ff4d00]", data: '{"pod":"opsagent-7dc","status":"recovering"}' },
        { type: "HEARTBEAT_OK", color: "text-[#00d9a3]", data: '{"node":"minikube","latency":"2ms"}' },
        { type: "METRIC_SCRAPE", color: "text-[#6366f1]", data: '{"cpu":"12%","memory":"340Mi"}' },
        { type: "AI_INFERENCE", color: "text-purple-400", data: '{"model":"llama3","tokens":142,"ms":380}' },
        { type: "HEAL_CHECK", color: "text-slate-500", data: '{"failed":0,"pending":0,"action":"none"}' },
        { type: "SYNC_COMPLETE", color: "text-[#00d9a3]", data: '{"pods":11,"healthy":11,"score":"100%"}' }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            const newEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)]
            const timestamp = new Date().toLocaleTimeString('en-GB')
            const logLine = {
                id: Date.now(),
                text: `[${timestamp}] ${newEvent.type.padEnd(15)} ${newEvent.data}`,
                color: newEvent.color,
                type: newEvent.type,
                data: newEvent.data,
                timestamp: timestamp
            }
            setLogs(prev => [...prev.slice(-10), logLine]) // Keep a bit more history
        }, 1500)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight
        }
    }, [logs])

    return (
        <div
            ref={scrollContainerRef}
            className="flex-1 font-mono text-[11px] leading-6 overflow-y-auto relative scroll-smooth scrollbar-none"
        >
            <div className="space-y-1">
                {logs.map((log, i) => (
                    <div key={log.id}
                        className="transition-all duration-500 opacity-100"
                    >
                        <span className="text-slate-500">[{log.timestamp}] </span>
                        <span className={`${log.color} font-bold`}>{log.type}</span>
                        <span className="text-slate-400 ml-3">{log.data}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

function TypewriterAnalysis({ text }) {
    const [displayedText, setDisplayedText] = useState("")
    const [isTyping, setIsTyping] = useState(false)
    const [cursorBlinks, setCursorBlinks] = useState(0)

    useEffect(() => {
        setDisplayedText("")
        setIsTyping(true)
        setCursorBlinks(0)
        let i = 0
        const interval = setInterval(() => {
            setDisplayedText(text.substring(0, i + 1))
            i++
            if (i >= text.length) {
                clearInterval(interval)
                setIsTyping(false)
                let blinks = 0
                const blinkInterval = setInterval(() => {
                    setCursorBlinks(prev => prev + 1)
                    blinks++
                    if (blinks >= 6) {
                        clearInterval(blinkInterval)
                        setCursorBlinks(-1)
                    }
                }, 500)
            }
        }, 25)
        return () => clearInterval(interval)
    }, [text])

    return (
        <p className="text-xl font-medium text-[#1a1a2e] leading-relaxed min-h-[120px]">
            {displayedText}
            {cursorBlinks !== -1 && (
                <span className={`inline-block w-2 h-5 bg-[#6366f1] ml-1 align-middle ${!isTyping && cursorBlinks % 2 === 0 ? 'opacity-0' : 'opacity-100'}`} />
            )}
        </p>
    )
}

export default function AIAnalysisSection({ analyzeData, alertsData, loading }) {
    const analysisText = analyzeData?.analysis || "Strategic cluster sweep complete. No critical vulnerabilities identified in currently active nodes."

    return (
        <section className="bg-white border-y border-[rgba(26,26,46,0.08)] -mx-8 px-8 py-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
                {/* Left: AI Insights */}
                <div className="lg:w-1/2 flex flex-col justify-center">
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center text-white shadow-xl shadow-indigo-200">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-extrabold tracking-tighter text-[#1a1a2e]">AI Diagnostics</h2>
                        </div>

                        {loading ? (
                            <div className="space-y-4">
                                <div className="skeleton h-5 w-full" />
                                <div className="skeleton h-5 w-full" />
                                <div className="skeleton h-5 w-[80%]" />
                            </div>
                        ) : (
                            <TypewriterAnalysis text={analysisText} />
                        )}
                    </div>

                    <div className="flex flex-wrap gap-4 mt-4">
                        <div className="px-5 py-2 rounded-lg bg-[#ff4d00] text-white text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-[#ff4d0033]">
                            {alertsData?.alerts?.length || 0} ACTIVE ALERTS
                        </div>
                        <div className="px-5 py-2 rounded-lg bg-[#00d9a3] text-white text-[11px] font-bold uppercase tracking-widest shadow-lg shadow-[#00d9a333]">
                            AI ANALYSIS STABLE
                        </div>
                    </div>
                </div>

                {/* Right: Technical Terminal */}
                <div className="lg:w-1/2">
                    <div className="browser-window h-[360px] flex flex-col shadow-2xl">
                        <div className="bg-[#1a1a2e] px-5 py-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-[#ff4d00]/20 border border-[#ff4d00]/40" />
                                <div className="w-3 h-3 rounded-full bg-[#ffd54f]/20 border border-[#ffd54f]/40" />
                                <div className="w-3 h-3 rounded-full bg-[#00d9a3]/20 border border-[#00d9a3]/40" />
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">system_event_stream v2.0</div>
                        </div>
                        <div className="flex-1 bg-[#1a1a2e] p-8 scanline relative overflow-hidden flex flex-col">
                            {loading ? (
                                <div className="space-y-3">
                                    <div className="skeleton h-3 w-3/4 opacity-10" />
                                    <div className="skeleton h-3 w-1/2 opacity-10" />
                                    <div className="skeleton h-3 w-5/6 opacity-10" />
                                </div>
                            ) : (
                                <TerminalFeed />
                            )}
                            <div className="absolute bottom-6 right-8 opacity-20">
                                <div className="w-2 h-4 bg-[#00d9a3] animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
