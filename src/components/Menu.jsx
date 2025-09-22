import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import AOS from "aos"
import "aos/dist/aos.css"
import Loading from '../components/Loading'
function Menu() {
    
    let[loading, setloading] = useState(true)
    let[Menu, setMenu] = useState({})
    let[error, seterror] = useState(null)
     useEffect(() => {
            AOS.init({
                duration:2000,
                mirror:true
            })
            setloading(false)
        }, [])
    useEffect(()=>{
        let fetchMenu = async()=>{
            let resp = await fetch('https://mern1-restaurant-backend.onrender.com/Menu/allMenu')
            let data = await resp.json()
            if(resp.ok){
                // console.log('Menu part in home page', data.data)
                setMenu(data.data)
            }
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
                    <div  className='grid sm:grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8'>
                        {Menu.slice(0,6).map((cat)=>(
                            <Link data-aos="fade-left" to={`/menu/${cat._id}`}
                            className=' border-2 p-4 rounded-3xl' key={cat._id}>
                                <img src={`https://mern1-restaurant-backend.onrender.com/uploads/category/${cat.image}`} alt={cat.name} className='w-full h-60 object-contain rounded-xl' />
                                <p className=' mt-3 text-center font-bold text-xl'>{cat.name}</p>
                            </Link>
                    ))}
                    
                    </div>
                    <div className="flex items-center justify-center">
                        <Link  to={'/allMenu'}  className='flex items-center gap-2 text-center p-3 bg-yellow-300 text-white font-bold rounded-xl 
                                    hover:bg-yellow-400  transition-colors duration-300'>
                            All Menu Items <span className='mt-1 font-bold'><FaArrowRight /></span>
                        </Link>
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

export default Menu