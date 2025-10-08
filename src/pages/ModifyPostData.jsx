import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

function ModifyPostData() {
    let navigate = useNavigate()
    let {id} = useParams()
    let[form, setform] = useState({title:'', body:''})
    let[error, seterror] = useState(null)
    useEffect(()=>{
        let fetchPost = async()=>{
            try{
                let resp = await fetch(`${API_URL}/post/${id}`)
                let data = await resp.json()
                if(resp.ok){
                    console.log(data.data)
                    setform({title:data.data.title, body:data.data.body})
                }
                else{
                    setform(data.data)
                }
            }
            catch(error){
                console.log('The error in modify password 1:', error.message)
            }
        }
        fetchPost()
    },[id])
    let handleChange =(e)=>{
        setform({...form, [e.target.name]:e.target.value})
    }
    let handleSubmit = (e)=>{
        e.preventDefault()
        seterror(null)
        let fetchPost = async()=>{
            try{
                let resp = await fetch(`${API_URL}/post/modifyPost/${id}`,{
                    method:"PATCH",
                    headers:{
                        'Content-Type': 'application/json',

                    },
                    body: JSON.stringify(form),
                })
                let data = await resp.json()
                if(resp.ok){
                    toast.success('Post updated successfully!')
                    navigate('/')
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
            <p className='text-6xl text-blue-500 text-center mb-10'>Edit Post</p>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">title</label>
                <input type="text" id="title" name='title' value={form?.title} onChange={handleChange} autoFocus className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required />
            </div>

            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
                <textarea type="text" id="body" name='body' value={form?.body} onChange={handleChange} rows={6} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required></textarea>
            </div>
            {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
            <button type='submit' className='bg-blue-500 text-white px-8 py-2.5 rounded-xl hover:bg-blue-600 hover:rounded-full cursor-pointer'>Edit Post</button> 
        </form>
    </section>
  )
}

export default ModifyPostData