import React, { useContext } from 'react'
import { wishListContext } from '../Context/WishListContext'
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';

function WishList() {
    const{allfav,count,removeItem} = useContext(wishListContext);
   const {addToCart} = useContext(cartContext);
    console.log(allfav);
    console.log(count);
    if (allfav == null) {
       return <Loader/>
    }
    async function addProduct (id) {
        const res =  await addToCart(id);
        console.log(res,"res res res");
        if (res) {
          toast.success(" Product added successfully to Your Cart "
            ,{
            duration:1500,
            position:'top-center',
            style:{
              height:70,
              marginTop:20,
              color:"#fff",
              backgroundColor:"#44c662",
             fontWeight:"500"
             
            }
          })
        }else{
          toast.error("Try Agin Later",{
            duration:1500,
            position:"top-right"
          })
        }
       }
      async function deletIteamFromWishList(id) {
      const res = await removeItem(id);
      if (res) {
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
    return <>
    <div className="container bg-main-light my-4 p-4 rounded-5">
    <h2 className='text-center fw-bold'>Wishlist Shop  :</h2>
       <div className="d-flex justify-content-between flex-wrap">
      
       <h5 className=' mt-3 fw-bold '>Total WishList Items : <span className='text-main'>{count}</span></h5>  

       </div>
        
       

        {allfav.map((product,idx)=>  <div key={idx} className="row border-1 border-bottom align-items-center py-3">
            <div className="col-md-1">
                <figure>
                    <img className='w-100' src={product.imageCover} alt={product.title} />
                </figure>
            </div>
            <div className="col-md-9">
                <article>
                    <h3 className='fs-5'>{product.title}</h3>
                    <h5 className='text-main'>Price: {product.price} EGP</h5>
                    <button onClick={()=> deletIteamFromWishList(product.id)}  className='btn text-danger mb-2 p-0 fw-medium'><i className='fa fa-trash-can' ></i> Remove </button>
                </article>
            </div>
            <div className="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                <button onClick={()=> addProduct(product.id)} className='btn bg-main text-white w-100 addBtn'>Add to Cart <strong>+</strong></button>
                </div>
            </div>
        </div>)}

            </div>
   
          {count === 0 ?<div className='mx-auto w-75 d-flex justify-content-center align-items-center flex-column py-5 w-100 h-50' >
        <i className="fa-solid fa-heart-crack fa-beat-fade text-main fs-1  bg-white  d-flex justify-content-center align-items-center rounded-circle "/>
        <h4 className='fs-2 text-center mt-4 fw-bold'>Your Shopping WishList is Empty</h4>
        <p className='mt-4 fs-5  text-center'>Browse Categories and Discover Our Best Offers</p>
        <Link to={"/products"}>  <button  className='btn bg-main text-white mt-3 px-5'>Start Shopping</button></Link>
        </div>:"" }
    </>
        
    
}

export default WishList
