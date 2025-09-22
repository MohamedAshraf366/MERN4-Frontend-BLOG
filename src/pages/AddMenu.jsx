import React from 'react'
import Avater from '../assets/KarmElsham.webp'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import AOS from "aos"
import "aos/dist/aos.css"
import Loading from '../components/Loading'

function AddMenu() {
    let[loading, setloading] = useState(true)
    useEffect(() => {
            AOS.init({
                duration:2000,
                mirror:true
            })
            setloading(false)
        }, [])
    let[form, setform] = useState({
        name:'', description:'', image:null, category:'',price:'',available:false
    })
    let[category, setCategory] = useState([])
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

    useEffect(()=>{
        let fetchCategory = async()=>{
            let resp = await fetch('https://mern-1-restaurant-backend.vercel.app/category/allCategory')
            let data = await resp.json()
            if(resp?.ok){
                setCategory(data.data)
                // console.log(data.data)
            }
            else if(!resp?.ok){
                seterror(data.data)
            }
        }
        fetchCategory()
    },[])
    
    let handleSubmit = async(e)=>{
        e.preventDefault()
        if(form.price <=0){
                seterror("price must not be zero")
                return
            }
        let formData = new FormData()
        formData.append('name', form.name)
        formData.append('description', form.description)
        formData.append('category', form.category)
        formData.append('price', form.price)
        formData.append('available', form.available)
        if(form.image){formData.append('image', form.image)}
        try{
            seterror(null)
            let resp = await fetch('https://mern-1-restaurant-backend.vercel.app/menu/addMenu', 
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
                setform({name:'', description:'', image:null, category:'',price:'',available:false})
                setpreview(null)
            }
            else if(!resp?.ok){
                seterror(data.data)
            }
            

        }
        catch(error){
            console.log('AddMenu Page:', error.message)
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
        <p className='text-4xl font-extrabold text-center col-span-12 md:col-span-12 mb-4'>Add Menu</p>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div data-aos="zoom-in-right" className="col-span-12 md:col-span-4 flex flex-col items-center justify-center">
                <img src={preview || Avater} className='w-full h-60 object-contain rounded-xl mb-4'alt='Category' />
                <input accept="image/*"  onChange={handleChange} type='file' className='hidden' id='imageUpload' />
                <button type='button'  onClick={()=>document.getElementById('imageUpload').click()}
                 className="cursor-pointer text-white hover:bg-yellow-400 bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Upload Image</button>
            </div>
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
            <div data-aos="zoom-in-left" className="col-span-12 md:col-span-8">
                <div className="mb-5 w-full">
                    <label htmlFor="name" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">Category name</label>
                    <input type="text" name='name' value={form.name} onChange={handleChange} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" autoFocus placeholder="Pizza" required />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="description" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">description of Category</label>
                    <input type="text" name='description' value={form.description} onChange={handleChange} id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Type of Pizza" required />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="price" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">price of Category</label>
                    <input min={1} type="number" step={0.01} name='price' value={form.price} onChange={handleChange} id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Type of Pizza" required />
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="available" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">Category Avaliability</label>
                    <select name='available' value={form.available} onChange={(e)=>setform({...form, available:e.target.value === 'true'})}
                     id="available" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Type of Pizza" required>
                        <option value={'true'}>Yes</option>
                        <option value={'false'}>No</option>
                    </select>
                </div>

                <div className="mb-5 w-full">
                    <label htmlFor="category" className="text-xl block mb-2 font-medium text-gray-900 dark:text-white">category</label>
                    <select name='category' value={form.category} onChange={handleChange} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5" placeholder="Type of Pizza" required>
                        <option  disabled value=''>Choose Your Category</option>
                        
                            {category.map((cat)=>(
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                    </select>                
                </div>

               <button type='submit' className="cursor-pointer text-white hover:bg-yellow-400 bg-yellow-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">Save Menu Item</button>
                {error && <p className="text-red-500 font-bold mt-4">{error}</p>}
            </div>
            
        </form>
    </section>
  )
}

export default AddMenu