import HeroSection from '../components/HeroSection'
import LegacyTransition from '../components/LegacyTransition'
import TUIInfoSection from '../components/TUIInfoSection'
import FallingText from '../components/FallingText'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Zap, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'

const Features = [
    {
        title: "AI Diagnostics",
        desc: "Neural-driven analysis of cluster health, predicting failures before they impact users.",
        icon: Cpu,
        color: "text-indigo-500"
    },
    {
        title: "Real-time Healing",
        desc: "Autonomous protocols that restart pods, clear caches, and rebalance nodes instantly.",
        icon: Zap,
        color: "text-teal-500"
    },
    {
        title: "Hardened Security",
        desc: "Real-time monitoring of access patterns and security contexts to ensure cluster integrity.",
        icon: ShieldCheck,
        color: "text-indigo-400"
    }
]

const LandingPage = () => {
    return (
        <div className="landing-page selection:bg-indigo-500/30">
            {/* Hero Section */}
            <div className="bg-[#05050f] relative overflow-hidden">
                <HeroSection />
            </div>

            {/* Legacy Transition: Integrated Physics Text + Falling Old / Rising New */}
            <LegacyTransition />

            {/* Section: Feature Grid */}
            <section className="py-28 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {Features.map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="group p-10 rounded-[40px] bg-[#fcfdff] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all"
                            >
                                <div className={`w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center mb-8 ${f.color}`}>
                                    <f.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4">{f.title}</h3>
                                <p className="text-slate-500 leading-relaxed font-medium">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TUI Info Section: The Terminal Guardian */}
            <TUIInfoSection />

            {/* Section: Final CTA */}
            <section className="py-40 bg-[#05050f] text-center relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px]" />
                
                <div className="max-w-4xl mx-auto px-8 relative z-10">
                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-10 leading-tight">
                        Ready to automate <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">your infrastructure?</span>
                    </h2>
                    
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-4 px-12 py-6 rounded-full bg-black/40 text-white border border-white/10 backdrop-blur-md font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 hover:border-indigo-500/50 hover:shadow-[0_0_40px_rgba(79,70,229,0.2)] active:scale-95"
                    >
                        Launch Control Center
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
