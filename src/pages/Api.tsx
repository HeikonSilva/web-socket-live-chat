import { useEffect, useState } from 'react'
import client from '../utils/api'

export default function Api() {
  const [status, setStatus] = useState<{ online: boolean } | null>(null)
  const [loading, setLoading] = useState(true) // novo estado para loading

  useEffect(() => {
    setLoading(true)
    client.status
      .get()
      .then(({ data }) => setStatus(data))
      .finally(() => setLoading(false)) // encerra o loading quando terminar
  }, [])

  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 h-2/3 flex rounded-2xl shadow-xl p-4 flex flex-col gap-4 justify-center items-center">
        <h1 className="text-4xl font-bold">API Status:</h1>
        <span className="text-lg">
          {loading
            ? 'Carregando...' // mostra enquanto está carregando
            : status?.online
            ? 'Online'
            : 'Offline'}
        </span>
      </div>
    </div>
  )
}
