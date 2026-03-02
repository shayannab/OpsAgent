export default function Navbar({ isLive }) {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-3 bg-white/72 backdrop-blur-[20px] nav-shadow">
            {/* Left: Wordmark */}
            <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#6366f1] rounded-[4px] flex items-center justify-center text-[10px] text-white font-black">O</div>
                <span className="text-lg font-bold tracking-tighter text-[#1a1a2e]">
                    OpsAgent
                </span>
            </div>

            {/* Center: Tabs */}
            <div className="hidden md:flex items-center gap-8">
                {['Cluster', 'Analysis', 'Alerts'].map((tab, i) => (
                    <button key={tab} className={`text-[13px] font-semibold transition-colors hover:text-[#1a1a2e] ${i === 0 ? 'text-[#1a1a2e] relative after:absolute after:-bottom-[13px] after:left-0 after:right-0 after:h-[2px] after:bg-[#6366f1]' : 'text-slate-400'}`}>
                        {tab}
                    </button>
                ))}
            </div>

            {/* Right: Live Indicator */}
            <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md border transition-all duration-500 ${isLive
                    ? 'border-[rgba(0,217,163,0.2)] bg-[rgba(0,217,163,0.04)] text-[#00d9a3]'
                    : 'pulse-glow-orange text-white border-transparent'
                    }`}>
                    <div className="relative flex items-center justify-center w-3 h-3">
                        <span className={`absolute inset-0 rounded-full opacity-40 ${isLive ? 'bg-[#00d9a3] animate-ping' : 'bg-white animate-pulse'}`} />
                        <span className={`relative w-1.5 h-1.5 rounded-full ${isLive ? 'bg-[#00d9a3] pulse-teal' : 'bg-white'}`}
                            style={{ animationDuration: isLive ? '2s' : '1s' }} />
                    </div>
                    <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                        {isLive ? 'LIVE' : 'CONNECTION LOST'}
                    </span>
                </div>
            </div>
        </nav>
    )
}
