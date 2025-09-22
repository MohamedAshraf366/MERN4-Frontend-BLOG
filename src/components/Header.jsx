import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/KarmElsham.webp'
import { useCart } from '../context/CartContext'
import { IoFastFood } from "react-icons/io5";
import Swal from 'sweetalert2'


function Header() {
  let{user, logout} = useContext(AuthContext)
  let{cart} = useCart()

  let navigate = useNavigate()
  let handleLogout = ()=>{
    Swal.fire({
  title: "Are you sure you want to log out?",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#FFB900",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, Log out"
}).then((result) => {
  if (result.isConfirmed) {
    Swal.fire({
      title: "Byeeeeeeeeee!",
      icon: "success"
    });
    logout()
    navigate('/')
  }
});
    
  }
  return (
    <div>
<nav className="bg-white border-gold-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src={logo} className="h-12 rounded-lg" alt="KarmElsham Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Karm El Sham</span>
    </a>
    <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span className="sr-only">Open main menu</span>
        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
        </svg>
    </button>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 lg:items-center lg:justify-center">
        <li>
          <Link to={'/'} className="block py-2 px-3 text-white bg-yellow-400 rounded-sm md:bg-transparent md:text-yellow-400 md:p-0 " aria-current="page">Home</Link>
        </li>
        <li>
          <Link to={'/about'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0">About</Link>
        </li>
        <li>
          <Link to={'/allCategory'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0">Food Category</Link>
        </li>
        <li>
          <Link to={'/allMenu'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0">Food Menu</Link>
        </li>
        {user?.role?.trim() === 'admin' &&(
          <>
            <li>
              <Link to={'/addCategory'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0">Add Category</Link>
            </li>
            <li>
              <Link to={'/addMenu'} className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0">Add Menu</Link>
            </li>
          </>
        )}
        {!user &&(
          <>
          <li>
              <Link to="/login" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 dark:text-white">Log In</Link>
            </li>
            <li>
              <Link to="/register" className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow-400 md:p-0 dark:text-white">Register</Link>
            </li>
          </>
        )}

        {user &&(
          <>
          
            <Link to='/cartList'  className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white rounded-lg  focus:ring-4 focus:outline-none">
            <IoFastFood className='text-amber-400 text-3xl' />
              <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-amber-400 border-2 border-white rounded-full top-4 start-8 md:top-4 md:start-9 ">{cart?.length || 0}</div>
            </Link>
            <button to={'/'} onClick={handleLogout}
            className='p-3 bg-yellow-300 text-white rounded-xl hover:bg-yellow-400 focus:bg-yellow-500'>Log out</button>
          
          </>
        )}
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default Header