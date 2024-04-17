import React from 'react'
import { useState } from 'react';


import { createContext} from "react";

export const brandContext = createContext();
function BrandContextprovider({children}) {
   const [brandProduct,setBrandProduct] = useState(null);

   return<brandContext.Provider value={{
      brandProduct,
      setBrandProduct
   }}>
   
   {children}
   </brandContext.Provider>
}

export default BrandContextprovider
