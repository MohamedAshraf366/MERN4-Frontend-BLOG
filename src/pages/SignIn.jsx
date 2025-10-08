import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
const API_URL = import.meta.env.VITE_API_URL;

function SignIn() {
    let{user, login, logout} = useAuth()
    let navigate = useNavigate()
    let[error, seterror]= useState(null)
    let[form, setform] = useState({email:'', password:''})
    let handleChange = (e)=>{
        setform({...form, [e.target.name]:e.target.value})
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        seterror(null)
        try{
            let fetchSignin = async()=>{
                let resp = await fetch(`${API_URL}/user/signin`,{
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body:JSON.stringify(form),
                })
                let data = await resp.json()
                if(resp.ok){
                    localStorage.setItem('token', data.data.token)
                    login(data.data.token)
                    toast.success(`welcome ${data.data.user.name}`)
                    navigate('/')
                    setform({email:'', password:''})
                }
                else{
                    seterror(data.data)
                }
            }
            fetchSignin()
        }
        catch(error){
            console.log('The error in login >>>>', error.message)
        }
    }

  return (
    <section className='w-3/4 mx-auto'>
        <form className='' onSubmit={handleSubmit}>
            <p className='text-6xl text-blue-500 text-center mb-10'>Sign In</p>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Email</label>
                <input type="email" id="email" name='email' value={form.email} onChange={handleChange} autoFocus className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input type="password" id="password" name='password' value={form.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>
            {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
            <button type='submit' className='bg-blue-500 text-white px-8 py-2.5 rounded-xl hover:bg-blue-600 hover:rounded-full cursor-pointer'>Sign In</button> 
        </form>
    </section>
  )
}

export default SignIn