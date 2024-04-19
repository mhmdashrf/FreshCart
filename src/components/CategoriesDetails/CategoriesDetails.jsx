
import React, { useContext, useEffect } from 'react'
import { productContext } from '../Context/ProductCategory'
import { useQuery } from 'react-query'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { wishListContext } from '../Context/WishListContext'


function CategoriesDetails() {
    const{productCategory,setProductCategory} =  useContext(productContext)
    const {addToCart} = useContext(cartContext);
    const {addToWishList} = useContext(wishListContext);

    const{allfav,removeItem} = useContext(wishListContext);
    // console.log(length);
    useEffect(()=>{
if (localStorage.getItem('nameCategory')!= null) {
    setProductCategory(localStorage.getItem('nameCategory'))
}
    },[setProductCategory])

    async function addProduct (id) {
        const res =  await addToCart(id);
        console.log(res,"res res res");
        if (res) {
          toast.success(" Product added successfully to your cart "
            ,{
            duration:1500,
            position:'top-center',
            style:{
              height:70,
              marginTop:20,
             color:"#fff",
             backgroundColor:"#44c612",
             
            }
          })
        }else{
          if (localStorage.getItem("tkn")==null) {
            toast.error(`Please login to continue your purchase `,{
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
        const res = await addToWishList(id)
       
        if (res) {
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
          if (localStorage.getItem("tkn")==null) {
            toast.error(`Please login to continue your purchase `,{
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
       async function deleteItem(id) {
        const res = await removeItem(id)
        if (res) {
          toast.success(" Product Removed successfully to Your WishList. "
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
        }
       }
    async function getaLLProducts() {

        return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
       
       }
       const {data,isLoading} = useQuery('getaLLProducts', getaLLProducts)

      if (isLoading) {
        return <Loader/>
      }
  return <>
   <div className="mycontainer my-5">
    <div className="row products g-4">
      
    {data.data.data.filter((product)=> product.category.name === productCategory).map((product,idx)=>{
             const heartValue =  allfav?.find((pro)=>pro.id===product.id)
           
      return <div key={idx} className="col-md-2 p-2  position-relative">
              
                       {heartValue? <i id='wishIcon' onClick={()=> deleteItem(product.id)} className="fa-solid fa-heart d-flex justify-content-end position-absolute z-2 heartColor"></i>:<i id='wishIcon' onClick={()=> WishListFavorite(product.id)} className="fa-regular fa-heart d-flex justify-content-end position-absolute z-2 blackColor "></i>}
                    <Link className='product' to={`/productDetails/${product.id}`}>
                    <div className=" rounded-1 ">
                            <img className='w-100 rounded-3 shadow-sm' src={product.imageCover} alt=''></img>
                            <h3 className='text-main fs-4 fw-bolder mt-2'>{product.brand.name} {product.category.name}</h3>
                            <h3 className='h6 text-center fw-bold'>{product.title.split(" ").slice(0,2).join(" ")} </h3>
                            <div className="d-flex justify-content-between">
                               {product.priceAfterDiscount ? <p><span className='text-decoration-line-through text-danger fs-6'>{product.price }</span> - <span className='fw-400 fs-6'>{product.priceAfterDiscount}</span> EGP</p> :<p>{product.price} EGP</p>}
                               
                                <p>
                                    <i className='fa fa-star rating-color'></i>
                                    {product.ratingsAverage}
                                </p>
                             
                            </div>
                          
                        </div>
                    
                    </Link>
                    <button onClick={()=> addProduct(product.id)} className='btn bg-main text-white w-100 addBtn'>Add to Cart</button>
                    </div>})}
           
           
    </div>
   </div>
     </>
        
    
}

export default CategoriesDetails
