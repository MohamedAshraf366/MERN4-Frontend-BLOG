import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import carousel1 from '../assets/carousel1.jpg'
import carousel2 from '../assets/carousel2.jpg'
import carousel3 from '../assets/carousel3.jpg'
import carousel4 from '../assets/carousel4.jpg'
import carousel5 from '../assets/carousel5.jpg'
import carousel6 from '../assets/carousel6.jpg'
import carousel7 from '../assets/carousel7.jpg'
import carousel8 from '../assets/carousel8.jpg'
import { NextArrow, PrevArrow } from './Arrow'
function Carousel() {
    let carouselImages = [
        {id:1, image:carousel1 , alt:'Carousel1'},
        {id:2, image:carousel2 , alt:'Carousel2'},
        {id:3, image:carousel3 , alt:'Carousel3'},
        {id:4, image:carousel4 , alt:'Carousel4'},
        {id:5, image:carousel5 , alt:'Carousel5'},
        {id:6, image:carousel6 , alt:'Carousel6'},
        {id:7, image:carousel7 , alt:'Carousel7'},
        {id:8, image:carousel8 , alt:'Carousel8'},
    ]
    const settings = {
   dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />
};
  
return (
<section className=''>
     <div className="slider-container">
      <Slider {...settings}>
            {/* <div className=""> */}
                {carouselImages.map((car, index)=>(    
                    <div key={car.id}  className='relative h-[80vh]  md:h-[80vh]'>
                        <img src={car.image} className="h-full w-full object-center" alt={car.alt} />
                    </div>
                ))}
            {/* </div>   */}
      </Slider>
    </div>
</section>
)
}

export default Carousel