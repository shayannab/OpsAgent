function DonutRing({ score, size = 160 }) {
    const radius = (size - 24) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDash = (score / 100) * circumference
    const color = score >= 90 ? '#00d9a3' : score >= 50 ? '#ffd54f' : '#ff4d00'

    return (
        <div className="relative flex items-center justify-center p-2">
            <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke="rgba(26,26,46,0.04)" strokeWidth={12}
                />
                <circle
                    cx={size / 2} cy={size / 2} r={radius}
                    fill="none" stroke={color} strokeWidth={12}
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - strokeDash}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-3xl font-bold text-[#1a1a2e]">{Math.round(score)}%</span>
                <span className="font-mono text-[9px] font-bold text-slate-400 uppercase tracking-widest -mt-1">Vitality</span>
            </div>
        </div>
    )
}

import { useState, useEffect } from 'react'

function WordRotator() {
    const words = ["excuses.", "downtime.", "surprises.", "3am calls.", "mercy."]
    const [index, setIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length)
                setIsTransitioning(false)
            }, 500) // Half of the transition time
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <span className="inline-block relative h-[1.2em] overflow-hidden align-bottom ml-2">
            <span
                key={words[index]}
                className={`inline-block text-[#ff4d00] transition-all duration-500 ease-premium ${isTransitioning ? 'animate-slide-up-out' : 'animate-slide-up-in'
                    }`}
                style={{
                    animation: isTransitioning
                        ? 'slide-up-out 0.5s var(--ease-premium) forwards'
                        : 'slide-up-in 0.5s var(--ease-premium) forwards'
                }}
            >
                {words[index]}
            </span>
        </span>
    )
}

export default function HeroSection({ clusterData, analyzeData, loading }) {
    const score = analyzeData?.health_score ?? 0

    return (
        <section className="relative pt-32 pb-20 px-8 overflow-hidden bg-white">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                {/* Left: Editorial Content */}
                <div className="lg:w-[60%] text-left">
                    <div className="font-mono text-[12px] font-bold text-[#6366f1] uppercase tracking-[0.3em] mb-6">
                        System telemetry / Operational Excellence
                    </div>

                    <h1 className="text-7xl font-extrabold tracking-tighter text-[#1a1a2e] leading-[0.95] mb-8">
                        Your cluster.<br />
                        Zero <WordRotator />
                    </h1>

                    <p className="text-lg text-slate-500 max-w-xl font-medium leading-relaxed mb-10">
                        OpsAgent watches, diagnoses, and heals your infrastructure automatically. High-precision intelligence for the modern cloud stack.
                    </p>
                </div>

                {/* Right: Health Visual (Glass Card) */}
                <div className="flex-shrink-0 w-full lg:w-auto">
                    <div className="glass p-10 rounded-[32px] shadow-[0px_32px_64px_rgba(26,26,46,0.08)] animate-float-slow">
                        <div className="flex flex-col items-center gap-6">
                            {loading ? (
                                <div className="skeleton rounded-full w-[160px] h-[160px]" />
                            ) : (
                                <>
                                    <DonutRing score={score} />
                                    <div className={`px-4 py-1.5 rounded-full border font-mono text-[10px] font-black uppercase tracking-widest ${score >= 90 ? 'bg-[#00d9a308] border-[#00d9a344] text-[#00d9a3]' : 'bg-[#ff4d0008] border-[#ff4d0044] text-[#ff4d00]'
                                        }`}>
                                        {score >= 90 ? 'SYSTEM NOMINAL' : 'ATTENTION REQUIRED'}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


