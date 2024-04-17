
import './App.css';
import Layout from './components/Layout/Layout.jsx';
import Products from './components/Products/Products';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Cart from './components/Cart/Cart';
import { RouterProvider, createBrowserRouter, createHashRouter } from "react-router-dom";
import NotFound from './components/NotFound/NotFound.jsx';
import AuthContextprovider from './components/Context/AuthContext.js';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './components/productDetails/productDetails.jsx';
import CartContextprovider from './components/Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './components/Payment/Payment';
import AllOrders from './components/AllOrders/AllOrders.jsx';
import CategoriesDetails from './components/CategoriesDetails/CategoriesDetails.jsx';
import ProductCategoryprovider from './components/Context/ProductCategory.js';
import BrandContextprovider from './components/Context/BrandContext.js';
import BrandDetails from './components/BrandDetails/BrandDetails.jsx';
import WishListContextprovider from './components/Context/WishListContext.js';
import WishList from './components/WishList/WishList.jsx';
import ForgetPassword from './components/ForgetPassword/ForgetPassword.jsx';
import SetCode from './components/SetCode/SetCode.jsx';
import ResetPassword from './components/ResetPassword/ResetPassword.jsx';
import { Offline } from 'react-detect-offline';
import Home from './components/Home/Home.jsx';


const myRotter = createHashRouter([
{path:'/' , element:<Layout/>, children:[
  {index:true , element: <Products/>},

{path:"/products", element:
  <Products/>
},
{path:"/register", element:<Register/>},
{path:"/login", element:<Login/>},

{ path:"/brands", element:
  <Brands/>
},
{path:"/categories", element:
  <Categories/>
},
{path:"/cart", element:<ProtectedRoute>
  <Cart/>
</ProtectedRoute>},

{path:"/productDetails/:id", element:
<ProductDetails/>
},

{path:"/payment", element:<ProtectedRoute>
<Payment/>
</ProtectedRoute>},
{path:"/allorders", element:<ProtectedRoute>
<AllOrders/>
</ProtectedRoute>},
{path:"/categoriesdetails", element:
<CategoriesDetails/>
},
{path:"/branddetails", element:
<BrandDetails/>
},
{path:"/wishlist", element:<ProtectedRoute>
<WishList/>
</ProtectedRoute>},
{path:"/forgetpassword", element:
<ForgetPassword/>
},
{path:"/setcode", element:
<SetCode/>
},
{path:"/resetpassword", element:
<ResetPassword/>
},
{path:"/home", element:
<Home/>
},

{path:"*" , element:<NotFound/>}
]}
])
function App() {
  const cacheClient= new QueryClient()
  return <>
  <QueryClientProvider client={cacheClient}>
  <WishListContextprovider>
  <ProductCategoryprovider>
  <BrandContextprovider>
  <AuthContextprovider>
  <CartContextprovider>

   <RouterProvider router={myRotter} />

  </CartContextprovider>
  </AuthContextprovider>
  </BrandContextprovider>
  </ProductCategoryprovider>
  </WishListContextprovider>
  </QueryClientProvider>

  <Toaster/>
<Offline>
  <div className='bg-dark  fixed-bottom text-white text-center fs-5 py-2'> your Internet connection has been corrupted <i class="fa-solid fa-triangle-exclamation fa-shake text-danger"></i></div>
</Offline>
  </>
}

export default App;
