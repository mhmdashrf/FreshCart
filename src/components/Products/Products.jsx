import axios from 'axios'
import { useQuery } from 'react-query';
import HomeSlider from '../HomeSlider/HomeSlider';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { cartContext } from '../Context/CartContext';
import toast from 'react-hot-toast';
import Loader from '../Loader/Loader';
import { wishListContext } from '../Context/WishListContext';
import CategorySlider from '../CategorySlider/CategorySlider';

function Products() {
 const {addToCart} = useContext(cartContext);
 const {addToWishList} = useContext(wishListContext)
 const{allfav,removeItem} = useContext(wishListContext);
const [search,setSearch] =useState("")
console.log(allfav);
 async function addProduct (id) {
  const res =  await addToCart(id);
  if (res) {
    toast.success(" Product added successfully to Your cart "
      ,{
      duration:1700,
      position:'top-center',
      style:{
        height:70,
        marginTop:20,
        color:"#fff",
        backgroundColor:"#44c612",
       fontWeight:"500",
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
  
    async function getALLProducts() {
        
     return  axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    
    }
    const {data,isLoading} = useQuery('getALLProducts', getALLProducts,{
      // cacheTime:1000,
      

    });


if (isLoading) {
  return <Loader/>
}
console.log(data.data.data);
    return <> 
              
      <div className="mycontainer mt-4">
            <HomeSlider/> 
            <CategorySlider/>
             </div>
           <div className="mycontainer">
        
           <input onChange={(e)=> setSearch(e.target.value)} className='form-control border-1 border-dark-subtle' type='text' placeholder='search .....' />
           <div className="row products  g-3 my-5 ">
          
            {data.data.data.filter((item)=>{
           
                          return search.toLocaleLowerCase() === "" ? item : item.category.name.toLocaleLowerCase().includes(search)
                          
            }).map((product,idx) =>  
            {const heartValue =  allfav?.find((pro)=>pro.id===product.id)
              return <div key={idx} className="col-md-2 p-2 position-relative ">
        {heartValue? <i id='wishIcon' onClick={()=> deleteItem(product.id)} className="fa-solid fa-heart d-flex justify-content-end position-absolute z-2 heartColor"></i>:<div className='bg-danger'><i id='wishIcon' onClick={()=> WishListFavorite(product.id)} className="fa-regular fa-heart d-flex justify-content-end position-absolute z-2 blackColor "></i></div>}
          
                <Link className='product' to={`/productDetails/${product.id}`}>
                <div className=" rounded-1 ">
                        <img className='w-100 rounded-3 shadow-sm ' src={product.imageCover} alt=''></img>
                       
                        <h3 className='text-main fs-4 fw-bolder mt-2'>{product.brand.name}  {product.category.name}</h3>
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
          
        {/* { data.data.data.filter((proo)=>proo.id === ) } */}
  


  
        </>
    
}

export default Products
