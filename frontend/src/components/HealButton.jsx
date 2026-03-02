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
        <div className="flex flex-col items-center gap-6 py-16">
            <button
                onClick={handleHeal}
                disabled={status === 'loading'}
                className={`
                        group relative px-12 py-5 rounded-xl font-bold text-[16px] uppercase tracking-widest
                        transition-all duration-300 ease-premium
                        hover:scale-[1.05] active:scale-[0.95]
                        shadow-xl
                        ${status === 'success' ? 'bg-[#00d9a3] text-white shadow-[#00d9a344]' : 'bg-[#ff4d00] text-white shadow-[#ff4d0044] animate-pulse-subtle'}
                        disabled:opacity-80 disabled:cursor-wait
                    `}
            >
                <div className="flex items-center gap-4">
                    <div className="relative w-6 h-6 flex items-center justify-center">
                        {status === 'loading' ? (
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        ) : status === 'success' ? (
                            <span className="text-xl animate-checkmark">✓</span>
                        ) : (
                            <span className="text-xl group-hover:animate-bounce">⚡</span>
                        )}
                    </div>
                    <span>
                        {status === 'loading' ? 'Executing Protocol...' : status === 'success' ? 'Recovery Successful' : 'Auto-Heal Cluster'}
                    </span>
                </div>
            </button>

            <div className="font-mono text-[11px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                Last Maintenance Cycle: <span className="text-slate-600">{lastHealed}</span>
            </div>
        </div>
    )
}
