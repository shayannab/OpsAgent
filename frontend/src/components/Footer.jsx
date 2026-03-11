import { Link } from 'react-router-dom';

const LINKS = {
    Company: ['About', 'Blog', 'GitHub', 'Status'],
    'Other Pages': ['Home', 'Dashboard', 'Pricing', 'Contact'],
}

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="relative z-10 bg-[#1a1a2e] text-slate-400">
            {/* Top divider glow */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-[#6366f1]/40 to-transparent" />

            <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
                {/* Top row: brand + links */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
                    {/* Brand */}
                    <div className="md:col-span-1 flex flex-col gap-5">
                        <div className="flex items-center gap-3">
                            <img
                                src="/img/logo.png"
                                alt="OpsAgent"
                                className="w-8 h-8 rounded-[6px] object-cover"
                            />
                            <span className="text-white font-bold text-lg tracking-tighter">OpsAgent</span>
                        </div>
                        <p className="text-[13px] leading-relaxed text-slate-500 max-w-[200px]">
                            AI-powered Kubernetes monitoring & autonomous healing.
                        </p>
                        {/* Status pill */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(0,217,163,0.2)] bg-[rgba(0,217,163,0.04)] w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#00d9a3] animate-pulse" />
                            <span className="font-mono text-[10px] font-bold text-[#00d9a3] uppercase tracking-wider">All systems nominal</span>
                        </div>
                    </div>

                    {/* Link columns */}
                    {Object.entries(LINKS).map(([section, items]) => (
                        <div key={section} className="flex flex-col gap-4">
                            <h4 className="font-mono text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
                                {section}
                            </h4>
                                <ul className="flex flex-col gap-3">
                                    {items.map((item) => {
                                        const path = item.toLowerCase().replace(/\s+/g, '-');
                                        return (
                                            <li key={item}>
                                                <Link
                                                    to={`/${path === 'home' ? '' : path}`}
                                                    className="text-[13px] text-slate-500 hover:text-white transition-colors duration-200"
                                                >
                                                    {item}
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.05]">
                    <p className="text-[12px] text-slate-600">
                        © {year} OpsAgent. Built for the cloud-native era.
                    </p>
                    <div className="flex items-center gap-6">
                        <span className="font-mono text-[10px] bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded text-slate-600">
                            v2.1.0-PREMIUM
                        </span>
                        <Link to="/privacy" className="text-[12px] text-slate-600 hover:text-white transition-colors duration-200">Privacy</Link>
                        <Link to="/terms" className="text-[12px] text-slate-600 hover:text-white transition-colors duration-200">Terms</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
