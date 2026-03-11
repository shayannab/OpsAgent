import { useState, useEffect } from 'react'

function DonutRing({ score, size = 160 }) {
    const radius = (size - 24) / 2
    const circumference = 2 * Math.PI * radius
    const [offset, setOffset] = useState(circumference)
    const color = score >= 80 ? '#00d9a3' : '#ff4d00'

    useEffect(() => {
        const targetOffset = circumference - (score / 100) * circumference
        setOffset(targetOffset)
    }, [score, circumference])

    const isComplete = score === 100

    return (
        <div className={`relative flex items-center justify-center rounded-full transition-all duration-1000 ${isComplete ? 'animate-glow-success' : ''}`}>
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke="rgba(26,26,46,0.04)" strokeWidth={12}
                />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth={12}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-[1500ms]"
                    style={{
                        filter: `drop-shadow(0 0 12px ${color}44)`,
                        transitionTimingFunction: 'var(--ease-premium)',
                        "--circumference": circumference,
                        "--offset": offset
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-4xl font-bold text-[#1a1a2e]">{Math.round(score)}%</span>
                <span className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-widest -mt-1">VITALITY</span>
            </div>
        </div>
    )
}

export default function ClusterHealthCard({ analyzeData, loading }) {
    const targetScore = analyzeData?.health_score ?? 0
    const [score, setScore] = useState(0)

    useEffect(() => {
        if (loading) return
        setScore(0)
        const duration = 1000
        const start = performance.now()

        const animate = (time) => {
            const progress = Math.min((time - start) / duration, 1)
            setScore(progress * targetScore)
            if (progress < 1) requestAnimationFrame(animate)
        }
        requestAnimationFrame(animate)
    }, [targetScore, loading])

    const rows = [
        { label: 'Running', val: analyzeData?.running, color: '#00d9a3' },
        { label: 'Failed', val: analyzeData?.failed, color: '#ff4d00' },
        { label: 'Pending', val: analyzeData?.pending, color: '#6366f1' },
    ]

    const isHealthy = score >= 80

    return (
        <div className="glass-light p-12 rounded-[40px] overflow-hidden relative border border-slate-100 shadow-xl shadow-indigo-500/5">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6366f1] opacity-[0.03] rounded-full -mr-32 -mt-32 blur-[100px]" />

            <div className="flex flex-col md:flex-row items-center gap-16">
                {/* Donut Area */}
                <div className="flex-shrink-0 flex flex-col items-center gap-6">
                    {loading ? (
                        <div className="skeleton rounded-full w-[160px] h-[160px]" />
                    ) : (
                        <DonutRing score={score} />
                    )}
                </div>

                {/* Stats Table Area */}
                <div className="flex-1 w-full font-mono">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold tracking-tighter text-[#1a1a2e] mb-2">Cluster Vitality Index</h2>
                        <p className="text-[14px] text-slate-400 uppercase tracking-widest font-bold">Real-time telemetry / Precision Monitoring</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                        {rows.map((row) => (
                            <div key={row.label} className="border-l-4 pl-6 py-2 transition-all duration-300 hover:bg-white/50" style={{ borderColor: row.color }}>
                                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{row.label}</div>
                                <div className="text-[48px] font-bold tracking-tighter text-[#1a1a2e] leading-none">
                                    {loading ? '—' : row.val ?? '—'}
                                </div>
                            </div>
                        ))}
                    </div>

                    {!loading && (
                        <div className={`mt-10 flex items-center justify-between gap-4 py-4 px-6 rounded-xl border-l-[6px] shadow-sm transition-all duration-500 ${isHealthy ? 'bg-[#00d9a3] text-white border-[#00c594]' : 'bg-[#ff4d00] text-white border-[#e64500]'
                            }`}>
                            <div className="flex items-center gap-3">
                                <span className={`w-2.5 h-2.5 rounded-full bg-white ${isHealthy ? 'pulse-teal' : 'animate-pulse'}`} />
                                <span className="text-[13px] font-bold uppercase tracking-[0.1em]">
                                    {isHealthy ? 'Infrastructure Status: Nominal' : 'Infrastructure Status: Anomalies Detected'}
                                </span>
                            </div>
                            <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest">
                                {isHealthy ? 'OK_CODE_200' : 'ERR_VITALITY_LOW'}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
