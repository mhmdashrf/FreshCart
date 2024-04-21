import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";

export default function CategorySlider() {
const [categories,setCategories]=useState([])
  async function getCategorySlider() {
 
    const {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data)
   }
  // const {data } = useQuery('getCategorySlider', getCategorySlider)
useEffect(()=>{
  getCategorySlider();
},[])
  var settings = {
     dots: false,
     autoplay: true,
     infinite: true,
     speed: 1000,
     slidesToShow: 8,
     slidesToScroll: 2,
     responsive:[{
       breakpoint: 767,
       settings:{
        slidesToShow: 3,
         slidesToScroll: 3,
      }
     }]
  };
 
  return <>
  
     <div className="container my-5">
      <h2 className=" mb-3">Shop Pupular Categories</h2>
      <Slider {...settings}>
      {categories.map((cat,idx)=><div key={idx} className="item px-2 ">
        <img className="w-100 rounded-circle imgCategorySlider" src={cat.image} alt={cat.name} />
        <h6 className="text-center mt-2">{cat.name}</h6>
      </div>)}
   
 
    </Slider>
    </div>
  </>
}
