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

  const handlesub = (e)=>{
    e.preventDefault();
    const searchValue = searchInputRef.current.value;
    const Str = searchValue.toLowerCase();
    navigate(`/${Str}`);
} 


  const searchInputRef = useRef(null);


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
    if (currentUser === null) {
      navigate('/login');
    } else {
      console.log(currentUser.uid);
    }

    const interval = setInterval(() => {
      setSwapPosition((prevPosition) => !prevPosition);
    }, 4500);

    return () => clearInterval(interval);
  }, [currentUser]);

  return (
    <div className='main'>
      <div className='mt-2 centrify'>
        <h2 className='text-primary'>Welcome to the Lecturesbasket</h2>
        <p className='text-secondary'>Get all the CA Books in form of pdf here at cheap price</p>
      </div>
      <div className='d-flex flex-wrap justify-content-center align-items-center margtin-manager-main managercnt'>
  <ImgSwiper/>
</div>

<div className='d-flex justify-content-center'>
<div className='handle-width'>
<form className="disply" role="search">
        <input ref={searchInputRef}  className="form-control me-2" type="search" placeholder="book/teacher/all" aria-label="Search"/>
        <button className="btn btn-sm btn-outline-success" onClick={handlesub}>Search</button>
      </form>
</div>
</div>
      <div className='d-flex justify-content-center flex-column align-text'>
        <div className='back-quotes'>Quotes</div>
        <div className='mt-4'>
      <SwipersTool/>
      </div>
   

  


      <div className='d-flex justify-content-lg-start flex-column alignitemtext'>
        <h5>Home</h5>
        <h5>LectureBasket</h5>
        <p>Are you dreaming of cracking CA , CS  or CMA ? </p> 
        <p>If yes, then you are at the correct place because Lecturebasket is an open forum giving an ultimate solution for all your needs. </p>
<p>CA is a globally recognized accounting qualification. It equips individuals with expertise in accounting, auditing, taxation, and financial management, opening doors to diverse career opportunities in various industries.</p>

<p>The CS (Company Secretary) course is a professional program focused on corporate governance, compliance, and company law. It equips individuals with skills to handle legal and regulatory aspects of businesses, ensuring effective corporate administration and management.</p>

<p>The CMA (Certified Management Accountant) course is a professional program that emphasizes management accounting, financial planning, analysis, and strategic decision-making. It equips individuals with skills for financial management roles, supporting organizational success and profitability.</p>

<p>You dream may come true! All these above mentioned can be YOU ! All you need is a little push and Lecturebasket comes at your aid. 
As we are providing multiple courses and recorded classes from highly qualified, experienced and already successful Teachers, who guarantees your success. Your sure achievement will be celebrated with us as Lecturebasket cares for your potential and hardwork. And as a perk you need only one time investment and everything required study material will be in your hand for lifetime and at minimal expense.</p>
      </div>

      <div className='students'>
      <img src={Student} alt="" className='img contain rounded' />
     </div>


      <div className='d-flex justify-content-center flex-column align-text'>
        <div className='mt-4'>
        <div className='back-quotes reviews'>Reviews</div>
        <Reviews/>
        </div>
      </div>



      <div className='d-flex justify-content-center flex-column align-text'>
        <div className='mt-4'>
        <div className='reviews newclass'>Poular Products</div>
        <div className='mt-4'>
        <PoularSwiper/>
        </div>
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