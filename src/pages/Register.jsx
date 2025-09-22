import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from 'react'
function Register() {
  let navigate = useNavigate()
  let token = localStorage.getItem('token')
  let {user, login} = useContext(AuthContext)
  let[form, setForm] = useState({name:'', email:'', password:''})
  let[error, setError] = useState(null)
  useEffect(() => {
        AOS.init({
            duration:2000,
            mirror:true
        })
        
    }, [])
  let handleChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
  }
  let handleSubmit = async(e)=>{
    e.preventDefault()
      setError(null)
      let resp = await fetch('https://mern1-restaurant-backend.onrender.com/user/register', 
        {
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body:JSON.stringify(form),//send data inside form as JSON String
        }
      )
      let data = await resp.json()
      if(resp.ok){
        login(data.data.token)
        // console.log('register page:', data.data.token)
        navigate('/')
        toast.success(`Hello ${data.data.user.name}`)
      }
      else if(!resp.ok){
        setError(data.data)
        // console.log(data.data)
      }
  }
  return (
    <section className='flex flex-col items-center justify-center mt-10'>
            <form className='rounded-xl shadow-lg w-3/4 md:w-1/2 overflow-hidden p-10' onSubmit={handleSubmit}>
                <p className='text-4xl font-extrabold text-center'>Register</p>
                <div data-aos="fade-right" className='mt-8'>
                    <div className="mb-5 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="text" name='name' value={form.name} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" autoFocus placeholder="mohamed@ashraf.com" required />
                    </div>
                    <div className="mb-5 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name='email' value={form.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" autoFocus placeholder="mohamed@ashraf.com" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name='password' value={form.password} onChange={handleChange} minLength={8} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" className="text-white hover:bg-yellow-400 bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Submit</button>                 
                </div>
                <p className='mt-5 text-center font-bold'>Don't have an acount ? 
                        <Link to={'/login'} className='text-amber-400'> Log In </Link>now
                    </p>
                {error && <p className='text-red-500 mt-5 text-center font-bold'>{error}</p>}

            </form>
        </section>
  )
}

export default Register