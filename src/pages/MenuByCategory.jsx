import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Loading from '../components/Loading'


function MenuByCategory() {
  let {categoryId} = useParams()
  let[menu, setmenu] = useState([])
  let[loading, setloading] = useState(true)
  useEffect(()=>{
    let fetchMenuData = async()=>{
      let resp = await fetch(`https://mern-1-restaurant-backend.vercel.app/menu/menuByCategory/${categoryId}`)
      let data = await resp.json()
      if(resp.ok){
        console.log('MenuByCategory',data.data)
        setmenu(data.data)
      }
      setloading(false)
      if(!resp.ok){
        console.log(data.data)
      }
    }
    fetchMenuData()
  },[categoryId])
  if(loading) return(
    <>
      <Loading />
    </>
  )
  return (
    <section className='mx-auto w-3/4 p-4 mt-12 '>
      <p className='text-yellow-500 text-center capitalize text-4xl mt-4 mb-10 font-extrabold'>{menu[0]?.category?.name}</p>
      <div className='grid sm:grid-col-1 md:grid-cols-3 gap-4'>
        {menu.length>0?(<>
          {menu.map((men)=>(
            <Link  to={`/menu/${men._id}`}
                className=' border-2 p-4 rounded-3xl' key={men._id}>
                <img src={`https://mern-1-restaurant-backend.vercel.app/uploads/menu/${men.image}`} alt={men.name} className='w-full h-60 object-contain rounded-xl' />
                <p className='line-clamp-1 capitalize mt-3 text-center font-bold text-xl'>{men.name}</p>
            </Link>
          ))}
        </>)
        :(<div className='col-span-12 text-center'>
          <p className=' text-yellow-500 text-5xl font-extrabold capitalize'>No Menu food for this category yet</p>        
          </div>
        )}
      </div>

    </section>
  )
}

export default MenuByCategory