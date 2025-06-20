import { useCallback, useState } from 'react'
import { getStatus } from '../api'

/**
 * Custom hook to fetch API status with loading state.
 * Returns [status, loading, refreshFn]
 */
export function useApiStatus(): [
  boolean | undefined, // status: true=online, false=offline, undefined=not loaded
  boolean, // loading
  () => Promise<void> // refresh function
] {
  const [status, setStatus] = useState<boolean | undefined>()
  const [loading, setLoading] = useState(false)

  const fetchStatus = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getStatus()
      setStatus(res.data?.status === 'online')
    } catch {
      setStatus(false)
    } finally {
      setLoading(false)
    }
  }, [])

  return [status, loading, fetchStatus]
}
