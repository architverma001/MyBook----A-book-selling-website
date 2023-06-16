import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Buy.css'
import Gpay from '../payments/Gpay';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { app, storage, db } from '../firebase';
import { AuthContext } from '../context/AuthContext';
const Details = () => {
   
    const location = useLocation();
    const book = location.state.book;
    console.log(book);
    const { currentUser } = useContext(AuthContext);
    const Id = currentUser.uid;
    const [success,setSuccess] = useState(false);

    const navigate = useNavigate();
   
  const handlePaymentSuccess = () => {
  
    setSuccess(true);
  };
  const handlePaymentSuccesss =  () => {
    navigate('/cod',{ state: { details: book } });
   }
  useEffect(() => {
    const handlePaymentSuccess = async () => {
      var currentDate = new Date();
      var year = currentDate.getFullYear();
      var month = currentDate.getMonth() + 1; // Months are zero-based
      var day = currentDate.getDate();
      var hours = currentDate.getHours();
      var minutes = currentDate.getMinutes();
      var seconds = currentDate.getSeconds();
      var formattedDateTime = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
      const NameId = formattedDateTime
      await Promise.all([
        setDoc(doc(db, Id, `${book.desc}${NameId}`), {
          bookUrl: book.pdf,
          bookName: book.desc,
          bookImg: book.img,
          Id:NameId,
          driveURL:book.driveURL,
        })
      ]);
  
  

      console.log('Payment successful');
      const link = document.createElement('a');
      link.href = book.driveURL; //
       console.log(book.driveURL);
      link.target = '_blank'; // Open in a new tab or window

      link.dispatchEvent(new MouseEvent('click'));
    };
  
    if (success) {
      handlePaymentSuccess();
    }
  }, [success]);

  return (
    <div className='centrify'>
  <div className='d-flexible p-2 m-2 rounded mt-2 my-border '>
<img src={book.img} className='widthxy cover rounded'/>
<div className='d-flex flex-column mrg '>
<p className='desc'>
  {book.desc}
</p>
<div className='height'>

</div>
<div className='d-flex flex-row wth  '>
<p className='mrp '>₹ {book.mrp} M.R.P</p>
  <p className='offer'>₹ {book.offer}</p>
  </div>
  <div className=' d-flex justify-content-center'>
 <Gpay offer={book.offer} onSuccess={handlePaymentSuccess} />
 <button offer={book.offer} onClick={handlePaymentSuccesss} className='btn bg-body-primary btn-outline-primary' >Get pendrive</button>
 </div>
</div>

  </div>
  </div>
  )
}

export default Details

// firebase_id = {}
