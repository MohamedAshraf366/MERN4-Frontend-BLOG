import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useEffect } from 'react'
import { useState } from 'react'
import {useParams} from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import Loading from '../components/Loading'
function SpecificMenuItem() {
  let[loading, setloading] = useState(true)
  let{user} = useContext(AuthContext)
  let{id} = useParams()
  let[menu, setmenu] = useState({})
  let{cart, addToCart} = useCart()
  let[qty, setqty] = useState(1)
  useEffect(() => {
  if (menu && cart.length > 0) {
    let existingItem = cart.find(i => i.menu._id === menu._id);
    if (existingItem) {
      setqty(existingItem.qty);
    }
  }
  
}, [menu, cart]);
  
  useEffect(()=>{
    let fetchData = async()=>{
      let resp = await fetch(`https://mern1-restaurant-backend.onrender.com/menu/${id}`)
      let data = await resp.json()
      if(resp.ok){
        setmenu(data.data)
        console.log('to show specific data for menu:',data.data)
        let catResp = await fetch(`https://mern1-restaurant-backend.onrender.com/category/${data.data.category}`);
        let catData = await catResp.json();
        if (catResp.ok) {
          setmenu(prev => ({ ...prev, categoryName: catData.data.name }));
        }
      }
      setloading(false)
       if(!resp.ok){
        console.log('The error in specific menu data: ', data.data)
      }
      
    }
    fetchData()
  },[id])

  if(loading) return(
    <>
      <Loading />
    </>
    )

  return (
    <section className='mx-auto w-3/4 p-4 mt-12'>
      <p className='text-center text-4xl font-bold text-amber-300 capitalize mb-8'>{menu.name}</p>
      <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-20 p-4'>
        <img src={`https://mern1-restaurant-backend.onrender.com/uploads/menu/${menu.image}`} 
        className='h-80 w-full rounded-xl ' />
        <div className=''>
          <p className='capitalize text-2xl'><span className='text-amber-400'>Decription : </span>{menu.description}</p>
          <p className='capitalize text-2xl'><span className='text-amber-400'>Price : </span>{menu.price}</p>
          <p className='capitalize text-2xl'><span className='text-amber-400'>Avaliable : </span>{menu.available ? "✅ Available" : "❌ Not Available"}</p>
          <p className='capitalize text-2xl'><span className='text-amber-400'>Category : </span>{menu.categoryName}</p>
          <p className='mt-4 flex items-center'>

            <FaMinus onClick={() => setqty(prev => prev > 1 ? prev - 1 : 1)}
            
            className='text-red-500 text-3xl cursor-pointer hover:text-red-600' />
            <button className=' cursor-pointer ms-4 me-4 p-3 bg-yellow-300 text-white rounded-xl hover:bg-yellow-400 focus:bg-yellow-500'>{qty}</button>
            <FaPlus onClick={()=>setqty(prev => prev+1)}
             className='text-green-500 text-3xl cursor-pointer hover:text-green-600' />
          </p>
        <button 
            onClick={() => {
              if (!user) {
                toast.error("You must login first to add items to your cart.");
                return;
              }
              addToCart(menu, qty);
            }}
            disabled={!menu._id} 
            className={`cursor-pointer mt-4 me-4 p-3 rounded-xl text-white 
              ${!user 
                ? "bg-gray-400 cursor-not-allowed" 
                : "bg-yellow-300 hover:bg-yellow-400"}`}
          >
            {user ? "Add to your food list" : "Login to add"}
          </button>

        </div>
      </div>

      
    </section>
  )
}

export default SpecificMenuItem