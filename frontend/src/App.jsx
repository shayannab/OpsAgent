import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Toast from './components/Toast'
import LandingPage from './pages/LandingPage'
import DashboardPage from './pages/DashboardPage'
import { fetchClusterStatus, fetchAIAnalysis, fetchAlerts } from './hooks/useApi'

import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import StatusPage from './pages/StatusPage'
import PricingPage from './pages/PricingPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'

function App() {
    const [clusterData, setClusterData] = useState(null)
    const [analyzeData, setAnalyzeData] = useState(null)
    const [alertsData, setAlertsData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [toast, setToast] = useState(null)

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
        <div className="min-h-screen relative font-sans text-slate-900 overflow-x-hidden bg-[#fcfdff]">
            <Navbar isLive={!error} />

            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={
                    <DashboardPage 
                        clusterData={clusterData}
                        analyzeData={analyzeData}
                        alertsData={alertsData}
                        loading={loading}
                        handleHealed={handleHealed}
                    />
                } />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/status" element={<StatusPage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                <Route path="/terms" element={<TermsPage />} />
            </Routes>

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
