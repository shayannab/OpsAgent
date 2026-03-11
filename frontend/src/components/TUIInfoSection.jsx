import { motion } from 'framer-motion'
import { Terminal, Cpu, Zap, Globe } from 'lucide-react'

const TUIInfoSection = () => {
    const features = [
        {
            icon: <Zap className="w-6 h-6 text-indigo-400" />,
            title: "Zero Latency",
            desc: "Direct terminal-to-cluster interaction bypasses heavy browser processing."
        },
        {
            icon: <Globe className="w-6 h-6 text-teal-400" />,
            desc: "The ultimate tool for low-bandwidth SSH environments.",
            title: "SSH Ready"
        },
        {
            icon: <Cpu className="w-6 h-6 text-indigo-400" />,
            desc: "Keyboard-driven workflows for DevOps power users.",
            title: "Power Flow"
        }
    ]

    return (
        <section className="py-32 bg-[#F8F9FF] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-8 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-6">
                                <Terminal className="w-4 h-4" /> The Terminal Guardian
                            </div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-8">
                                OpsAgent TUI: For the <span className="text-indigo-600">Terminal Purists.</span>
                            </h2>
                            <p className="text-xl text-slate-500 mb-12 leading-relaxed">
                                Not in front of a browser? No problem. Launch the Textual-based TUI to monitor and heal your cluster directly from your shell.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {features.map((f, i) => (
                                    <div key={i} className="group">
                                        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center mb-4 group-hover:border-indigo-200 transition-colors">
                                            {f.icon}
                                        </div>
                                        <h4 className="font-bold text-slate-900 mb-2">{f.title}</h4>
                                        <p className="text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    <div className="lg:w-1/2 relative">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-[#05050f] rounded-3xl p-4 shadow-2xl border border-white/5 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent pointer-events-none" />
                            
                            {/* Terminal Header */}
                            <div className="flex items-center gap-2 mb-4 px-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50" />
                                <div className="ml-2 text-[10px] font-mono text-white/30 tracking-widest">OPSAGENT_TUI</div>
                            </div>

                            {/* Terminal Content Mock */}
                            <div className="font-mono text-sm space-y-2 p-4">
                                <div className="text-emerald-400">● RUNNING <span className="text-white/60">  auth-service-v1</span></div>
                                <div className="text-emerald-400">● RUNNING <span className="text-white/60">  payment-gateway</span></div>
                                <div className="text-red-400">● FAILED  <span className="text-white/60">  redis-master-0</span></div>
                                <div className="pt-4 text-indigo-400">🧠 AI: <span className="text-white/80 italic">Redis node unreachable. Initiating auto-heal...</span></div>
                                <div className="text-white/40 pt-8 mt-8 border-t border-white/5 uppercase text-xs tracking-[0.3em]">
                                    Press [R] Refresh [H] Heal [Q] Quit
                                </div>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 blur-[100px] pointer-events-none" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TUIInfoSection
