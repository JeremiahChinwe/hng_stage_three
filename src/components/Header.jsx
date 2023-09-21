import { useAuthState } from "react-firebase-hooks/auth"
import { useSignOut } from "react-firebase-hooks/auth"
import { auth } from "../firebase/firebase"
import { Link } from "react-router-dom"
import { BiUserCircle } from "react-icons/bi"

export default function Header() {
  const [user] = useAuthState(auth)
  const [signOut] = useSignOut(auth)

  return (
    <header className="bg-[#000000] text-white/90 sticky w-full top-0 z-20">
      <div className="p-4 flex justify-between items-center lg:w-[80%] mx-auto">
        <h1 className="font-[600] text-xl italic lg:text-[2rem]">Image Gallery</h1>

        <div className="flex items-center gap-4">
          {user ?
            <button
              onClick={() => signOut()}
              className="border-[1px] px-4 py-1 hover:bg-white/90 hover:text-slate-900 text-xs md:text-sm hover:font-[600] rounded-full">
              Log out</button>
            :
            <Link to="/login" className="border-[1px] px-4 py-1 hover:bg-white/90 hover:text-slate-900 text-xs md:text-sm hover:font-[600] rounded-full">
              Log in</Link>
          }
          <div className="relative group">
          {user && <BiUserCircle size={20} className="cursor-pointer" />}
          <div
								className='absolute top-10 right-0 font-[600] mx-auto bg-white text-slate-900 p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>Signed in as {user?.email}</p>
							</div>
          </div>
        </div>
      </div>
    </header>
  )
}
