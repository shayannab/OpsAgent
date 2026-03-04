import {
    ChartBar,
    Brain,
    BellRinging,
    Heartbeat,
    Cube,
    MagnifyingGlass,
    ArrowsOut,
    ShieldCheck,
} from '@phosphor-icons/react'
import { cn } from '../../lib/utils'

const features = [
    {
        title: 'Real-Time Cluster Monitoring',
        description: 'Live visibility into every node, pod, and container. Know the state of your cluster before your users do.',
        icon: <ChartBar size={24} weight="duotone" />,
    },
    {
        title: 'AI-Driven Auto-Healing',
        description: 'OpsAgent diagnoses root causes and autonomously restores degraded workloads — no pager-duty required.',
        icon: <Brain size={24} weight="duotone" />,
    },
    {
        title: 'Intelligent Alerting',
        description: 'Context-aware alerts with deduplication and severity triage, so you only hear about what actually matters.',
        icon: <BellRinging size={24} weight="duotone" />,
    },
    {
        title: 'Health Score Engine',
        description: 'A continuous composite health score across your entire cluster, updated in real time with every telemetry tick.',
        icon: <Heartbeat size={24} weight="duotone" />,
    },
    {
        title: 'Pod Lifecycle Management',
        description: 'Visualize restarts, crash loops, OOM kills, and evictions with full history and correlated logs.',
        icon: <Cube size={24} weight="duotone" />,
    },
    {
        title: 'Deep Log Analysis',
        description: 'Semantic log search powered by embeddings. Find the signal in the noise across millions of log lines.',
        icon: <MagnifyingGlass size={24} weight="duotone" />,
    },
    {
        title: 'Horizontal Pod Autoscaling',
        description: 'Recommend and apply HPA rules trained on historical traffic patterns unique to your workloads.',
        icon: <ArrowsOut size={24} weight="duotone" />,
    },
    {
        title: 'Policy & Compliance Guard',
        description: 'Continuous policy enforcement with drift detection and automated remediation against your golden config.',
        icon: <ShieldCheck size={24} weight="duotone" />,
    },
]

function Feature({ title, description, icon, index }) {
    return (
        <div
            className={cn(
                'flex flex-col lg:border-r border-slate-200 py-10 relative group/feature',
                (index === 0 || index === 4) && 'lg:border-l border-slate-200',
                index < 4 && 'lg:border-b border-slate-200'
            )}
        >
            {index < 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-indigo-50/80 to-transparent pointer-events-none rounded-tl-xl rounded-tr-xl" />
            )}
            {index >= 4 && (
                <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-indigo-50/80 to-transparent pointer-events-none rounded-bl-xl rounded-br-xl" />
            )}
            <div className="mb-4 relative z-10 px-10 text-indigo-500">
                {icon}
            </div>
            <div className="text-[15px] font-bold mb-2 relative z-10 px-10">
                <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-slate-200 group-hover/feature:bg-indigo-500 transition-all duration-200 origin-center" />
                <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-slate-800">
                    {title}
                </span>
            </div>
            <p className="text-[13px] text-slate-500 max-w-xs relative z-10 px-10 leading-relaxed">
                {description}
            </p>
        </div>
    )
}

export function FeaturesSection() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 max-w-7xl mx-auto">
            {features.map((feature, index) => (
                <Feature key={feature.title} {...feature} index={index} />
            ))}
        </div>
    )
}
