import React from 'react'
import './Cart.css'
import Cart from './Cart';
const BookCopy = (props) => {


  const handleclick = () => {
    const link = document.createElement('a');
    link.href = props.driveURL; //
     console.log(props.driveURL);
    link.target = '_blank'; // Open in a new tab or window

    // Trigger the click event
    link.dispatchEvent(new MouseEvent('click'));
  };
  return (
    <div className='mt-2 m-1' onClick={handleclick}>
    <div className=' ms-2 p-1 me-0 rounded d-flex flex-column size bg-white'>
 <img src={props.img} className='rounded img-dynamics'/>
 <p className='text-design mt-1'>{props.desc}</p>
 <div className='d-flex justify-content-start'>

  
  </div>
    </div>
    </div>
  )
}

export default BookCopy