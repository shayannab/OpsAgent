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

            // Ease out cubic: 1 - pow(1 - x, 3)
            const easeProgress = 1 - Math.pow(1 - progress, 3)

            const nextValue = startValue + (value - startValue) * easeProgress
            setDisplayValue(nextValue)

            if (progress < 1) {
                requestAnimationFrame(animate)
            }
        }

        requestAnimationFrame(animate)
    }, [value])

    if (value === '—') return '—'
    return <span>{Math.round(displayValue)}{suffix}</span>
}

export default function StatBar({ clusterData, analyzeData, loading }) {
    const formatValue = (val, isPercentage = false) => {
        if (loading) return null
        if (val === null || val === undefined || val === 0) return '—'
        return isPercentage ? `${Math.round(val)}%` : val
    }

    const stats = [
        { label: 'Total Pods', value: clusterData?.total_pods, color: 'text-slate-900' },
        { label: 'Running', value: clusterData?.running, color: 'text-[#00d9a3]' },
        { label: 'Failed', value: clusterData?.failed, color: 'text-[#ff4d00]' },
        { label: 'Health Score', value: analyzeData?.health_score, suffix: "%", color: 'text-[#6366f1]' },
    ]

    return (
        <div className="w-full bg-white border-y border-[rgba(26,26,46,0.08)]">
            <div className="max-w-7xl mx-auto flex divide-x divide-[rgba(26,26,46,0.08)]">
                {stats.map((stat, i) => (
                    <div key={i} className="flex-1 px-8 py-10 group hover:bg-slate-50 transition-colors">
                        <div className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-2 group-hover:text-slate-500">
                            {stat.label}
                        </div>
                        {loading ? (
                            <div className="skeleton h-12 w-24 mt-1" />
                        ) : (
                            <div className={`font-mono text-[48px] font-bold tracking-tighter ${stat.color} leading-none`}>
                                <AnimatedNumber value={stat.value ?? 0} suffix={stat.suffix} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}
