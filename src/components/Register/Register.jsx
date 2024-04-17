import React, { useState } from 'react'
import {useFormik} from 'formik'
import axios from 'axios';
import * as yup from'yup'
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';



const mySchema = yup.object({
  name:yup.string().required('Name must be req.').min(3,'at least 3 characters ').max(15,"at max 15 characters"),
  phone:yup.string().required('You must write Egyption Number').matches(/^01[0125][0-9]{8}$/,'You must write Egyption Number'),
  email:yup.string().email(),
  password:yup.string().required().min(6).max(20),
  rePassword:yup.string().oneOf([yup.ref('password')]),
})

function Register() {

  const userData={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:""
  }
  const navigate= useNavigate()
  const [isSuccess,setIsSuccess] = useState(false);
  const [isloading,setIsloading] = useState(false);
  const [errMessage,seterrMessage] = useState(undefined);


 function onSubmit(values) {
  setIsloading(true)
    axios.post(` https://ecommerce.routemisr.com/api/v1/auth/signup ` , values)
    .then((x)=>{
   
      setIsSuccess(true);
      setIsloading(false);

      setTimeout(() => {
        setIsSuccess(false)
        navigate('/login')
      }, 2000);
     
    })
    .catch((error)=>{
      seterrMessage(error.response.data.message);
      setIsloading(false)
      setTimeout(() => {
        seterrMessage(undefined)
      }, 3000);
    
    })
    
  }
  
const myFormik = useFormik({
  initialValues:userData,
  onSubmit : onSubmit,
  validationSchema:mySchema,
 })



    return <>
    
    { <div className="register w-75 mx-auto p-5">
    {errMessage ? <div className="alert alert-danger text-center fs-6 ">" {errMessage}"</div> :""}
     {isSuccess ? <div className="alert alert-success text-center fs-6 ">" Congratulations your account has been created "</div> :""}
        <h2 className="fs-1">Register Now:</h2>

        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name" className='mt-3'>Name:</label>
          <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} id='name' className='form-control mt-1' type="text" placeholder='Name'/>
          {myFormik.errors.name && myFormik.touched.name ? <div className='alert alert-danger'>{myFormik.errors.name}</div>:''}
          <label htmlFor="email" className='mt-3'>Email:</label>
          <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.email} id='email' className='form-control mt-1' type="text" placeholder='Email'/>
          {myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger'>{myFormik.errors.email}</div>:''}
          <label htmlFor="phone" className='mt-3'>Phone:</label>
          <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.phone} id='phone' className='form-control mt-1' type="text " placeholder='Phone'/>
          {myFormik.errors.phone && myFormik.touched.phone ? <div className='alert alert-danger'>{myFormik.errors.phone}</div>:''}
          <label htmlFor="password" className='mt-3'>Password:</label>
          <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.password} id='password' className='form-control mt-1' type="password"  placeholder='password'/>
          {myFormik.errors.password && myFormik.touched.password ? <div className='alert alert-danger'>{myFormik.errors.password}</div>:''}
          <label htmlFor="rePassword" className='mt-3'>Repassword:</label>
          <input onBlur={myFormik.handleBlur}  onChange={myFormik.handleChange} value={myFormik.values.rePassword} id='rePassword' className='form-control mt-1' type="password" placeholder='Repassword'/>
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className='alert alert-danger'>{myFormik.errors.rePassword}</div>:''}
          <Link className='d-block link-primary forget-password mt-2 fw-bold ' to={"/login"}>Already Have an Account?</Link>

           <button type='submit' className='btn bg-main  text-white px-3 py-2 mt-4'>

            {isloading ?  <ColorRing
  visible={true}
  height="40"
  width="40"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  /> :"Register"}
         

            
            
            
           </button> 
        </form>
    </div>
     }



     
    </>
        
    // const myScheam =yup.object({
  
//   name:yup.string().required('Name must be req.').min(3,'at least 3 characters ').max(15,"at max 15 characters"),
//   email:yup.string().email(),
//   phone:yup.string().required('You must write Egyption Number').matches(/^01[0125][0-9]{8}$/,'You must write Egyption Number'),
//   password:yup.string().required().min(6).max(20),
//   rePassword:yup.string().required().min(6).max(20),

// })

// const userData ={
//      name:"",
//       email:"",
//       phone:"",
//       password:"",
//       rePassword:"",
// }
// function onSubmit(values) {
//   console.log(values);
// }
// const myFormik = useFormik({
//   initialValues:userData,
//   onSubmit:onSubmit,
//   validationSchema:myScheam
// })
}

export default Register
