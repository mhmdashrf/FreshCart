import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from'yup'
import { cartContext } from '../Context/CartContext'
import toast from 'react-hot-toast'
import { routeAPI } from '../../api'

const mySchema = yup.object({
    
    city:yup.string().required('plaese write a valid City.'),
    phone:yup.string().required('You must write Egyption Number').matches(/^01[0125][0-9]{8}$/,'You must write Egyption Number'),
   
   
 
  })
function Payment() {
const [paymentMethod, setPaymentMethod] = useState("1")
 const {cartId,clearALLCart} = useContext(cartContext)
    const payData={
      
        details: "",
        phone: "",
        city: ""
    }
  
    function onSubmit(values) {
        const headers =  {token:localStorage.getItem("tkn")}
       
        const data = values;
        console.log({paymentMethod})
        console.log(values);
           

     let api 
     if(paymentMethod === '1'){
        api = routeAPI(`orders/checkout-session/${cartId}`,'post',data,headers, {url:'http://localhost:3000'})
     }else {
        api = routeAPI(`orders/${cartId}`,'post',data, headers);
     }
      
       
        api.then((res)=>{
if (res.data.status === "success") {
    if(paymentMethod === '1'){
        window.open(res.data.session.url,"_self");
    }else {
        toast.success("Payment Completd Successfully")
        clearALLCart()
    }
   
}
        }).catch((err)=>{
           if (err) {

           }
        })
    }
    const handleRadioChange = e => {
       setPaymentMethod(e.target.value)
        // e.target.checked = false
    }
    const myFormik=useFormik({
        initialValues:payData,
        onSubmit, 
        validationSchema:mySchema,
    })
    return <>
 
        <div className="mx-auto w-75 p-5 bg-main-light mt-5 rounded-4">
            <h2 className='mb-4 '>Shipping Address :</h2>
            <h2 className='text-center'>Payment Method :  </h2>
         <form onSubmit={myFormik.handleSubmit}>
       <div className='d-flex justify-content-around flex-wrap align-items-center mt-3'> 
         <div className="form-check fs-5 ">
          
  <input className="form-check-input" type="radio" onChange={handleRadioChange}  name="paymentMethod" id="flexRadioDefault1" value={"1"} checked={paymentMethod ==="1"}/>
  <label className="form-check-label " for="flexRadioDefault1">
   Online Payment  <i className="fa-solid fa-credit-card text-main"></i>
  </label>
</div>
<div className="form-check fs-5 ">
  <input className="form-check-input" type="radio" onChange={handleRadioChange} name="paymentMethod" id="flexRadioDefault2" value={"2"} checked={paymentMethod ==="2"}/>
  <label className="form-check-label" for="flexRadioDefault2">
    Cash Payment <i className="fa-solid fa-money-bill-wave text-main"></i>
  </label>
</div></div>
         <label  className='mb-2 fs-5' htmlFor="city">City :</label>
          <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.city} id='city' type="text " placeholder='City...' className='form-control mb-2'/>
          {myFormik.errors.city && myFormik.touched.city ? <div className='alert alert-danger'>{myFormik.errors.city}</div>:''}
          <label className='mb-2 fs-5' htmlFor="phone ">Phone :</label>
          <input  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' type="text " placeholder='phone...' className='form-control mb-2'/>
          {myFormik.errors.phone && myFormik.touched.phone ? <div className='alert alert-danger'>{myFormik.errors.phone}</div>:''}
          <label  className='mb-2 fs-5'   htmlFor="details">Details :</label>
          <textarea  onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.details} id='details' type="text " placeholder='details...' className='form-control pb-5'/>
          <button type='submit'  className='btn bg-main text-white mt-4 w-50 mx-auto d-block'> Confirm Payment</button>
         </form>

        </div>

   
    </>
        
    
}

export default Payment
