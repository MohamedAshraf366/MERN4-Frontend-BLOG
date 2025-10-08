import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

function ShowPosts() {
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
  return (
    <section className='bg-gray-100 mt-10'>
        <div className='w-1/2 mx-auto pt-10 pb-10'>
        {post.length > 0 ? (<>
            {post.map((po)=>(
                <Link key={po._id} to={`/post/${po._id}`} className='grid grid-cols-1 md:grid-cols-12  gap-4 mt-3 mb-3 justify-between items-center shadow-sm hover:shadow-lg transition border-2 p-4 rounded-xl'>
                <div className='col-span-8'>
                    <p className='line-clamp-1'>{po.title}</p>
                    <p className='font-extralight text-[12px]'>Written by: {po.createdBy?.name}</p>
                </div >
                <p className='col-span-4'>{new Date(po.createdAt).toLocaleString()}</p>
            </Link>
            ))}
        </>):(<>
            <p className='text-center font-extrabold text-8xl'>No Post</p>
        </>)}
        </div>
    </section>
  )
}

export default ShowPosts