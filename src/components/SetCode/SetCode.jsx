import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import * as yup from'yup'
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'

function SetCode() {
    const [isLoading,setIsLoading]=useState(false)
const navigate=useNavigate()
   const myScheam = yup.object ({
    resetCode:yup.string().required("plese enter valid code")

   })
   
    const userCode = {
        resetCode:"",
    }
   async function setCode(values) {
        setIsLoading(true)
       await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,values)
        .then((res)=>{
            setIsLoading(false);
            toast.success('Successfulley Code ');
            setTimeout(()=>{
                navigate('/resetpassword')
            },1500)
        }).catch((err)=>{
            console.log(err);
            setIsLoading(false);
            toast.error('Invalid Code Please try Later');
        })
    }

    const myFormik = useFormik({
        initialValues:userCode,
        onSubmit:setCode,
        validationSchema:myScheam,
    })
    return <>
    <div className="container my-5">
    
    <form onSubmit={myFormik.handleSubmit}>
    <div className='mx-auto w-75'>
    <h1>Reset Code :</h1>
    <label className='fs-4 mt-4' htmlFor='resetCode'>
         Enter Code :
         </label>
         
         <input onChange={myFormik.handleChange} onBlur={myFormik.handleBlur} value={myFormik.values.resetCode}  id='resetCode' className='form-control mt-3' type="text" />
         {myFormik.errors.resetCode && myFormik.touched.resetCode ? <div className='alert alert-danger'>{myFormik.errors.resetCode}</div>:''}

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

export default SetCode
