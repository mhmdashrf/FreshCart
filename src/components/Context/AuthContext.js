import { createContext, useState } from "react"


export const authContext = createContext();

function AuthContextprovider({children}) {
   const[token , setToken] = useState(null);

  





    return <authContext.Provider value={{ myToken: token , setToken}}>
    {children}

    </authContext.Provider>
        
    
}

export default AuthContextprovider

