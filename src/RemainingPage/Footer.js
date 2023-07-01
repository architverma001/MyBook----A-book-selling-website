import React from 'react'
import './Footer.css'
import Call from '../img/call-1-300x300.png'
import TeleLogo from '../img/telelogo.png'
import MailLogo from '../img/download.jpeg'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <footer className='main-d'>
        <div className='height'></div>
   <div className='d-flex flex-row flex-wrap p-1 justify-content-between ms-4'>
 

    <div className='wdth me-4 marginadj'>
    <h3 className='margin-adjust color-adjust givebackground me-4'>Lecturesbasket</h3>
      <p>
    Lecturesbasket is the an Education e-commerce portal in India, dedicated to help students in identifying the best coaching material and online virtual classes across IndiLink for CA/CS and CMLink </p>
    </div>

    <div>
    
      <h3 className='margin-adjust color-adjust'>Contact us</h3>
      <div className='d-flex'>
     <img  src={Call} className='w-18'/>
     <div>
      <p> 9520257467</p>
      <p> 9998740148</p>
      <p>9313651038</p>
      </div>
      </div>

    
    </div>

    <div>
    <h3 className='margin-adjust color-adjust'>Reach us</h3>
    <div className='d-flex me-3'>
     <img  src={TeleLogo} className='w-18'/>
     <div>
     <Link to="https://t.me/lecturebasket" className='cnt-text nolink'>Contact on Telegram</Link>
      </div>
      </div>

      <div className='d-flex mt-4 me-3'>
     <img  src={MailLogo} className='w-18'/>
     <div>
     <p>lecturesbasket@gmail.com</p>
      </div>
      </div>
      </div>




    
      <div className='me-4'>
    <h3 className='margin-adjust color-adjust me-4 marginadj'>Lecturesbasket Info</h3>
    <div className='d-flex mb-1 p-2'>
    
     <div>
     <Link to='/privacypolicy' className='cnt-text nolink'>Privacy policy</Link>
      </div>
      </div>
     
      <div className='d-flex mb p-2 '>
     
     <div>
     <Link to='/refundpolicy' className='cnt-text nolink mb-3'>Refund & shipping policy</Link>
      </div>
      </div>


      <div className='d-flex mb-1 p-2'>

     <div>
     <Link to='/termsandcond' className='cnt-text nolink'>Terms and conditions</Link>
      </div>
      </div>


      <div className='d-flex mb p-2'>

<div>
<Link to='/about' className='cnt-text nolink'>About us</Link>
 </div>
 </div>
    
      </div>

   </div>
   <div className='footer-bottom'>
   © Copyright 2023. All Rights Reserved to the CYBERHUNK
   </div >
    </footer>
  )
}

export default Footer