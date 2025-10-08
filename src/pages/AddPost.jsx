import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

function AddPost() {
    let navigate = useNavigate()
    let[form, setform] = useState({title:'', body:''})
    let[error, seterror] = useState(null)
    let handleChange =(e)=>{
        setform({...form, [e.target.name]:e.target.value})
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        seterror(null)
        let fetchPost = async()=>{
            try{
                let resp = await fetch(`${API_URL}/post/addPost`,{
                    method:"POST",
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(form),
                })
                let data = await resp.json()
                if(resp.ok){
                    toast.success('Post added successfully!')
                    navigate('/')
                }
                else{
                    console.log(data.data)
                    toast.error(data.data || "Something went wrong")
                }
            }
            catch(error){
                console.log('The error in modify password 2:', error.message)
            }
        }
        fetchPost()
    }
  return (
    <section className='w-3/4 mx-auto'>
        <form className='' onSubmit={handleSubmit}>
            <p className='text-6xl text-blue-500 text-center mb-10'>Add Post</p>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">title</label>
                <input type="text" id="title" name='title' value={form?.title} onChange={handleChange} autoFocus className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea type="text" id="body" name='body' value={form?.body} onChange={handleChange} rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
            </div>
            {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
            <button type='submit' className='bg-blue-500 text-white px-8 py-2.5 rounded-xl hover:bg-blue-600 hover:rounded-full cursor-pointer'>Add Post</button> 
        </form>
    </section>
  )
}

export default AddPost