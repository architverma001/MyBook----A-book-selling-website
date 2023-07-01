import React, { useContext, useEffect, useState } from 'react'
import './Book.css'
import { Navigate, useHistory ,useNavigate} from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext';
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from '../../../firebase';
function CArtBook(props) {
  const {currentUser}=useContext(AuthContext)
  const Id = currentUser.uid;
  const id = Id + 'cart'
  const [disable,setDisable] = useState(false);
  const navigate = useNavigate();
  const handleRemove = async() => {
    setDisable(true);
    const NameId = props.desc + props.teacherName;
    await Promise.all([
      deleteDoc(doc(db, id, NameId))
    ]);
    
    setDisable(false);
  }

  const handleclick=()=>{
    if(currentUser===null){
      alert("Please login to continue");
      navigate('/login');
      return;
    }
    navigate(`/details`, { state: { book: props } });
    
  }
  return (
    <div className='mt-1' >
    
    <div className=' ms-2 p-1 me-0  d-flex flex-column size bg-white' >
 <img src={props.img} className='rounded img-dynamics'onClick={handleclick}/>
 <div className='line'></div>
 <p className='text-design2 mt-1 fw-bold'>{props.name}</p>
 <p className='text-design mt-1'>{props.desc}</p> 
 
 <p className='text-design2 mt-1'>By {props.teacherName}</p>
 <div className='d-flex justify-content-start'>
  <p className='mrp '>₹ {props.mrp}</p>
  <p className='offer'>₹ {props.offer}</p>
  </div>
  <button className='btn btn-outline-primary' onClick={handleRemove} disabled={disable}>Remove from cart</button>
    </div>
    </div>
  )
}

export default CArtBook
