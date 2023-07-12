import React, { useContext } from 'react'
import './Book.css'
import { Navigate, useHistory ,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';

function Book(props) { 
  const {currentUser}=useContext(AuthContext)
  const navigate = useNavigate();
  const handleclick=()=>{
  
  
    if(currentUser===null){
      alert("Please login to continue");
      navigate('/login');
      return;
    }
    navigate(`/details`, { state: { book: props } });
    
  }
  return (
    <div className='mt-3 ms-3 MAIN' onClick={handleclick}>
    
    <div className=' ms-2 p-1 me-0  d-flex flex-column size bg-white'>
 <img src={props.img} className=' img-dynamics'/>
 <div className='line'></div>

 <p className='text-design2 mt-1 bold'> <strong>{props.name}</strong></p>
 <p className='text-design mt-1'>{props.desc}</p>
 <p className='text-design2 mt-1'>By <strong>{props.teacherName}</strong></p>
 <div className='d-flex justify-content-start'>
  <p className='mrp'>₹ {props.mrp}</p>
  <p className='offer'>₹ {props.offer}</p>
  
  </div>
    </div>
    </div>
  )
}

export default Book
