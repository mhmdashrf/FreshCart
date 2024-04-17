import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

   function getCategorySlider() {
 
     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
   }
  const {data , isLoading} = useQuery('getCategorySlider', getCategorySlider)
console.log(data);
  var settings = {
     dots: true,
     autoplay: true,
     infinite: true,
     speed: 1000,
     slidesToShow: 2,
     slidesToScroll: 2,
     responsive:[{
       breakpoint: 768,
       settings:{
        slidesToShow: 3,
         slidesToScroll: 3,
      }
     }]
  };
  if (isLoading) {
     return <div className="loader bg-opacity-50 bg-info vh-100 d-flex justify-content-center align-items-center">
     <FallingLines
   color="#fff"
  width="100"
   visible={true}
   ariaLabel="falling-circles-loading"
   />
   </div>
  }
  return <>
    <Slider {...settings}>
 
    </Slider>
  </>
}
