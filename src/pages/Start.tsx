import { useState } from 'react'
import { useNavigate } from 'react-router'

export default function Start() {
  const navigate = useNavigate()
  const [usernameInput, setUsernameInput] = useState('')
  const [error, setError] = useState('')

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(e.target.value)
  }

  const handleRedirect = () => {
    if (usernameInput) {
      navigate(`/app?username=${usernameInput}`)
    } else {
      setError('Username is required')
    }
  }
  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white w-1/2 h-2/3 flex rounded-2xl flex-col shadow-xl">
        <div className="h-full w-full flex flex-col gap-12 justify-center items-center">
          <div className="w-2/3 h-2/3 flex flex-col gap-12 items-center">
            <h1 className="text-center text-4xl">Socket IO Live Chat</h1>
            <div className="w-full">
              <label htmlFor="username" className="text-left">
                Username
              </label>
              <div
                id="input"
                className={`flex flex-row border-2 ${
                  error ? 'border-red-500' : 'border-teal-400'
                } bg-white p-2 rounded-lg`}
              >
                <input
                  type="text"
                  className="w-full rounded-sm outline-none"
                  id="username"
                  value={usernameInput}
                  onChange={handleUsernameChange}
                />
              </div>
              <span className="text-red-500" id="errorHandler">
                {error}
              </span>
            </div>
            <button
              className="w-full h-10 rounded-md bg-teal-400 hover:bg-teal-600 hover:cursor-pointer transition-all text-white font-bold"
              onClick={handleRedirect}
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
