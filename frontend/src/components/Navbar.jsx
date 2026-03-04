import { useState } from 'react'
import { motion } from 'framer-motion'
import { SquaresFour, ChartLineUp, BellRinging } from '@phosphor-icons/react'

const NAV_ITEMS = [
    { name: 'Cluster', url: '#cluster', icon: SquaresFour },
    { name: 'Analysis', url: '#analysis', icon: ChartLineUp },
    { name: 'Alerts', url: '#alerts', icon: BellRinging },
]

export default function Navbar({ isLive }) {
    const [activeTab, setActiveTab] = useState(NAV_ITEMS[0].name)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-2 bg-[#0a0a1a]">
            {/* Left: Wordmark */}
            <div className="flex items-center gap-3">
                <img src="/img/logo.png" alt="OpsAgent logo" className="w-6 h-6 rounded-[4px] object-cover" />
                <span className="text-lg font-bold tracking-tighter text-white">OpsAgent</span>
            </div>

            {/* Centre: Tubelight tabs */}
            <div className="hidden md:flex items-center gap-1 bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm py-1 px-1 rounded-full">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.name
                    return (
                        <a
                            key={item.name}
                            href={item.url}
                            onClick={(e) => { e.preventDefault(); setActiveTab(item.name) }}
                            className={`relative cursor-pointer text-[13px] font-semibold px-5 py-1.5 rounded-full transition-colors
                                ${isActive ? 'text-indigo-300' : 'text-white/50 hover:text-white/80'}`}
                        >
                            <span>{item.name}</span>
                            {isActive && (
                                <motion.div
                                    layoutId="lamp"
                                    className="absolute inset-0 bg-white/[0.08] rounded-full -z-10"
                                    initial={false}
                                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                                >
                                    {/* Tubelight glow bar */}
                                    <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-6 h-[3px] bg-indigo-400 rounded-t-full opacity-80">
                                        <div className="absolute w-10 h-4 bg-indigo-400/20 rounded-full blur-sm -top-1 -left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </a>
                    )
                })}
            </div>

            {/* Mobile: icon tabs */}
            <div className="flex md:hidden items-center gap-1">
                {NAV_ITEMS.map((item) => {
                    const Icon = item.icon
                    const isActive = activeTab === item.name
                    return (
                        <button
                            key={item.name}
                            onClick={() => setActiveTab(item.name)}
                            className={`p-2 rounded-full transition-colors ${isActive ? 'text-indigo-300 bg-white/[0.08]' : 'text-white/40'}`}
                        >
                            <Icon size={18} weight="duotone" />
                        </button>
                    )
                })}
            </div>

            {/* Right: Live Indicator */}
            <div className={`flex items-center gap-2 px-3 py-1 rounded-md border transition-all duration-500 ${isLive
                ? 'border-[rgba(0,217,163,0.25)] bg-[rgba(0,217,163,0.06)] text-[#00d9a3]'
                : 'border-red-500/30 bg-red-500/05 text-red-400'}`}>
                <div className="relative flex items-center justify-center w-3 h-3">
                    <span className={`absolute inset-0 rounded-full opacity-40 ${isLive ? 'bg-[#00d9a3] animate-ping' : 'bg-red-400 animate-pulse'}`} />
                    <span className={`relative w-1.5 h-1.5 rounded-full ${isLive ? 'bg-[#00d9a3]' : 'bg-red-400'}`} />
                </div>
                <span className="font-mono text-[10px] font-bold tracking-wider uppercase">
                    {isLive ? 'LIVE' : 'CONNECTION LOST'}
                </span>
            </div>
        </nav>
    )
}
