import React from 'react'
import { FallingLines } from 'react-loader-spinner'

function Loader() {
    return<>
<div className="loader bg-opacity-50 bg-whithe vh-100 d-flex justify-content-center align-items-center">
    <FallingLines
  color="#19f319"
  width="100"
  visible={true}
  ariaLabel="falling-circles-loading"
  />
  </div>


    </>

        
    
}

export default Loader
