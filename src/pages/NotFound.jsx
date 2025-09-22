import React from 'react'
import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <section className='text-center mt-32 text-8xl w-3/4  mx-auto'>
        This page is not found, move to  
        <Link className='text-amber-400 font-bold' to={'/'}> Home</Link> Page
    </section>
  )
}

export default NotFound