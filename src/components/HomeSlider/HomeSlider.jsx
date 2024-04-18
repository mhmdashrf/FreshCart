import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomeSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        arrows:false,
       
      };
     
    return <>
    <div className="container">
    <div className="row mb-5 gx-0">
          <div className="col-md-9">
          <Slider {...settings}>
   <div>
      <img style={{height: '400px'}} className='w-100' src= {require('../../images/slider-image-3.jpeg')} alt=''/>
      </div>
    <div>
      <img style={{height: '400px'}} className='w-100' src= {require('../../images/slider-2.jpeg')} alt=''/>
      </div>
      <div>
      <img style={{height: '400px'}} className='w-100' src= {require('../../images/slider-image-2.jpeg')} alt=''/>
      </div>
  
    </Slider>
          </div>
          <div className="col-md-3 homeSliderImg">
           <div>
            <img style={{height:"200px"}} className='w-100' src={require("../../images/grocery-banner-2.jpeg") }alt=""/>
           </div>
           <div>
            <img style={{height:"200px"}} className='w-100' src={require("../../images/grocery-banner.png") }alt=""/>
           </div>
          </div>
          </div>
      </div>    
 
  
  

    
    </>
        
    
}

 
