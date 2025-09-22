import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { IoFastFoodOutline } from "react-icons/io5";
import { FaBuilding, FaClipboardList,FaUser  } from "react-icons/fa";
import { CountUp } from 'countup.js';
import AOS from "aos"
import "aos/dist/aos.css"


function About() {
  let[Category, setcategory] = useState(0)
  let[menu, setmenu] = useState(0)
  
  useEffect(()=>{
    let fetchData = async()=>{
      let fetchCategory = await fetch('https://mern-1-restaurant-backend.vercel.app/category/count')
      let dataCategory = await fetchCategory.json()
      setcategory(dataCategory.data)

      let fetchMenu = await fetch('https://mern-1-restaurant-backend.vercel.app/menu/count')
      let dataMenu = await fetchMenu.json()
      setmenu(dataMenu.data)
    }
    fetchData()
  },[])
let stats = [
  {id:1, icon:<FaClipboardList />, countDocuments:Category, label:'Category'},
  {id:2, icon:<IoFastFoodOutline />, countDocuments:menu, label:'Menu Items'},
  {id:3, icon:<FaBuilding />, countDocuments:23, label:'Pranches'},
  {id:4, icon:<FaUser />, countDocuments:234, label:'Worker'},
]
useEffect(() => {
        AOS.init({
            duration:1000,
            mirror:true
        })
        
    }, [])
  useEffect(() => {
      stats.forEach((stat) => {
          const counter = new CountUp(`count-${stat.id}`, stat.countDocuments,{duration: 6});
          if (!counter.error) counter.start();
            else console.error(counter.error);
        
      });
    }, [stats]);
  return (
    <>
      <section className='w-3/4 mx-auto mt-12'>
        <p className='text-center font-bold text-4xl text-amber-400'>About Us</p>
        <p className='mt-4'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos maxime ab dignissimos laboriosam? Maiores adipisci explicabo perferendis nemo eum nulla totam, quas cupiditate veritatis odio cum dolor voluptatibus quam quaerat.
        Nam voluptates, tempora quae pariatur animi voluptas quam voluptate cumque facilis perspiciatis consequatur ipsam maiores, aut id. Ut facere quisquam modi consequatur suscipit, quod debitis? Aliquid reiciendis quas aspernatur autem.
        Voluptas tempore blanditiis nam labore, beatae dignissimos odit quia nulla minus tempora, molestias doloremque! Deserunt, non qui explicabo, amet ducimus reiciendis suscipit totam veniam, sunt quam doloribus corrupti saepe fugiat?
        Et ducimus omnis cumque, eius, eligendi accusamus, blanditiis commodi nemo distinctio corrupti repellendus obcaecati ex porro vel accusantium expedita perspiciatis provident amet voluptatem autem recusandae iusto suscipit? Temporibus, quisquam expedita?
        Qui voluptates ex id odio vero. Excepturi nesciunt mollitia voluptates et dolore illo. Quasi error id asperiores repellendus voluptatibus, cupiditate ipsum autem voluptate earum doloremque, in, mollitia voluptas eveniet possimus.
        </p>
        <div className='mt-8 '>
          <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1'>
           {stats.map((stat) => (
            <div key={stat.id}  data-aos="zoom-in-up"
                className="group flex flex-col items-center justify-center space-y-4
                        bg-white rounded-2xl p-6 m-3 shadow-2xl 
                        hover:text-white hover:bg-amber-400 transition duration-300"
            >
                <p className="text-amber-400 text-5xl group-hover:text-white transition duration-300">
                {stat.icon}
                </p>
                <p id={`count-${stat.id}`} className="mt-3 mb-3 font-black text-2xl">0</p>
                <p className="text-lg">{stat.label}</p>
            </div>
            ))}


        </div>
        </div>
      </section>
    </>
  )
}

export default About