import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'
import {  Link, useNavigate } from 'react-router-dom'
import { productContext } from '../Context/ProductCategory'

function Categories() {
  const nav = useNavigate()
  const {productCategory,setProductCategory} =  useContext(productContext);

   function fillterProduct(name) {
    setProductCategory(name)
    nav("/categoriesdetails")
    localStorage.setItem('nameCategory',name);
  }
   async function grtAllCategories(){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
  const {isLoading,data} = useQuery("grtAllCategories", grtAllCategories)
  console.log(productCategory)
  if (isLoading) {
    return <Loader/>
}
console.log(data);
    return <>
    
    
   { <div className='container my-5'>
    <div className="row g-4">
    {data.data.data.map((ele,idx)=> <div className='col-md-3' key={idx}>
       <Link onClick={()=> fillterProduct(ele.name)} > <img style={{height:"300px"}} className='w-100 rounded-2' src={ele.image} alt={ele.name}/>
        <h3 className='text-center mt-2'>{ele.name}</h3></Link>
        </div>)}
    </div>
   </div>
     }
   
    </>
        
    
}

export default Categories
