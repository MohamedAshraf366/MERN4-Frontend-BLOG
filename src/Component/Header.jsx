import React, {useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoFastFood } from "react-icons/io5";
import Swal from 'sweetalert2'
import { useAuth } from '../auth/AuthContext';
import toast from 'react-hot-toast';

function Header() {
  let navigate = useNavigate()
  let{user, login, logout} = useAuth()
  // console.log(user?.name)
  const [isOpen, setIsOpen] = useState(false)
  let[searchTerm, setsearchTerm] = useState('')
  let [result, setresult] = useState([])
  let handleSearch = async(e)=>{
    e.preventDefault()
    if(!searchTerm) return
    navigate(`/search?searchTerm=${searchTerm}`)
  }
  let handleLogout = ()=>{
    toast.success(`byeeeeeeeeee ${user?.name}`)
    logout()
    navigate('/')
  }
  return (
    <div>
      <nav className="bg-white border-gold-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          Mohamed Ashraf Blog

          </a>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            type="button" 
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg 
                       md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 
                       dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default" 
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>

          {/* القايمة */}
          <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 lg:items-center lg:justify-center">
              <li>
                <Link to={'/'} className="block py-2 px-3 text-white bg-blue-400 rounded-sm md:bg-transparent md:text-blue-400 md:p-0 " aria-current="page">Home</Link>
              </li>
              {!user &&(
                <>
                  <li>
                    <Link to="/signin" className="w-full block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white">LogIn</Link>
                  </li>
                  <li>
                    <Link to="/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0 dark:text-white">Register</Link>
                  </li>
                </>
              )}
              {user?.role === 'user' &&(<>
                <li className='text-blue-700 w-full block'>
                  Welcome {user?.name}
                </li>
                <li className=' inline-block w-1/2'>
                  <Link to="/addPost" className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">Add Post</Link>
                </li>
                <li className=' inline-block w-1/2'>
                  <Link to="/myPost" className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">My Post</Link>
                </li>
                <li className=' inline-block'>
                  <Link onClick={handleLogout} to="/" className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">Logout</Link>
                </li>
              </>)}
              {user?.role === 'admin' &&(<>
                <li className='text-blue-700 w-full block'>
                  Welcome {user?.name}
                </li>
                <li className='inline-block w-1/2 '>
                  <Link to="/addPost" className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">Add Post</Link>
                </li>
                <li className='inline-block w-full'>
                  <Link to="/adminDashbord" className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">Admin Dashbord</Link>
                </li>
                <li className=' inline-block'>
                  <Link onClick={handleLogout} to="/" className="py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-400 md:p-0">Logout</Link>
                </li>
              </>)}
              <form onSubmit={handleSearch} method='POST' action={'/search'} className="flex items-center border pl-4 gap-2 border-gray-500/30 h-[46px] rounded-full overflow-hidden max-w-md w-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 30 30" fill="#6B7280">
                      <path d="M13 3C7.489 3 3 7.489 3 13s4.489 10 10 10a9.95 9.95 0 0 0 6.322-2.264l5.971 5.971a1 1 0 1 0 1.414-1.414l-5.97-5.97A9.95 9.95 0 0 0 23 13c0-5.511-4.489-10-10-10m0 2c4.43 0 8 3.57 8 8s-3.57 8-8 8-8-3.57-8-8 3.57-8 8-8"/>
                  </svg>
                  <input value={searchTerm} name='searchTerm' type="text" placeholder="Search"
                  onChange={(e)=>setsearchTerm(e.target.value)}
                  className="w-full h-full outline-none text-gray-500 bg-transparent placeholder-gray-500 text-sm" />
              </form>
           {/* Display search results */}
              {result.length > 0 && (
                <ul className="absolute bg-white shadow-md mt-1 max-h-60 overflow-auto rounded w-full z-50">
                  {result.map(item => (
                    <li key={item._id} className="p-2 hover:bg-gray-100 cursor-pointer">{item.title}</li>
                  ))}
                </ul>
              )}
       

            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Header
