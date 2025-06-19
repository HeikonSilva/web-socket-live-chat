import { useEffect, useState } from 'react'
import { getStatus } from '../api'

export default function Api() {
  const [responseHttp, setResponseHttp] = useState<boolean | undefined>()
  const [loadingHttp, setLoadingHttp] = useState(false)
  const [responseWs, setResponseWs] = useState<boolean | undefined>()
  const [loadingWs, setLoadingWs] = useState(false)

  // HTTP STATUS
  const fetchStatus = async () => {
    setLoadingHttp(true)
    try {
      const resHttp = await getStatus()
      setResponseHttp(resHttp.data?.status === 'online')
    } catch {
      setResponseHttp(undefined)
    } finally {
      setLoadingHttp(false)
    }
  }

  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 h-2/3 flex rounded-2xl shadow-xl flex-row">
        <div className="flex flex-col gap-4 p-4 h-full w-1/2 justify-center items-center">
          <h1 className="text-4xl font-bold">API HTTP Status:</h1>
          <span className="text-lg">
            {loadingHttp
              ? 'Loading...'
              : responseHttp === undefined
              ? 'Unknown'
              : responseHttp
              ? 'Online'
              : 'Offline'}
          </span>
          <button
            className="mt-4 px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-600 font-bold transition-all"
            onClick={fetchStatus}
            disabled={loadingHttp}
          >
            Refresh
          </button>
        </div>
        <div className="flex flex-col gap-4 p-4 h-full w-1/2 justify-center items-center">
          <h1 className="text-4xl font-bold">API WS Status:</h1>
          <span className="text-lg">...</span>
          <button className="mt-4 px-4 py-2 bg-teal-400 text-white rounded hover:bg-teal-600 font-bold transition-all">
            Refresh
          </button>
        </div>
      </div>
    </div>
  )
}
