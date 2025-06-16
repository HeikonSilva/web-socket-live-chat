import { SendHorizonal } from 'lucide-react'

function App() {
  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white/40 w-1/2 h-2/3 flex rounded-2xl flex-col shadow-xl">
        <div className="h-12/14 rounded-t-2xl px-4 pt-4 overflow-y-scroll flex flex-col gap-4">
          <div className="flex flex-row gap-4">
            <div className="bg-white rounded-full w-12 h-12">
              <img
                src="https://avatars.githubusercontent.com/u/42161733?v=4"
                className="rounded-full object-cover"
                alt="profile picture"
              />
            </div>
            <div className="bg-white rounded-lg p-4">
              <p className="text-sm text-gray-700">Hello, how are you today?</p>
            </div>
          </div>
        </div>
        <div className="h-2/14 rounded-b-2xl p-4 bg-white/85">
          <div className="flex flex-row h-full w-full border-2 border-teal-400 p-2 rounded-lg">
            <input
              type="text"
              className="w-full rounded-sm outline-none"
              id="message"
            />
            <div>
              <button className="size-full text-teal-400 hover:text-teal-600 hover:cursor-pointer transition-all">
                <SendHorizonal className="size-full" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
