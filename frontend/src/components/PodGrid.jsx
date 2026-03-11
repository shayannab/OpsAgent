const STATUS_CONFIG = {
    Running: { color: '#00d9a3', pulseClass: 'pulse-teal', label: 'RUNNING' },
    Pending: { color: '#6366f1', pulseClass: '', label: 'PENDING' },
    Failed: { color: '#ff4d00', pulseClass: '', label: 'FAILED' },
}

function PodCard({ pod }) {
    const status = STATUS_CONFIG[pod.status] ?? { color: '#94a3b8', pulseClass: '', label: pod.status.toUpperCase() }
    const isFailed = pod.status === 'Failed'

    return (
        <div className={`card-premium p-8 relative group cursor-pointer ${isFailed ? 'border-orange-500/20 bg-orange-50/10' : ''}`}>
            {/* Header: LED + Name */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`w-2.5 h-2.5 rounded-full ${status.pulseClass}`} style={{ background: status.color }} />
                <div className="font-bold text-[14px] text-[#1a1a2e] leading-tight break-all tracking-tight truncate">
                    {pod.name}
                </div>
            </div>

            {/* Namespace */}
            <div className="flex items-center gap-2 mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-[rgba(26,26,46,0.08)] text-slate-500">
                    {pod.namespace}
                </span>
            </div>

            {/* Footer: Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-[rgba(26,26,46,0.04)] font-mono">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">RESTARTS</span>
                <span className={`text-sm font-bold ${pod.restarts > 5 ? 'text-[#ff4d00] animate-pulse' : pod.restarts > 0 ? 'text-[#ff4d00]' : 'text-[#00d9a3]'}`}>
                    {pod.restarts}
                </span>
            </div>

            {/* Hover Indicator */}
            <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2.5" className="w-full h-full">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
            </div>
        </div>
    )
}

function SkeletonPodCard() {
    return (
        <div className="card p-6 space-y-4">
            <div className="flex items-center gap-3">
                <div className="skeleton rounded-full w-2.5 h-2.5" />
                <div className="skeleton h-4 w-3/4" />
            </div>
            <div className="skeleton h-4 w-1/4" />
            <div className="skeleton h-4 w-full" />
        </div>
    )
}

export default function PodGrid({ pods, loading }) {
    const runningPods = (pods || []).filter(p => p.status === 'Running').length

    return (
        <section>
            <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                    <h2 className="text-4xl font-extrabold tracking-tighter text-[#1a1a2e]">Current Fleet</h2>
                    <div className="px-4 py-1 bg-[#1a1a2e] text-white font-mono text-sm font-bold rounded-full">
                        {loading ? '—' : (pods?.length ?? '—')}
                    </div>
                </div>
                {!loading && pods?.length > 0 && (
                    <div className="font-mono text-[11px] text-slate-400 font-bold uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#00d9a3]" />
                        {runningPods} Healthy Pods Operating
                    </div>
                )}
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <SkeletonPodCard key={i} />
                    ))}
                </div>
            ) : !pods || pods.length === 0 ? (
                <div className="glass p-12 rounded-[32px] border border-[rgba(26,26,46,0.08)] flex flex-col items-center justify-center text-center">
                    <div className="w-full max-w-md bg-[#1a1a2e] rounded-xl p-8 font-mono text-[13px] leading-6 shadow-2xl relative overflow-hidden text-left">
                        <div className="absolute top-0 right-0 p-3 opacity-20">
                            <span className="text-white text-4xl font-black">!</span>
                        </div>
                        <div className="flex gap-2 text-slate-400 mb-2">
                            <span className="text-[#00d9a3] font-bold">root@opsagent:</span>
                            <span className="text-[#6366f1] italic">~/cluster</span>
                        </div>
                        <div className="flex gap-2 text-white">
                            <span className="text-[#00d9a3] font-bold">$</span>
                            <span className="font-bold">kubectl get pods</span>
                        </div>
                        <div className="text-slate-400 mt-2">
                            No resources found in default namespace.
                        </div>
                        <div className="mt-4 flex gap-2 items-center">
                            <span className="text-[#00d9a3] font-bold">$</span>
                            <span className="animate-pulse w-2 h-4 bg-[#00d9a3]" />
                        </div>
                    </div>
                    <p className="mt-8 text-slate-400 font-medium max-w-sm">No active pods detected in the targeted context. Connect a cluster or deploy resources to begin telemetry.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pods.map((pod, i) => (
                        <div
                            key={pod.name}
                            className="animate-stagger"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <PodCard pod={pod} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
