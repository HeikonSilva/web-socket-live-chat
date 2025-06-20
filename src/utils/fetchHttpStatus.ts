import axios from 'axios'
import { useCallback, useState } from 'react'

/**
 * Custom hook to fetch API status with loading state.
 * Returns [status, loading, refreshFn]
 *
 * ATENÇÃO: Certifique-se que as variáveis de ambiente estejam disponíveis no client-side!
 * Para React (Vite): VITE_BACK_HOST, VITE_BACK_PORT
 * Para React (CRA): REACT_APP_BACK_HOST, REACT_APP_BACK_PORT
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
      // Ajuste aqui para pegar variáveis do ambiente no client-side
      const host = import.meta.env.VITE_BACK_HOST
      const port = import.meta.env.VITE_BACK_PORT
      // Remove trailing slash do host e monta a url certinho
      const baseUrl = host.replace(/\/$/, '') + (port ? `:${port}` : '')
      const res = await axios.get<{ status: 'online' | 'offline' }>(
        `http://${baseUrl}/status`
      )
      setStatus(res.data.status === 'online')
    } catch (err) {
      setStatus(false)
    } finally {
      setLoading(false)
    }
  }, [])

  return [status, loading, fetchStatus]
}
