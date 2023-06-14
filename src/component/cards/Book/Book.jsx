import React from 'react'
import './Book.css'
import { Navigate, useHistory ,useNavigate} from 'react-router-dom';

function Book(props) {
  const navigate = useNavigate();
  const handleclick=()=>{
    console.log(props);
    navigate(`/details`, { state: { book: props } });
    
  }
  return (
    <div className='mt-1' onClick={handleclick}>
    <div className=' ms-2 p-1 me-0 rounded d-flex flex-column size bg-white'>
 <img src={props.img} className='rounded img-dynamics'/>
 <p className='text-design mt-1'>{props.desc}</p>
 <div className='d-flex justify-content-start'>
  <p className='mrp '>₹ {props.mrp} M.R.P</p>
  <p className='offer'>₹ {props.offer}</p>
  
  </div>
    </div>
    </div>
  )
}

export default Book
