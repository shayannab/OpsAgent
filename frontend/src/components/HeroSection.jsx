import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DotOutline } from '@phosphor-icons/react'
import { ShapeBackground } from './ui/shape-landing-hero'

function WordRotator() {
    const words = ["excuses.", "downtime.", "surprises.", "3am calls.", "mercy."]
    const [index, setIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setIsTransitioning(true)
            setTimeout(() => {
                setIndex((prev) => (prev + 1) % words.length)
                setIsTransitioning(false)
            }, 500)
        }, 2500)
        return () => clearInterval(interval)
    }, [])

    return (
        <span key={words[index]} className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-rose-300" style={{
            display: 'inline-block',
            animation: isTransitioning
                ? 'slide-up-out 0.5s var(--ease-premium) forwards'
                : 'slide-up-in 0.5s var(--ease-premium) forwards',
        }}>
            {words[index]}
        </span>
    )
}

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { duration: 1, delay: 0.4 + i * 0.18, ease: [0.25, 0.4, 0.25, 1] },
    }),
}

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a1a] pt-16">
            <ShapeBackground />

            <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center py-24">
                {/* Eyebrow badge */}
                <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible"
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] mb-10">
                    <DotOutline size={20} weight="fill" className="text-indigo-400" />
                    <span className="font-mono text-[11px] font-bold text-white/50 uppercase tracking-[0.25em]">
                        System telemetry · Operational Excellence
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
                    className="text-[72px] sm:text-[88px] font-extrabold tracking-tighter leading-[0.9] mb-8">
                    <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                        Your cluster.
                    </span>
                    <br />
                    <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: '0.2em' }}>
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">Zero</span>
                        <WordRotator />
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p custom={2} variants={fadeUp} initial="hidden" animate="visible"
                    className="text-lg sm:text-xl text-white/40 max-w-2xl mx-auto font-light leading-relaxed tracking-wide">
                    OpsAgent watches, diagnoses, and heals your infrastructure automatically.
                    High-precision AI intelligence for the modern cloud stack.
                </motion.p>
            </div>
        </section>
    )
}
