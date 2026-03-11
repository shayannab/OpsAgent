import { Link } from 'react-router-dom'
import { SquaresFour } from '@phosphor-icons/react'
import { Home, LayoutDashboard } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

const NAV_ITEMS = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Dashboard', url: '/dashboard', icon: LayoutDashboard },
]

export default function Navbar({ isLive }) {
    const [activeTab, setActiveTab] = useState('Home')
    return (
        <nav className="fixed top-4 left-0 right-0 z-50 flex items-center justify-between px-8">
            <Link to="/" className="flex items-center gap-3 group">
                <img src="/img/logo.png" alt="OpsAgent Logo" className="w-8 h-8 rounded-lg object-contain group-hover:scale-110 transition-transform drop-shadow-md" />
                <span className="text-xl font-bold tracking-tight text-slate-700 dark:text-slate-300 hover:text-indigo-500 transition-colors">OpsAgent</span>
            </Link>
            <div className="flex items-center gap-1 bg-slate-500/5 border border-slate-500/20 backdrop-blur-lg py-1 px-1 rounded-full">
                {NAV_ITEMS.map((item) => {
                    const isActive = activeTab === item.name
                    return (
                        <Link key={item.name} to={item.url} onClick={() => setActiveTab(item.name)} className={`relative px-6 py-2 rounded-full text-sm font-semibold transition-colors ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-300'}`}>
                            <span className="relative z-10">{item.name}</span>
                            {isActive && (
                                <motion.div layoutId="lamp" className="absolute inset-0 bg-indigo-500/10 rounded-full z-0" initial={false} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-indigo-500 rounded-t-full">
                                        <div className="absolute w-12 h-6 bg-indigo-500/20 rounded-full blur-md -top-2 -left-2" />
                                        <div className="absolute w-8 h-6 bg-indigo-500/20 rounded-full blur-md -top-1" />
                                        <div className="absolute w-4 h-4 bg-indigo-500/20 rounded-full blur-sm top-0 left-2" />
                                    </div>
                                </motion.div>
                            )}
                        </Link>
                    )
                })}
            </div>
            <div className="flex items-center gap-6">
                <a href="https://github.com" target="_blank" className="hidden md:block text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-all font-mono">GITHUB/01</a>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-500/20 backdrop-blur-lg transition-all duration-500 ${isLive ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' : 'bg-rose-500/10 text-rose-600 dark:text-rose-400'}`}>
                    <div className="relative flex items-center justify-center w-3 h-3">
                        <span className={`absolute inset-0 rounded-full opacity-30 ${isLive ? 'bg-emerald-500 animate-ping' : 'bg-rose-400 animate-pulse'}`} />
                        <span className={`relative w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    </div>
                    <span className="font-mono text-[9px] font-black tracking-widest uppercase">{isLive ? 'ACTIVE' : 'OFFLINE'}</span>
                </div>
            </div>
        </nav>
    )
}