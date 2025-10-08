import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL;

function SearchResult() {
    let location = useLocation()
    let [result, setresult] = useState([]) 
    useEffect(()=>{
      let urlParams = new URLSearchParams(location.search)
      let searchTerm = urlParams.get('searchTerm')
      if(!searchTerm) return

        let fetchURL = async()=>{
        try{
            let resp = await fetch(`${API_URL}/post/search`,{
            method:'POST',
            headers:{ 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchTerm })
            })
            let data= await resp.json()
            if(resp.ok){
                setresult(data.data)
            }
            else{
                setresult([])
            }
            
        }
        catch(error){
            console.log('The error in search: '. error.message)
            setresult([])
        }
        }
      fetchURL()
    },[location.search])
    
  return (
    <div className="max-w-md mx-auto mt-5">
      {result.length > 0 ? (
        <div className="space-y-2">
          {result.map(po => (
            <Link key={po?._id} to={`/post/${po?._id}`} className='flex flex-col gap-4 md:flex-row mt-3 mb-3 justify-between items-center shadow-sm hover:shadow-lg transition border-2 p-4 rounded-xl'>
                    <p className=''>{po?.title}</p>
                    <p>{new Date(po?.createdAt).toLocaleString()}</p>
                </Link>
          ))}
        </div>
      ) : (
        <p>No result found</p>
      )}
    </div>
  )
}

export default SearchResult