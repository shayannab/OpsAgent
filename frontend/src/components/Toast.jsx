import { useEffect } from 'react'

export default function Toast({ message, type = 'success', onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 4000)
        return () => clearTimeout(timer)
    }, [onDismiss])

    const isSuccess = type === 'success'

    return (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
            <div className={`flex items-center gap-4 px-6 py-4 rounded-lg border shadow-[0_16px_48px_rgba(26,26,46,0.12)] bg-white ${isSuccess ? 'border-[#00d9a322]' : 'border-[#ff4d0022]'
                }`}>
                <div className={`w-2 h-10 rounded-full ${isSuccess ? 'bg-[#00d9a3]' : 'bg-[#ff4d00]'}`} />

                <div>
                    <div className="font-mono text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                        {isSuccess ? 'SYSTEM_SIGNAL_OK' : 'SYSTEM_SIGNAL_ERROR'}
                    </div>
                    <div className="text-sm font-bold text-[#1a1a2e]">
                        {message}
                    </div>
                </div>

                <button
                    onClick={onDismiss}
                    className="ml-4 text-slate-300 hover:text-slate-900 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
