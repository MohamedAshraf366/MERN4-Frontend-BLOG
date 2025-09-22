import React from 'react'
import logo from '../assets/KarmElsham.webp'
function Loading() {
  return (
    <div className='flex flex-col items-center justify-center mt-10'>
        <img src={logo} className='w-96 h-96 '/>
        <p className='mt-8 text-yellow-500 text-5xl font-extrabold'>Loading .........</p>
      </div>
  )
}

export default Loading