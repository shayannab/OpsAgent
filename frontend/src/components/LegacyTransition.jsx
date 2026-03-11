import { motion } from 'framer-motion'

const oldCapsules = [
    { text: "Manual Log Parsing", color: "bg-slate-950 border-slate-500/30 shadow-slate-900/20" },
    { text: "SSH Debugging", color: "bg-slate-950 border-slate-500/30 shadow-slate-900/20" },
    { text: "Static Alerts", color: "bg-slate-950 border-slate-500/30 shadow-slate-900/20" }
]

const newCapsules = [
    { text: "Self-Healing AI", color: "bg-slate-950 border-indigo-500/40 shadow-indigo-900/20" },
    { text: "Deep Telemetry", color: "bg-slate-950 border-cyan-500/40 shadow-cyan-900/20" },
    { text: "Auto-Scale", color: "bg-slate-950 border-violet-500/40 shadow-violet-900/20" }
]

const LegacyTransition = () => {
    return (
        <section className="relative flex flex-col items-center justify-start overflow-hidden bg-white py-16">

            <div className="max-w-6xl mx-auto text-center px-8 relative z-10 w-full">
                {/* Main Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                    className="mb-4"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 mb-4 leading-tight">
                        The Great <span className="text-indigo-600">Shift.</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto font-light tracking-tight px-4">
                        Witness the manual era crumble as autonomous intelligence takes the helm.
                    </p>
                </motion.div>

                <div className="relative h-[250px] w-full max-w-2xl mx-auto mt-8">
                    {/* Phase 1: Old Chronicles (Readable for longer, same premium style) */}
                    <div className="absolute inset-x-0 top-2 flex flex-wrap justify-center items-start gap-8 z-20">
                        {oldCapsules.map((capsule, index) => (
                            <motion.div
                                key={`old-${index}`}
                                initial={{ opacity: 0, y: 0 }}
                                whileInView={{ 
                                    opacity: [0, 1, 1, 0],
                                    y: [0, 0, 0, 800],
                                    rotate: [0, 0, 0, 15 + index * 5],
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    delay: index * 0.1, 
                                    duration: 5, // Slower for readability
                                    times: [0, 0.1, 0.7, 1], // Stays visible for 70% of duration
                                    ease: "circOut"
                                }}
                                className={`${capsule.color} text-slate-400 px-6 py-3 text-sm rounded-full font-bold border shadow-md backdrop-blur-sm will-change-transform`}
                            >
                                {capsule.text}
                            </motion.div>
                        ))}
                    </div>

                    {/* Phase 2: New Chronicles (Rising after significant pause) */}
                    <div className="absolute inset-x-0 top-4 flex flex-wrap justify-center gap-8 z-10 px-4">
                        {newCapsules.map((capsule, index) => (
                            <motion.div
                                key={`new-${index}`}
                                initial={{ y: 150, opacity: 0, scale: 0.9 }}
                                whileInView={{ 
                                    y: 0, 
                                    opacity: 1,
                                    scale: 1
                                }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ 
                                    delay: 3.5 + index * 0.2, // Starts later
                                    duration: 1,
                                    ease: [0.22, 1, 0.36, 1] 
                                }}
                                className={`${capsule.color} text-white px-6 py-3 rounded-full font-black border shadow-lg text-sm tracking-tight uppercase will-change-transform`}
                                style={{
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.4)'
                                }}
                            >
                                {capsule.text}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default LegacyTransition
