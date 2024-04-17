import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import * as yup from'yup'
import { ColorRing } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const mySchema = yup.object ({
  email:yup.string().email(),
})

const userEmail = {
    email:"",
}


function ForgetPassword() {
 
   async function forgetPassword(values) {
    setIsLoading(true);
        await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,values)
        .then((res)=>{
            setIsLoading(false);
            toast.success('Code Send Successfulley');
            setTimeout(()=>{
                navigate('/setcode')
            },1500)

        }).catch((err)=>{
            setIsLoading(false);
            toast.error('Invalid Email Please try Later');
        })
    }
   const navigate= useNavigate()
    
    const [isLoading,setIsLoading]=useState(false)

    const myFormik = useFormik({
        initialValues:userEmail,
        onSubmit:forgetPassword,
        validationSchema:mySchema
    })
    return <>
   <div className="container my-5">
    
   <form onSubmit={myFormik.handleSubmit}>
   <div className='mx-auto w-75'>
   <h1>Forget Password :</h1>
   <label className='fs-4 mt-4' htmlFor='email'>
        Enter Your Email :
        </label>
        <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.email}  id='email' className='form-control mt-3' type="text" />
        {myFormik.errors.email && myFormik.touched.email ? <div className='alert alert-danger'>{myFormik.errors.email}</div>:''}
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

export default ForgetPassword
