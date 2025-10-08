import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

function AdminDashbord() {
    let navigate = useNavigate()
    let[post, setpost] = useState([])
    useEffect(()=>{
        let fetchPost =  async()=>{
            try{
                let resp = await fetch(`${API_URL}/post/allPost`)
                let data = await resp.json()
                if(resp.ok){
                    setpost(data.data)
                }
                else{
                    setpost(data.data)
                }
            }
            catch(error){
                console.log('The error in fetch all post > Home', error.message)
            }
        }   
        fetchPost()
    },[])
    let handleDeletepost = async(id)=>{
        let resp = await fetch(`${API_URL}/post/deletePost/${id}`,{
            method:"DELETE",
        })
        let data = await resp.json()
        if(resp.ok){
            setpost(prev => prev.filter(p => p._id !== id))
            toast.success('Deleted succefully')
        }
    }
    let handleEditPost = (id)=>{
        navigate(`modifyPost/${id}`)
    }
  return (
    <section className='bg-gray-100 mt-10'>
        <div className='w-1/2 mx-auto pt-10 pb-10'>
        {post.length > 0 ? (<>
            {post.map((po)=>(
                <div key={po._id} to={`/post/${po._id}`} className='flex flex-col gap-4 md:flex-row mt-3 mb-3 justify-between items-center shadow-sm hover:shadow-lg transition border-2 p-4 rounded-xl'>
                    <p className=''>{po.title}</p>
                    <div>
                        <button onClick={()=>handleEditPost(po._id)} className='p-2 rounded-xl cursor-pointer text-white me-4 bg-amber-400'>Edit</button>
                        <button onClick={()=>handleDeletepost(po._id)} className='p-2 rounded-xl cursor-pointer text-white me-4 bg-red-500'>Delete</button>
                    </div>
                </div>
            ))}
        </>):(<>
            <p className='text-center font-extrabold text-8xl'>No Post</p>
        </>)}
        </div>
    </section>
  )
}

export default AdminDashbord