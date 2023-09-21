import Header from './Header'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
        <Header />
        <main className='bg-[#000000] min-h-screen'>
            <Outlet />
        </main>
    </div>
  )
}
