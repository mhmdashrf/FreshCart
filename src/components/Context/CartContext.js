import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { authContext } from './AuthContext';


export let cartContext = createContext();


export default function CartContextprovider({children}) {
 const{myToken}= useContext(authContext)
    const [numOfCartItems , setNumOfCartItems] = useState(0);
    const [totalCartPrice , setTotalCartPrice] = useState(0);
    const [allProduct , setAllProduct] = useState(null);
    const [cartId,setCartId] = useState(null);

  async function addToCart(id) {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            "productId": id
            },
             {
             headers:{token : localStorage.getItem('tkn')}
            }).then((res)=>{
              getUserCart();
            // console.log(res,"res good");
              return true;
            }).catch((err)=>{
              console.log(err);
              return false;
            })
            return res;
        }
       async function getUserCart() {
      
         await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
          headers:{token: localStorage.getItem("tkn")}
         }).then((res)=>{
  
          setCartId(res.data?.data._id);
          localStorage.setItem('userId',res.data.data.cartOwner);
          setAllProduct(res.data.data.products);
          setNumOfCartItems(res.data.numOfCartItems);
          setTotalCartPrice(res.data.data.totalCartPrice);
          // console.log("context res",res);
          return true;
         }).catch(()=>{

             return false;
         })
      }    
    async function updateCount(id,newCount) {
     const update =  await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        "count": newCount
      },{
        headers:{token:localStorage.getItem("tkn")}
      }).then((res)=>{
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumOfCartItems(res.data.numOfCartItems);
        setAllProduct(res.data.data.products);
         return true; 
      }).catch((err)=>{
         return false;
      })
      return update;
     }
   async function removeProduct(id) {
     const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
        headers:{token:localStorage.getItem("tkn")}
      }).then((res)=>{
        setAllProduct(res.data.data.products);
        setNumOfCartItems(res.data.numOfCartItems);
        setTotalCartPrice(res.data.data.totalCartPrice);
        return true;
      }).catch((err)=>{
        console.log(err,"err from remove fun");
        return false;
      })
      return res;
    }
    async function clearALLCart() {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
         headers:{token:localStorage.getItem("tkn")}
       }).then((res)=>{
        console.log(res);
         setAllProduct([]);
         setNumOfCartItems(0);
         setTotalCartPrice(0);
         return true;
       }).catch((err)=>{
         console.log(err,"err from remove fun");
         return false;
       })
       return res;
     }
  

    useEffect(()=>{
      if (localStorage.getItem("tkn")!=null) {
        getUserCart();
      }
    
    },[myToken])
   
    
   return <cartContext.Provider value={{
    
    addToCart,
    numOfCartItems,
    totalCartPrice,
    allProduct,
    updateCount,
   removeProduct ,
   clearALLCart,
   cartId,
   getUserCart,
   

    
    }}>
    
    {children}
   
   
   </cartContext.Provider>
  }