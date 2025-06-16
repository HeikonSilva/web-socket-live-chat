import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className="bg-gradient-to-tr from-teal-400 to-yellow-200 w-screen h-screen flex justify-center items-center">
      <div className="bg-white/40 w-1/2 h-2/3 flex rounded-2xl flex-col shadow-xl">
        <Outlet />
      </div>
    </div>
  )
}
