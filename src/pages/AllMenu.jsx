import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos"
import "aos/dist/aos.css"
import Loading from '../components/Loading'
function AllMenu() {
    let[loading, setloading] = useState(true)
    let[Menu, setMenu] = useState([])
    let[error, seterror] = useState(null)
    useEffect(() => {
        AOS.init({
            duration:4000,
            mirror:true
        })
        
    }, [])
    useEffect(()=>{
        let fetchMenu = async()=>{
            let resp = await fetch('https://mern-1-restaurant-backend.vercel.app/Menu/allMenu')
            let data = await resp.json()
            if(resp.ok){
                console.log('Menu part in home page', data.data)
                setMenu(data.data)
            }
            setloading(false)
            if(!resp.ok){
                console.log('Menu part in home page', data.data)
            }
        }
        fetchMenu()
    },[])
if(loading) return(
    <>
      <Loading />
    </>
    )
  return (
    <section className='p-12'>
        {Menu.length > 0 ?(
            <>
                <div className='mx-auto w-3/4 ' >
                    <p className='text-4xl font-extrabold text-center'>Menu</p>
                    <div className='grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8'>
                        {Menu.map((cat)=>(
                            <Link data-aos="fade-right" data-aos-easing="ease-in-sine" to={`/menu/${cat._id}`}
                            className=' border-2 p-4 rounded-3xl' key={cat._id}>
                                <img src={`https://mern-1-restaurant-backend.vercel.app/uploads/menu/${cat.image}`} alt={cat.name} className='w-full h-60 object-contain rounded-xl' />
                                <p className='line-clamp-1 capitalize mt-3 text-center font-bold text-xl'>{cat.name}</p>
                            </Link>
                    ))}
                    
                    </div>
               
                </div>
            </>
        ):(
            <>
            <p className='text-4xl font-extrabold text-center shadow-amber-200'>No Menu yet</p>
            </>
        )}
    </section>
  )
}

export default AllMenu