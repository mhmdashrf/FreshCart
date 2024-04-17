import axios from 'axios'
import { useQuery } from 'react-query'
import Loader from '../Loader/Loader'
import { Link } from 'react-router-dom'



function AllOrders() {
    async function getUserOrders() {
         const userId = localStorage.getItem('userId')
       return  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`,{
        cacheTime:1000,
       })
       
    }
    const{isLoading,data}=useQuery("getUserOrders",getUserOrders)

      console.log(data);
    if (isLoading) {
        return <Loader/>
    }
    return <>
  {data? <div className="container mt-4">
        <div className="row gy-3">
          
             {data.data.map((product,idx)=> {return<div key={idx} className="col-md-6">
            
             <div className=' bg-main-light h-100 py-4 rounded-4'> 
            <div className='ms-3'> <h5>Payment Method: <span className='fw-bold text-main'> {product.paymentMethodType ==="cash" ? <span>  cash <i class="fa-solid fa-money-bill-1-wave"></i></span>:<span>  card <i class="fa-regular fa-credit-card"></i></span>} </span></h5>
                <h5>Total Price:<span className='fw-bold text-main'> {product.totalOrderPrice} EGP    </span></h5>
                <h5>Order Number : <span className='fw-bold text-main'>{product.id}</span></h5></div>
            
                
             <div className="container">
                    <div className="row g-3">
                    {product.cartItems.map((item,secidx) => {
               return <div key={secidx} className="col-md-4">
                <div className="order bg-white h-100 p-2 mt-2 border-1 border-black border-bottom border-top rounded-2 shadow">
                
                   <img className='w-100 shadow-sm rounded-2' src={item.product.imageCover} alt={item.product.title} />
                   <h2 className='h4 mt-2'>{item.product.title.split(" ").slice(0,3).join(" ")}</h2>
                   <h5>Price:<span className='text-main fw-bold'> {item.price} EGP</span></h5>
                   <h5>Quantity:<span className='text-main fw-bold'> {item.count}</span></h5>
                </div>
                    </div>
            })}
                        
                    </div>
                </div> 
            
               </div>
            </div>
           
            })}
             
        </div>
    </div> :<div className='mx-auto w-75 d-flex justify-content-center align-items-center flex-column py-5 w-100 h-50' >
        <i className="fa-solid fa-car-side fa-bounce text-main fs-1 mt-5 bg-white  d-flex justify-content-center align-items-center rounded-circle "/>
        <h4 className='fs-2 text-center mt-4 fw-bold'>There are no Orders
</h4>
        <p className='mt-4 fs-5  text-center'>Browse Categories and Discover Our Best Offers</p>
        <Link  to={"/products"}>  <button  className='btn bg-main text-white mt-3 px-5'>Start Shopping</button></Link>
        </div>}
   
    
    
    
    </>
        
    
}

export default AllOrders
