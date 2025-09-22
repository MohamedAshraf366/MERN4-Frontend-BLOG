import React from 'react'
import { useCart } from '../context/CartContext'
import {Link} from 'react-router-dom'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useState } from 'react';
import { useEffect } from 'react';
import { CountUp } from 'countup.js';

function FoodListCart() {
    let{cart,deleteFromCart, EmptyCart, updateCart} = useCart()
    let token = localStorage.getItem('token')
    let userId = localStorage.getItem('userId')
    let totalPrice = cart.reduce((sum, item)=>sum+(item.menu.price*item.qty),0)
    useEffect(()=>{
        let demo = new CountUp('myTargetElement', totalPrice);
        if (!demo.error) {
        demo.start();
        } else {
        console.error(demo.error);
        }
    },[totalPrice])
  return (
    <section className='mt-12 mb-12'>
        <p className='text-4xl text-center font-bold text-amber-400'>Yor Order</p>
        <div className='w-3/4 mx-auto mt-10 grid sm:grid-cols-1 md:grid-cols-3 gap-4'>
            {cart.length === 0 ? (<>
                <div className='col-span-12 text-center'>
                    <p className=' text-4xl txet-center mx-auto'>No order yet, 
                    <Link className='text-amber-400 font-bold' to={'/allMenu'}> Order now</Link>
                </p>
                </div>
            </>):(<>
            {cart.map(item => (
            <div key={item.menu._id} className="rounded-xl max-w-sm bg-white border border-gray-200  shadow-lg">
                
                <img className='rounded-t-xl w-full h-60 object-fill' src={`https://mern1-restaurant-backend.onrender.com/uploads/menu/${item.menu.image}`} alt="" />
                
                <div className="p-5 flex flex-col items-center justify-center ">
                    <p className="mb-2 text-2xl font-bold tracking-tight text-gray-900 line-clamp-1">{item.menu.name}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-1">{item.menu.description}</p>
                    <p>{item.menu.price*item.qty} EGP</p>
                    <p className='mt-4 flex items-center'>
                    <FaMinus onClick={() => updateCart(item.menu._id, item.qty - 1, userId)}
                    className='text-red-500 text-3xl cursor-pointer hover:text-red-600' />
                    <button className=' cursor-pointer ms-4 me-4 p-3 bg-yellow-300 text-white rounded-xl hover:bg-yellow-400 focus:bg-yellow-500'>{item.qty}</button>
                    <FaPlus onClick={() => updateCart(item.menu._id, item.qty + 1, userId)} 
                    className='text-green-500 text-3xl cursor-pointer hover:text-green-600' />
                    </p>

                <button onClick={()=>deleteFromCart(item.menu._id, userId)}
                className='cursor-pointer mt-4 me-4 p-3 bg-red-500 text-white rounded-xl hover:bg-red-600'>
                Remove from your list</button>
                </div>
            </div>

                ))}
            </>
        )}
        </div>

        <div className='text-center mt-16 text-4xl'>
            <p>Your Total is: <span id='myTargetElement' className='font-bold'>{totalPrice}</span> EGP</p>
            <Link className='inline-block mt-4 text-white bg-amber-400 rounded-xl p-3 '>Checkout</Link>
        </div>
    </section>
  )
}

export default FoodListCart


