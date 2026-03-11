import StatBar from '../components/StatBar'
import ClusterHealthCard from '../components/ClusterHealthCard'
import PodGrid from '../components/PodGrid'
import AIAnalysisSection from '../components/AIAnalysisSection'
import ActivityFeed from '../components/ActivityFeed'
import HealButton from '../components/HealButton'
import { SquaresFour } from '@phosphor-icons/react'

const DashboardPage = ({ clusterData, analyzeData, alertsData, loading, handleHealed }) => {
    return (
        <main className="relative z-10 pt-32 min-h-screen bg-[#fcfdff]">
            {/* Contextual Header */}
            <div className="max-w-7xl mx-auto px-8 mb-16">
                <div className="flex items-center gap-4 mb-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Control Center</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-200" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">Active Cluster</span>
                </div>
                <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Operational Overview</h1>
            </div>

            {/* Stats & Health section */}
            <div className="relative pb-32">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-2xl shadow-indigo-500/5 p-12 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-50/50 rounded-full blur-[100px]" />
                        
                        <StatBar
                            clusterData={clusterData}
                            analyzeData={analyzeData}
                            loading={loading}
                        />

                        <section className="mt-20">
                            <ClusterHealthCard analyzeData={analyzeData} loading={loading} />
                        </section>
                    </div>
                </div>
            </div>

            {/* Main Dashboard section */}
            <div className="relative py-32 border-t border-slate-100 bg-[#F8F9FF]/50">
                <div className="max-w-7xl mx-auto px-8">
                    <div className="mb-20">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-white shadow-xl flex items-center justify-center text-indigo-600 border border-indigo-50">
                                <SquaresFour size={24} weight="bold" />
                            </div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">System Resources</h2>
                        </div>
                        <PodGrid pods={clusterData?.pods || []} loading={loading} />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-2">
                            <AIAnalysisSection alertsData={alertsData} loading={loading} />
                        </div>
                        <div className="flex flex-col gap-12">
                            <ActivityFeed />
                            <div className="mt-auto p-8 rounded-[32px] bg-white border border-slate-100 shadow-xl shadow-indigo-500/5 items-center justify-center flex">
                                <HealButton onHealed={handleHealed} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default DashboardPage
