import { useState } from 'react'
import { healCluster } from '../hooks/useApi'

export default function HealButton({ onHealed }) {
    const [status, setStatus] = useState('idle') // idle, loading, success
    const [lastHealed, setLastHealed] = useState('NEVER')

    const handleHeal = async () => {
        setStatus('loading')
        try {
            const result = await healCluster()
            setLastHealed(new Date().toLocaleTimeString())
            setStatus('success')
            onHealed(result)

            // Revert after 2 seconds
            setTimeout(() => setStatus('idle'), 2000)
        } catch (err) {
            setStatus('idle')
            onHealed({ error: err.message })
        }
    }

    return (
        <div className="flex flex-col items-center gap-8 py-16">
            <button
                onClick={handleHeal}
                disabled={status === 'loading'}
                className={`
                        group relative px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider
                        transition-all duration-300
                        hover:scale-105 active:scale-95
                        ${status === 'success' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-[#0a0a14] border border-white/10 text-slate-300 hover:text-white hover:border-indigo-500/50 shadow-lg shadow-indigo-500/10'}
                        disabled:opacity-70 disabled:cursor-not-allowed
                    `}
            >
                <div className="flex items-center gap-3">
                    <div className="relative w-4 h-4 flex items-center justify-center">
                        {status === 'loading' ? (
                            <svg className="animate-spin h-4 w-4 text-indigo-400" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : status === 'success' ? (
                            <span className="text-xl animate-checkmark">✓</span>
                        ) : (
                            <span className="text-xl group-hover:scale-125 transition-transform">⚡</span>
                        )}
                    </div>
                    <span className="relative z-10">
                        {status === 'loading' ? 'Executing Healing Protocol...' : status === 'success' ? 'System Stable' : 'Initialize Auto-Heal'}
                    </span>
                </div>
                {/* Subtle Hover Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />
            </button>

            <div className="font-mono text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-slate-100 border border-slate-200" />
                Last Maintenance Cycle: <span className="text-indigo-600">{lastHealed}</span>
            </div>
        </div>
    )
}
