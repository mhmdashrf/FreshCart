import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from'yup'
import { ColorRing } from 'react-loader-spinner'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

function ResetPassword() {
    const [isLoading,setIsLoading]=useState(false)
const navigate=useNavigate()
    const mySchema = yup.object ({
        email:yup.string().email(),
        newPassword:yup.string().required().min(6).max(20),
      })
      const userEmail = {
          email:"",
          newPassword:""
      }
      function ressetPassword(values) {
        setIsLoading(true)
        axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,values)
        .then((res)=>{
            setIsLoading(false);
            toast.success('The Password has been Changed Successfully');
            setTimeout(()=>{
                navigate('/login')
            },1500)
        }).catch((err)=>{
            setIsLoading(false);
            toast.error('This password already exists');
        })
      }

    const myFormik = useFormik({
        initialValues:userEmail,
        onSubmit:ressetPassword,
        validationSchema:mySchema
    })
    return <>
      <div className="container my-5">
    
    <form onSubmit={myFormik.handleSubmit}>
    <div className='mx-auto w-75'>
    <h1>Reset Password :</h1>
    <label className='fs-4 mt-4' htmlFor='email'>
         Enter Your Email :
         </label>
         <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.email}  id='email' className='form-control mt-3' type="text" />
         {myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger'>{myFormik.errors.email}</div>:''}
         <label className='fs-4 mt-4' htmlFor='newPassword'>
         New Password :
         </label>
         <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.newPassword}  id='newPassword' className='form-control mt-3' type="text" />
         {myFormik.errors.newPassword && myFormik.touched.newPassword ? <div className='alert alert-danger'>{myFormik.errors.newPassword}</div>:''}
         <button type='submit' className='btn bg-main  text-white px-3 py-2 mt-4'>
             {isLoading?  <ColorRing
   visible={true}
   height="40"
   width="40"
   ariaLabel="color-ring-loading"
   wrapperStyle={{}}
   wrapperClass="color-ring-wrapper"
   colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
   /> :"Submit"}
          
 
             
             
             
            </button>
    </div>
 
     </form>
    </div>
    
    </>
        
    
}

export default ResetPassword
