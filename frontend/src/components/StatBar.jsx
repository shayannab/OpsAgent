import { useState, useEffect } from 'react'

function AnimatedNumber({ value, suffix = "" }) {
    const [displayValue, setDisplayValue] = useState(0)

    useEffect(() => {
        const duration = 1200
        const startTime = performance.now()
        const startValue = displayValue

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = 1 - Math.pow(1 - progress, 3)
            const nextValue = startValue + (value - startValue) * easeProgress
            setDisplayValue(nextValue)
            if (progress < 1) requestAnimationFrame(animate)
        }

        requestAnimationFrame(animate)
    }, [value])

    if (value === '—') return '—'
    return <span>{Math.round(displayValue)}{suffix}</span>
}

export default function StatBar({ clusterData, analyzeData, loading }) {
    const stats = [
        {
            label: 'Total Pods',
            value: clusterData?.total_pods,
            color: 'text-slate-800',
            accent: '#6366f1',
            glow: 'rgba(99,102,241,0.06)',
        },
        {
            label: 'Running',
            value: clusterData?.running,
            color: 'text-[#00d9a3]',
            accent: '#00d9a3',
            glow: 'rgba(0,217,163,0.06)',
        },
        {
            label: 'Failed',
            value: clusterData?.failed,
            color: 'text-[#ff4d00]',
            accent: '#ff4d00',
            glow: 'rgba(255,77,0,0.06)',
        },
        {
            label: 'Health Score',
            value: analyzeData?.health_score,
            suffix: "%",
            color: 'text-[#6366f1]',
            accent: '#6366f1',
            glow: 'rgba(99,102,241,0.06)',
        },
    ]

    return (
        <div className="w-full bg-white relative">
            <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 border-b border-slate-100">
                {stats.map((stat, i) => (
                    <div
                        key={i}
                        className="relative flex flex-col px-10 py-10 group/stat
                            border-r border-slate-200 last:border-r-0
                            overflow-hidden cursor-default"
                    >
                        {/* Hover gradient glow */}
                        <div
                            className="absolute inset-0 opacity-0 group-hover/stat:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                                background: `radial-gradient(ellipse at 20% 60%, ${stat.glow} 0%, transparent 70%)`,
                            }}
                        />

                        {/* Left accent bar */}
                        <div
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-full
                                h-8 group-hover/stat:h-14 transition-all duration-300 ease-out"
                            style={{ background: stat.accent }}
                        />

                        {/* Label */}
                        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-3 relative z-10
                            group-hover/stat:translate-x-1 transition-transform duration-200">
                            {stat.label}
                        </div>

                        {/* Value */}
                        {loading ? (
                            <div className="skeleton h-14 w-20 mt-1 rounded-xl" />
                        ) : (
                            <div className={`font-mono text-[52px] font-black tracking-tighter leading-none relative z-10
                                group-hover/stat:translate-x-1 transition-transform duration-200 ${stat.color}`}>
                                <AnimatedNumber value={stat.value ?? 0} suffix={stat.suffix} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
