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
import Footer from './components/Footer'

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
        <div className="min-h-screen relative font-sans text-slate-900 overflow-x-hidden">
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
                <HeroSection />



                {/* ── Light content zone ── */}
                <div className="relative bg-[#f0f0ff]">
                    {/* Subtle dot-grid texture */}
                    <div className="absolute inset-0 pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, rgba(99,102,241,0.10) 1px, transparent 1px)',
                            backgroundSize: '28px 28px',
                        }}
                    />

                    <div className="relative z-10 space-y-0">
                        <StatBar
                            clusterData={clusterData}
                            analyzeData={analyzeData}
                            loading={loading}
                        />

                        <section className="py-20">
                            <div className="max-w-7xl mx-auto px-8">
                                <ClusterHealthCard analyzeData={analyzeData} loading={loading} />
                            </div>
                        </section>

                        <section className="py-20">
                            <div className="max-w-7xl mx-auto px-8">
                                <PodGrid pods={clusterData?.pods || []} loading={loading} />
                            </div>
                        </section>

                        <section className="py-20">
                            <div className="max-w-7xl mx-auto px-8">
                                <AIAnalysisSection alertsData={alertsData} loading={loading} />
                            </div>
                        </section>

                        <section className="py-20">
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


                </div>
            </main>

            <Footer />

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
