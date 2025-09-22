import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos"
import "aos/dist/aos.css"
import Loading from '../components/Loading'
function AllCategory() {
    let[loading, setloading] = useState(true)
    let[category, setcategory] = useState({})
    let[error, seterror] = useState(null)
     useEffect(() => {
            AOS.init({
                duration:1000,
                mirror:true
            })
            
        }, [])
    useEffect(()=>{
        let fetchCategory = async()=>{
            let resp = await fetch('https://mern1-restaurant-backend.onrender.com/category/allCategory')
            let data = await resp.json()
            if(resp.ok){
                console.log('Category part in home page', data.data)
                setcategory(data.data)
            }
            setloading(false)
            if(!resp.ok){
                console.log('Category part in home page', data.data)
            }
        }
        fetchCategory()
    },[])
    if(loading) return(
    <>
      <Loading />
    </>
    )
  return (
    <section className='p-12 bg-gray-100'>
        {category.length > 0 ?(
            <>
                <div className='mx-auto w-3/4 ' >
                    <p className='text-4xl font-extrabold text-center'>Category</p>
                    <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8'>
                        {category.map((cat)=>(
                            
                            <Link data-aos="fade-right" data-aos-easing="ease-in-sine" to={`/menu/menuByCategory/${cat._id}`}
                            className='border-2 p-4 rounded-3xl' key={cat._id}>
                                <img src={`https://mern1-restaurant-backend.onrender.com/uploads/category/${cat.image}`} alt={cat.name} className='w-full h-60 object-contain rounded-xl' />
                                <p className='capitalize line-clamp-1 mt-3 text-center font-bold text-xl'>{cat.name}</p>
                            </Link>
                    ))}
                    
                    </div>
                                   
                </div>
            </>
        ):(
            <>
            <p className='text-4xl font-extrabold text-center shadow-amber-200'>No Category yet</p>
            </>
        )}
    </section>
  )
}

export default AllCategory