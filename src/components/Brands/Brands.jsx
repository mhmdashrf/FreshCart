import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import { brandContext } from '../Context/BrandContext';
import {  useNavigate } from 'react-router-dom';

function Brands() {
 
 const {setBrandProduct} = useContext(brandContext)
 const nav = useNavigate()
    async function grtAllbrands(){
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
       }
     const {isLoading,data} = useQuery("grtAllbrands", grtAllbrands)
     function getBrandDetails(name){
      setBrandProduct(name)
      localStorage.setItem('nameBrands',name);
      nav("/branddetails")
     }
     if (isLoading) {
        return <Loader/>
     }
     console.log(data.data.data);
    return <>
   { <div className='container my-5'>
    <div className="row g-4">
    {data.data.data.map((ele,idx)=> <div className='col-md-3' key={idx}>
      <div role='button' onClick={()=>getBrandDetails(ele.name)} className='border rounded-2 shadow-sm '>  <img  className='w-100 rounded-2' src={ele.image} alt={ele.name}/>
        <h3 className='text-center mt-1'>{ele.name}</h3></div>
        </div>)}
    </div>
   </div> }
    
    
    </>
        
    
}

export default Brands
