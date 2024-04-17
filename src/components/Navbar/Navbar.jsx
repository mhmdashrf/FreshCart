import React,{useContext, useEffect} from 'react'
import logo  from '../../images/freshcart-logo.svg'
import { Link, NavLink, useNavigate} from 'react-router-dom'
import { authContext } from '../Context/AuthContext'
import { cartContext } from '../Context/CartContext'
import { wishListContext } from '../Context/WishListContext'




function Navbar() {
 const{myToken,setToken} = useContext(authContext)
const {count}=useContext(wishListContext)
 const {numOfCartItems} =useContext(cartContext)
 const navigate = useNavigate()

 function logout() {
  setToken(null);
  localStorage.removeItem("tkn");
  localStorage.removeItem("userId");
  navigate('/login');
 }
useEffect(()=>{
  if (localStorage.getItem("tkn")!=null) {
 setToken(localStorage.getItem("tkn"));
    
  }
})
    return <>
<nav className="navbar navbar-expand-lg navbar-light bg-light ">
  <div className="container">
   <div className='d-flex align-items-center flex-wrap'>
   <NavLink to={"/product"} className="navbar-brand" ><img className='w-100' src={logo} alt="logo" /></NavLink>
  <div className='d-flex'>
  {myToken? <li className="nav-item position-relative list-unstyled me-3">
          <Link className="-link " to={'/wishlist'}><i className="fa-solid fa-heart text-main fs-6"></i></Link>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
             {count ? count:  "" }
            
  </span>
        </li>:""}
        {myToken? <li className="nav-item position-relative list-unstyled ">
          <Link className="-link " to={'/cart'}><i className="fa-solid fa-cart-shopping text-main fs-6"></i></Link>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
             {numOfCartItems ? numOfCartItems:  "" }
            
  </span>
        </li>:""}
  </div>
   </div>
  
    <button className="navbar-toggler fs-5" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"/>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav  mb-2 mb-lg-0 fw-semibold ms-3">
   
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to={'/products'}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link " aria-current="page" to={'/home'}>Products</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={'/categories'}>Categories</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to={'/brands'}>Brands</NavLink>
        </li>
        {myToken?
       <li className="nav-item">
          <NavLink className="nav-link" to={'/allorders'}>My orders</NavLink>
        </li> 
       
   :""}
      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center mt-2">
     <div className='d-flex align-items-center justify-content-center'>
     <ul className='d-flex list-unstyled cursor fs-6'>
        <li><NavLink target='_blank' to={"https://www.instagram.com/"}> <i className='fa-brands fa-instagram me-3'></i></NavLink></li> 
        <li><NavLink target='_blank' to={"https://www.facebook.com/"}><i className='fa-brands fa-facebook-f  me-3'></i></NavLink></li>
        <li><NavLink target='_blank' to={"https://www.twitter.com/"}><i className='fa-brands fa-twitter  me-3'></i></NavLink></li>
        <li><NavLink target='_blank' to={"https://www.linkedin.com/"}><i className='fa-brands fa-linkedin  me-3'></i></NavLink></li>

        </ul>
        {myToken?   <li className="nav-item">
          <Link onClick={logout} className="-link fs-6" >logout  <i class="fa-solid fa-right-from-bracket ms-1"></i></Link>
        </li>: <>
        <li className="nav-item">
          <Link className="-link" to={'/login'}>Login</Link>
        </li>
        <li className="nav-item">
          <Link className="-link" to={'/register'} >Register</Link>
        </li></>}
  
     </div>
       
        
      </ul>
    </div>
  </div>
</nav>

 
    </>
        
    
}

export default Navbar
