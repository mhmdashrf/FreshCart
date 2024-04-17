import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useQuery } from 'react-query'
import { Navigate, useParams } from 'react-router-dom'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import Loader from '../Loader/Loader'
import Slider from 'react-slick'
import { wishListContext } from '../Context/WishListContext'

function ProductDetails() {
const [isHeart,setIsHeart] = useState(false);
 const {addToCart} = useContext(cartContext);
 const {addToWishList,removeItem} = useContext(wishListContext);

 
    const{id} = useParams()

   async function addProductToCart(id) {
     const res = await addToCart(id)
     console.log(res);
     if (res ) {
    
      toast.success(" Product added successfully to Your cart "
      ,{
      duration:1700,
      position:'top-center',
      style:{
        height:70,
        marginTop:20,
        color:"#fff",
        backgroundColor:"#44c612",
       fontWeight:"550",
       fontSize:"18px"
      }
    })
     }else{
   
      if (localStorage.getItem("tkn")==null) {
        toast.error("Please login to continue your purchase ",{
          duration:2500,
          position:"top-center",
       style:{
     fontWeight:"bold",
        marginTop:20,
        fontSize:"17px"
       }
        })
      }else{
        toast.error("Try Agin Later",{
          duration:1500,
          position:"top-center"
        })
      }
     }
    }
    async function WishListFavorite(id) {
      const res = await addToWishList(id);
      if (res) {
        setIsHeart(true);
        toast.success(" Product added successfully to Your WishList. "
        ,{
         
        duration:1700,
        position:'top-center',
        style:{
          height:70,
          marginTop:20,
          color:"#fff",
          backgroundColor:"#44c612",
         fontWeight:"500"
         
        }
      })
      }else{
        setIsHeart(false);
        if (localStorage.getItem("tkn")==null) {
          toast.error("Please login to continue your purchase ",{
            duration:2500,
            position:"top-center",
         style:{
       fontWeight:"bold",
          marginTop:20,
          fontSize:"17px"
         }
          })
        }else{
          toast.error("Try Agin Later",{
            duration:1500,
            position:"top-center"
          })
        }
      }
     }
     async function deletIteamFromWishList(id) {
      const res = await removeItem(id);
      if (res) {
        setIsHeart(false);
        toast.success(" Product Removed successfully to Your WishList "
        ,{
        duration:1500,
        position:'top-center',
        style:{
          height:70,
          marginTop:20,
          color:"#fff",
          backgroundColor:"#44c612",
         fontWeight:"500"
         
        }
      })
      }
       }
    function getproductDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
   const{ data ,isLoading, isError}= useQuery(`getproductDetails-${id}`,getproductDetails)

 if (isLoading) {
    return <Loader/>
  }
  if (isError) {
   return <Navigate to='products'/>
  }
  const products = data.data.data
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
    <div className="container my-5">
        <div className="row align-items-center">
            <div className="col-md-4 ">
     
    
    <figure>
     
     <Slider {...settings}>
     {products.images.map((ele,idx)=><img key={idx} className='w-100' src={ele} alt=''/>)}
   </Slider>
     </figure>

            </div>
            <div className="col-md-8 mt-3 ">
          {isHeart ? <i onClick={()=>deletIteamFromWishList(products.id)} className="fa-solid fa-heart d-flex justify-content-end my-4 fs-2 text-danger cursor-pointer heartDetails"></i>:<i onClick={()=> WishListFavorite(products.id)} className="fa-regular fa-heart d-flex justify-content-end  fs-2 my-4 cursor-pointer"></i>} 
              <article>
              <h1 className='fw-bold'>{products.title}</h1>
               <p>{products.description}</p>
               <div className='d-flex  justify-content-between align-items-center'>
                                  <h5>Price: <span className='text-main fw-bold'>{products.price}</span></h5>
                                  <h5>  <i className='fa fa-star rating-color'></i> <span>{products.ratingsAverage}</span></h5>
                                  
                                 </div>
                             <div className='d-flex '>
              <button onClick={()=> addProductToCart(data.data.data.id)} className='btn bg-main w-75 text-white mt-2 ms-3'> Add to Cart + </button>
               
                             </div>
                                 </article>
                                 
            </div>
        </div>
    </div>
   
    
    </>
}

export default ProductDetails
