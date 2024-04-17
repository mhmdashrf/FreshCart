import React from 'react'

function Footer() {
    return <>
 <section className='bg-main-light d-flex py-5 mt-4 rounded-5'>
 <div className="container">
  <div className="    ">
    <h3>Get The FreshCart App</h3>
    <p>We Will Send You a Link, Open Your phone to download The app.</p>
   <div className='ms-3 d-flex '>
   <input className='inputFooter form-control w-75' type='text' placeholder='Email...'/>
    <button className=' buttonFooter btn bg-main px-4 py-1 text-white ms-3'>share App Link</button>
   </div>
   <div className='row mt-5 justify-content-between'>
    <div className='PaymentFooter col-md-5  d-flex align-items-center'>
  
    
 <h5  style={{fontWeight:"600"}} className='fs-5 me-3'>Payment Partenrs</h5>
     
       <div className='d-flex fs-2'>
       <i className="fa-brands fa-cc-amazon-pay  text-secondary"></i>
        <i className="fa-brands fa-cc-mastercard mx-3  text-danger"></i>
        <i className="fa-brands fa-cc-visa text-info me-3"></i>
        <i className="fa-brands fa-cc-paypal  text-primary"></i>
       
       </div>
    </div>
   
    <div className='appFooter col-md-6 my-4 d-flex align-items-center justify-content-center'>
      
<div>  <h5 style={{fontWeight:"600"}} className='fs-5 me-3'> Get deliveries with FreshCart</h5>
</div>
  <div className='divImgFooter d-flex '>
  <img className='img d-inline me-2' src={require("../../images/1664287128google-play-store-logo-png.webp")}  alt="" />
  <img className='img d-inline' src={require("../../images/1664287128google-play-store-logo-png.webp")}  alt="" />

  </div>

    </div>
   </div>
   </div>
  </div>
 </section>

    
    </>

    
}

export default Footer

