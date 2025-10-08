import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoadingPage from './LoadingPage'
const API_URL = import.meta.env.VITE_API_URL;
function SpecificPost() {
    let{id} = useParams()
    let[post, setpost] = useState(null)
    let[loading, setloading] = useState(true)
    useEffect(()=>{
        let fetchPost = async()=>{
            try{
                let resp = await fetch(`${API_URL}/post/${id}`)
                let data = await resp.json()
                if(resp.ok){
                    setpost(data.data)
                    console.log(data.data)
                }
                else{
                    setpost(data.data)
                }
            }
            catch(error){
                console.log('The error in fetch all post > specific post', error.message)
            }
            finally{
                setloading(false)
            }
        }
        fetchPost()
    },[id])
    if(loading){ return <LoadingPage /> }
  return (
    <section className='w-3/4 mx-auto'>
        <div className=''>
            <p className='text-4xl font border-b-2 w-1/8 pb-2 border-blue-700'>{post?.title}</p>
            <p className='mt-1'>Written by: <span className='font-extrabold'>{post.createdBy.name}</span></p>
            <p className='mt-4 break-words leading-relaxed'>{post?.body}</p>
        </div>
    </section>
  )
}

export default SpecificPost