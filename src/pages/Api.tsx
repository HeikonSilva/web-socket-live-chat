import { useEffect } from 'react'
import { useApiStatus } from '../utils/fetchHttpStatus'

export default function Api() {
  const [status, loading, refresh] = useApiStatus()

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 h-2/3 flex rounded-2xl shadow-xl flex-col gap-4 p-4 justify-center items-center">
        <h1 className="text-4xl font-bold text-teal-500">API Status</h1>
        {loading ? (
          <span className="text-lg bg-yellow-200 border-yellow-500 border-2 rounded-lg px-6 py-3 font-semibold text-yellow-700 flex flex-row items-center gap-2">
            <svg
              className="w-6 h-6 animate-spin text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Loading...
          </span>
        ) : status ? (
          <span className="text-lg bg-green-100 border-green-500 border-2 rounded-lg px-6 py-3 font-semibold text-green-700 flex flex-row items-center gap-2">
            <svg
              className="w-6 h-6 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" className="fill-green-200" />
              <path
                d="M9 12l2 2 4-4"
                stroke="#22C55E"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Online
          </span>
        ) : (
          <span className="text-lg bg-red-100 border-red-500 border-2 rounded-lg px-6 py-3 font-semibold text-red-700 flex flex-row items-center gap-2">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" className="fill-red-200" />
              <path
                d="M15 9l-6 6M9 9l6 6"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Offline
          </span>
        )}
        <button
          className="mt-4 px-4 py-2 bg-gradient-to-r from-teal-400 to-yellow-400 hover:from-teal-600 hover:to-yellow-600 hover:cursor-pointer text-white rounded hover:bg-teal-600 font-bold transition-all"
          onClick={refresh}
          disabled={loading}
        >
          Refresh
        </button>
      </div>
    </div>
  )
}
