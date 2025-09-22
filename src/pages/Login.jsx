import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate , Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import AOS from "aos"
import "aos/dist/aos.css"

function Login() {
    let{user, login} = useContext(AuthContext)
    let[form, setform] = useState({email:'', password:''})
    let[error, seterror] = useState(null)
    let navigate = useNavigate()
    let token = localStorage.getItem('token')
    useEffect(() => {
            AOS.init({
                duration:2000,
                mirror:true
            })
            
        }, [])

    let handleChange = (e)=>{
        setform({...form,[e.target.name]:e.target.value})
    }
    let handleSubmit = async(e)=>{
            e.preventDefault()
            seterror(null)
            let resp = await fetch('https://mern1-restaurant-backend.onrender.com/user/login', 
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
                // console.log('Login Page : ',data.data)
                login(data.data.token)
                navigate('/')
                toast.success(`Hello ${data.data.user.name}`)
            }
            if(!resp.ok)
                seterror(data.data)
    }
  return (
    <>
        <section className='flex flex-col items-center justify-center mt-10'>
            <form className='rounded-xl shadow-lg  w-3/4 md:w-1/2 overflow-hidden p-10' onSubmit={handleSubmit}>
                <p className='text-4xl font-extrabold text-center'>Log In</p>
                <div className='mt-8'>

                    <div data-aos="fade-right" className="mb-5 w-full">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name='email' value={form.email} onChange={handleChange} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" autoFocus placeholder="mohamed@ashraf.com" required />
                    </div>
                    <div data-aos="fade-right" className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input type="password" name='password' value={form.password} onChange={handleChange} id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" required />
                    </div>
                    <button type="submit" className="text-white hover:bg-yellow-400 bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Submit</button>
                                    
                </div>
                    <p className='mt-5 text-center font-bold'>Don't have an acount ? 
                        <Link to={'/register'} className='text-amber-400'> Register </Link>now
                    </p>
                    {error && <p className='text-red-500 mt-5 text-center font-bold'>{error}</p>}

            </form>
        </section>
    </>
  )
}

export default Login