import axios from "axios"
import { createContext, useEffect, useState } from "react"


 export const wishListContext =createContext()
const url ='https://ecommerce.routemisr.com/api/v1/wishlist';
function WishListContextprovider({children}) {
    const [allfav,setAllFav] = useState(null);
    const [count,setCount] = useState(0);
    async function addToWishList(id) {
   const res = await axios.post(url,{
        "productId":id, 
    },{
        headers:{token:localStorage.getItem('tkn')}
    }).then((res)=>{
     
    console.log(res,"res WishList");
    return true;
    }).catch((err)=>{
  console.log(err,"errrrorr WishList");
  return false;
    })
    return res;
    }
   async function getAllWishList() {
     const res = await axios.get(url,{
            headers:{token:localStorage.getItem('tkn')}
        }).then((res)=>{
         setAllFav(res.data.data);
         setCount(res.data.count);
        }).catch((err)=>{
            console.log(err,"some err");
        })
        return res;
    }
    async function removeItem(id) {
      const res = await axios.delete(`${url}/${id}`,{
            headers:{token:localStorage.getItem('tkn')}
        }).then((res)=>{
            setAllFav(allfav.filter((x)=>x.id !== id));
        
            return true
        }).catch((err)=>{
       console.log(err);
       return false
        })
        return res;
    }
    useEffect(()=>{
        if (localStorage.getItem("tkn")!=null) {
            getAllWishList();
        }
      
    })

    return <wishListContext.Provider value={{
        addToWishList,
        allfav,
        setAllFav,
        count,
        removeItem,

    }}>
    {children}
    </wishListContext.Provider>
        
    
}

export default WishListContextprovider
