import React from 'react'
import NotFound from '../NotFound/NotFound'

function ProtectedRoute({children}) {

    if (localStorage.getItem('tkn') == null) {
        return <NotFound/>
    
    }
    return <>
    
    {children}
    
    
    </>
        
    
}

export default ProtectedRoute
