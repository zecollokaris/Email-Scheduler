import React, {useState} from 'react'
import {Link} from 'react-router-dom';



function EmailHome(){


  return(
    <>
    <nav className="navbar"> 
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Cope</Link>
      </div>
    </nav>
    </>
  )
}

export default EmailHome;