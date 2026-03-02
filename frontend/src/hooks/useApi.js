import { useState, useEffect, useCallback } from 'react'

// When served from FastAPI (port 8000), use relative URLs.
// When running Vite dev server separately, fall back to localhost:8000.
const API_BASE = window.location.port === '8000' ? '' : 'http://localhost:8000'

function useFetch(url, interval = 30000) {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchData = useCallback(async () => {
        try {
            const res = await fetch(url)
            if (!res.ok) throw new Error(`HTTP ${res.status}`)
            const json = await res.json()
            setData(json)
            setError(null)
        } catch (err) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }, [url])

    useEffect(() => {
        fetchData()
        const timer = setInterval(fetchData, interval)
        return () => clearInterval(timer)
    }, [fetchData, interval])

    return { data, loading, error, refetch: fetchData }
}

export function useClusterStatus() {
    return useFetch(`${API_BASE}/cluster/status`)
}

export function useAIAnalysis() {
    return useFetch(`${API_BASE}/analyze/quick`)
}

export function useAlerts() {
    return useFetch(`${API_BASE}/alerts/`)
}

export async function fetchClusterStatus() {
    const res = await fetch(`${API_BASE}/cluster/status`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function fetchAIAnalysis() {
    const res = await fetch(`${API_BASE}/analyze/quick`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function fetchAlerts() {
    const res = await fetch(`${API_BASE}/alerts/`)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

export async function healCluster() {
    const res = await fetch(`${API_BASE}/alerts/heal`, { method: 'POST' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}
