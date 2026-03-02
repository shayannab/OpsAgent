import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatBar from './components/StatBar'
import ClusterHealthCard from './components/ClusterHealthCard'
import PodGrid from './components/PodGrid'
import AIAnalysisSection from './components/AIAnalysisSection'
import HealButton from './components/HealButton'
import Toast from './components/Toast'
import SourceIllustrations from './components/SourceIllustrations'
import { fetchClusterStatus, fetchAIAnalysis, fetchAlerts } from './hooks/useApi'

import ActivityFeed from './components/ActivityFeed'

function App() {
    const [clusterData, setClusterData] = useState(null)
    const [analyzeData, setAnalyzeData] = useState(null)
    const [alertsData, setAlertsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [toast, setToast] = useState(null)
    const [scrollOffset, setScrollOffset] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollOffset(window.pageYOffset)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const loadData = async () => {
        try {
            const [cluster, analysis, alerts] = await Promise.all([
                fetchClusterStatus(),
                fetchAIAnalysis(),
                fetchAlerts()
            ])
            setClusterData(cluster)
            setAnalyzeData(analysis)
            setAlertsData(alerts)
            setError(null)
        } catch (err) {
            setError("Connection Lost")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        loadData()
        const interval = setInterval(loadData, 30000)
        return () => clearInterval(interval)
    }, [])

    const handleHealed = (result) => {
        if (result.error) {
            setToast({ message: `Heal failed: ${result.error}`, type: 'error' })
        } else {
            setToast({ message: 'Cluster healed successfully', type: 'success' })
            loadData()
        }
    }

    return (
        <div className="min-h-screen relative font-sans text-slate-900 overflow-x-hidden pt-16">
            {/* Parallax Grid Background */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: 'linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    backgroundPosition: `center ${scrollOffset * 0.3}px`,
                    opacity: 0.6
                }}
            />
            <SourceIllustrations />

            <Navbar isLive={!error} />

            <main className="relative z-10">
                <HeroSection
                    clusterData={clusterData}
                    analyzeData={analyzeData}
                    loading={loading}
                />

                <StatBar
                    clusterData={clusterData}
                    analyzeData={analyzeData}
                    loading={loading}
                />

                <div className="space-y-0">
                    <section className="bg-white py-20">
                        <div className="max-w-7xl mx-auto px-8">
                            <ClusterHealthCard analyzeData={analyzeData} loading={loading} />
                        </div>
                    </section>

                    <section className="bg-transparent py-20">
                        <div className="max-w-7xl mx-auto px-8">
                            <PodGrid pods={clusterData?.pods || []} loading={loading} />
                        </div>
                    </section>

                    <section className="bg-white py-20">
                        <div className="max-w-7xl mx-auto px-8">
                            <AIAnalysisSection alertsData={alertsData} loading={loading} />
                        </div>
                    </section>

                    <section className="bg-transparent py-20">
                        <div className="max-w-7xl mx-auto px-8 flex flex-col lg:flex-row gap-16">
                            <div className="lg:w-1/3">
                                <ActivityFeed />
                            </div>
                            <div className="lg:w-2/3 flex items-center justify-center">
                                <HealButton onHealed={handleHealed} />
                            </div>
                        </div>
                    </section>
                </div>
            </main>


            <footer className="relative z-10 py-12 px-8 border-t border-[rgba(26,26,46,0.08)] bg-white/50 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">OpsAgent</span>
                        <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-400">v2.1.0-PREMIUM</span>
                    </div>
                    <p className="text-slate-400 text-sm font-medium">
                        Advanced Kubernetes Intelligence Engine
                    </p>
                </div>
            </footer>

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onDismiss={() => setToast(null)}
                />
            )}
        </div>
    )
}

export default App
