import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import LoadingPage from './LoadingPage';
const API_URL = import.meta.env.VITE_API_URL;

function MyPosts() {
    let[loading, setloading] = useState(true)
    let navigate = useNavigate()
     let[post, setpost] = useState([])
        useEffect(()=>{
            let fetchPost =  async()=>{
                try{
                    let resp = await fetch(`${API_URL}/post/myPost`,{
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('token')}`
                        }
                    })
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
                finally{
                    setloading(false)
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
    if(loading){
        return <LoadingPage />
    }
  return (
    <section className=' bg-gray-100'>
        <div className='mx-auto w-1/2 pt-4 pb-4'>
            {post.length > 0 ? (<>
                {post.map((po)=>(
                    <div key={po._id}  className='grid grid-cols-1 md:grid-cols-12  gap-4 mt-3 mb-3 shadow-sm hover:shadow-lg transition border-2 p-4 rounded-xl'>
                        <p className='col-span-6 break-words leading-relaxed'>{po.title}</p>
                        <div className='col-span-6 flex flex-row items-center'>
                            <button onClick={()=>handleEditPost(po._id)} className='p-2 rounded-xl cursor-pointer text-white me-4 bg-amber-400'>Edit</button>
                            <button onClick={()=>handleDeletepost(po._id)} className='p-2 rounded-xl cursor-pointer text-white me-4 bg-red-500'>Delete</button>
                            <button onClick={() => navigate(`/post/${po._id}`)} className='p-2 rounded-xl cursor-pointer text-white me-4 bg-blue-500'>More Details</button>
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

export default MyPosts