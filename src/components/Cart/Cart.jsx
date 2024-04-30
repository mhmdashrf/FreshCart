import React, { useContext } from 'react'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader'


function Cart() {
   
 const { numOfCartItems,totalCartPrice, allProduct,updateCount,removeProduct,clearALLCart }  = useContext(cartContext);
 async function updateCountFromApi(id,newCount) {
 const res = await updateCount(id,newCount);
if(res){
    toast.success("Product Updated Successfully.",{
        position:"top-center",
        duration:1500
    })
}else{
    toast.error("Try Agin Later",{
        duration:1500,
        position:"top-right"
      })
}

 }
 async function removeProductFromApi(id) {
  const res = await removeProduct(id);
  console.log(res);
  if (res) {
    toast.success("Product Deleted Successfully To your Cart.",{
        duration:1500,
        position:'top-center',
        style:{
          height:70,
          marginTop:20,
          color:"#fff",
          backgroundColor:"#44c612",
         fontWeight:"500"
         
        }
    });
  }else{
    toast.error("Please try Later");
  }
 }
 if (!allProduct) {
    return <Loader/>
 }
    return <>
  <div className="container bg-main-light my-4 p-4 rounded-5">
    <h2 className='text-center fw-bold'>Cart Shop  :</h2>
       <div className="d-flex justify-content-between flex-wrap">
       <h5 className=' mt-3 fw-bold '>Total Cart Price : <span className='text-main'> {totalCartPrice} EGP</span></h5>
       <h5 className=' mt-3 fw-bold '>Total Cart Items : <span className='text-main' >{numOfCartItems}</span></h5>

       </div>
        
        {numOfCartItems>0?<button onClick={clearALLCart}  className='btn btn-outline-danger '>Clear</button>:""}

        {allProduct.map((product,idx)=>  <div key={idx} className="row border-1 border-bottom align-items-center py-3">
            <div className="col-md-1">
                <figure>
                    <img className='w-100' src={product.product.imageCover} alt={product.product.title} />
                </figure>
            </div>
            <div className="col-md-9">
                <article>
                    <h3 className='fs-5'>{product.product.title}</h3>
                    <h5 className='text-main'>Price: {product.price} EGP</h5>
                    <button onClick={()=>removeProductFromApi(product.product.id)} className='btn text-danger mb-2 p-0 fw-medium'><i className='fa fa-trash-can' ></i> Remove</button>
                </article>
            </div>
            <div className="col-md-2">
                <div className='d-flex justify-content-between align-items-center'>
                    <button onClick={()=> updateCountFromApi(product.product.id,product.count + 1)} className='btn btn-outline-success'> + </button>
                    <p className='fw-bold'>{product.count}</p>
                    <button disabled={product.count === 1} onClick={()=> updateCountFromApi(product.product.id,product.count - 1)} className='btn btn-outline-danger'> - </button>
                </div>
            </div>
        </div>)}
     {numOfCartItems>0? <Link className='d-flex justify-content-center mt-3' to={"/payment"}>  <button  className='btn bg-main text-white w-75'>Confirm Payment  <i className="fa-solid fa-cart-shopping ms-2"></i></button></Link>:""}

    </div>
    {numOfCartItems===0?<div><div className='mx-auto w-75 d-flex justify-content-center align-items-center flex-column py-5 w-100 h-50' >
        <i className="fa-solid fa-cart-shopping fa-bounce text-main fs-1  bg-white  d-flex justify-content-center align-items-center rounded-circle "/>
        <h4 className='fs-2 text-center mt-4 fw-bold'>Your Shopping Cart is Empty</h4>
        <p className='mt-4 fs-5  text-center'>Browse Categories and Discover Our Best Offers</p>
        <Link  to={"/products"}>  <button  className='btn bg-main text-white mt-3 px-5'>Start Shopping</button></Link>
        </div></div>:""} 
  
    
    </>
        
    
}

export default Cart
