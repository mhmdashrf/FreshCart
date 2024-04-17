
import { createContext, useState } from "react";
export const productContext = createContext()


function ProductCategoryprovider({children}) {
    const [productCategory,setProductCategory] = useState(null);
    return <productContext.Provider value={{
        productCategory,
        setProductCategory
    }}>
    
    {children}
    </productContext.Provider>
        
    
}

export default ProductCategoryprovider
