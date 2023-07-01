import React, { useContext, useEffect, useState, useRef } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Link } from 'react-router-dom';
import Book from './../../component/cards/Book/Book';
import Basket from "../../img/basket.png";
import Banner from "../../img/banner.jpg";
import LectBanner from "../../img/lecturebasket.jpg";
import SwipersTool from '../../component/swiper/SwipersTool';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { app, storage, db } from '../../firebase';
import Reviews from '../../component/swiper/Reviews';
import Student from '../../img/student.jpg';
import FormCityState from '../../component/formconatiner/FormCityState';
import ImgSwiper from '../../component/swiper/ImgSwiper';
import PoularSwiper from '../../component/swiper/PoularSwiper';
function Home() {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  var currentDate = new Date();

  // Get the current date and time in various formats
  var year = currentDate.getFullYear();
  var month = currentDate.getMonth() + 1; // Months are zero-based
  var day = currentDate.getDate();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  const randomNum = Math.floor(Math.random() * 10000)
  const randomNum2 = randomNum - year;
  const randomNum3 = randomNum2 - month;
  // Format the date and time as desired
  var formattedDateTime = randomNum3 + '-' + year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
  const textareaRef = useRef(null);
  
  const formRef = useRef(null);


  const handlebtnz = async (e) => {
    e.preventDefault();
  setLoadreview(!loadreview);
  if (formRef.current) {
    formRef.current.scrollIntoView({ behavior: 'smooth' });
  }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsButtonDisabled(true);

    const textareaValue = textareaRef.current.value;
    if (textareaValue === '') {
      alert('Please enter a review');
      isButtonDisabled(false);
      return;
    }
    console.log(textareaValue);
 
   
    await Promise.all([
      setDoc(doc(db, 'reviews',formattedDateTime), {
        textareaValue,
        ID:formattedDateTime,
      }),])


      
      setLoadreview(false);
      setIsButtonDisabled(false);
      alert('Your review has been submitted');

  };

  const[loadreview,setLoadreview]=useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [swapPosition, setSwapPosition] = useState(false);

  useEffect(() => {
    // if (currentUser === null) {
    //   navigate('/login');
    // }
    const interval = setInterval(() => {
      setSwapPosition((prevPosition) => !prevPosition);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <div className='main'>
      <div className='mt-1'>
      
      </div>
      <div className='d-flex'>
  <ImgSwiper/>
</div>


      <div className='d-flex justify-content-center flex-column align-text'>
        <div className='back-quotes'>Quotes</div>
        <div className='mt-4'>
      <SwipersTool/>
      </div>
      </div>

      <div className='students d-flex justify-content-center'>
      <img src={Student} alt="" className='img contain' />
     </div>





 



      <div className='d-flex justify-content-center flex-column align-text'>
        <div className='mt-4'>
        <div className='reviews newclass'>Popular Products</div>
        <div className='mt-4'>
        <PoularSwiper/>
        </div>
        </div>
      </div>
     


      <div className='d-flex justify-content-center flex-column align-text'>
      <div className='mt-4'>
        <div className='reviews newclass'>Reviews</div>
        <div className='mt-4'>
        <Reviews/>
        </div>
        </div>
      </div>

      
      <div className='mt-2 d-flex flex-column justify-content-between'>
      <div className='reviewmanager' >
    <button  className='btn btnmanager' onClick={handlebtnz}> Write your review </button>
      </div>
      <form className='d-flex flex-column justify-content-between mb-2'  ref={formRef}>
        {loadreview && <textarea className='formdataz w-75' ref={textareaRef} required />}
        <div className='d-flex justify-content-center mt-3'>
        {loadreview && <button  onClick={handleSubmit} className='btn btnmanager' disabled={isButtonDisabled}>Submit</button>}
        </div>
      </form>
      
      </div>

    </div>
  );
}

export default Home;