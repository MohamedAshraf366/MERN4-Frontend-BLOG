import React from 'react'
import Avater from '../assets/KarmElsham.webp'
import { useState } from 'react'
import toast from 'react-hot-toast'
import AOS from "aos"
import "aos/dist/aos.css"
import { useEffect } from 'react'
import Loading from '../components/Loading'

function AddCategory() {
    let[loading, setloading] = useState(true)
    useEffect(() => {
        AOS.init({
            duration:2000,
            mirror:true
        })
        setloading(false)
    }, [])
    let[form, setform] = useState({
        name:'', description:'', image:null
    })
    let[preview, setpreview] = useState(null)
    let[error, seterror] = useState(null)
    let handleChange = (e)=>{
        let{name, value, files} = e.target
        if(files){
            let file = files[0]
            setform({...form, image:file})
            //to check the uploaded photo
            setpreview(URL.createObjectURL(file))
        }
        else{
            setform({...form,[name]:value})
        }
    }
    let token = localStorage.getItem('token')
    
    let handleSubmit = async(e)=>{
        e.preventDefault()
        let formData = new FormData()
        formData.append('name', form.name)
        formData.append('description', form.description)
        if(form.image){formData.append('image', form.image)}
        try{
            seterror(null)
            let resp = await fetch('https://mern1-restaurant-backend.onrender.com/category/addCategory', 
                {
                method:'POST',
                headers:{
                        'Authorization': `Bearer ${token}`
                    },
                    body:formData,//send data inside form as JSON String
                }
            )
            let data = await resp.json()
            if(resp?.ok){
                toast.success(`${data.data.name} added succefully`)
                setform({name:'', description:'', image:null})
                setpreview(null)
            }
            
            else if(!resp?.ok){
                seterror(data.data)
                
            }
        }
        catch(error){
            console.log('AddCategory Page:', error.message)
        }
    }
    if(loading) return(
    <>
      <Loading />
    </>
    )
  return (
    <section className='flex flex-col items-center justify-center mt-10'> 
        <form className="grid grid-cols-12 rounded-xl shadow-lg w-3/4 p-10 gap-4"
        encType='multipart/form-data' onSubmit={handleSubmit}>
        <p className='text-4xl font-extrabold text-center col-span-12 md:col-span-12 mb-4'>Add Category</p>
            <div data-aos="zoom-in-right" className="col-span-12 md:col-span-4 flex flex-col items-center justify-center">
                <img src={preview || Avater} className='w-full h-60 object-contain rounded-xl mb-4'alt='Category' />
                <input accept="image/*"  onChange={handleChange} type='file' className='hidden' id='imageUpload' />
                <button type='button'  onClick={()=>document.getElementById('imageUpload').click()}
                 className="cursor-pointer text-white hover:bg-yellow-400 bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Upload Image</button>
            </div>
            <div data-aos="zoom-in-left" className="col-span-12 md:col-span-8">
                <div className="mb-5 w-full">
                    <label htmlFor="name" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">Category name</label>
                    <input type="text" name='name' value={form.name} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" autoFocus placeholder="Pizza" required />
                </div>
                <div className="mb-5 w-full">
                    <label htmlFor="description" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">Description of Category</label>
                    <textarea rows={8} type="text" name='description' value={form.description} onChange={handleChange} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Type of Pizza" required ></textarea>
                </div>
               <button type='submit' className="cursor-pointer text-white hover:bg-yellow-400 bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Save Category</button>
                {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
            </div>
            
        </form>
    </section>
  )
}

export default AddCategory