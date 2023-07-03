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
import img1 from '../../img/img1.jpg';
import img2 from '../../img/img2.jpg';
import img3 from '../../img/img3.jpg';
import img4 from '../../img/img4.jpg';
import img5 from '../../img/img5.jpg';
import img6 from '../../img/img6.jpg';

import ca from '../../img/ca.jpg';
import FormCityState from '../../component/formconatiner/FormCityState';
import ImgSwiper from '../../component/swiper/ImgSwiper';
import PoularSwiper from '../../component/swiper/PoularSwiper';
import ShowCard from '../../component/cards/Book/ShowCard';
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

      <div className='students d-flex justify-content-center mb-2'>
      <img src={ca} alt="" className='img contain' />
     </div>


<div className='p-4 m-1'>
<h1>Welcome to our Book Haven!</h1>
<p>Discover the joy of reading and immerse yourself in a world of endless possibilities. Our book selling website is your ultimate destination for all things literary. Whether you're a passionate bookworm, a curious explorer, or a casual reader seeking a captivating escape, we have something for everyone.</p>
<p>Browse through our vast collection, carefully curated to cater to diverse tastes and interests. From timeless classics to the latest bestsellers, from gripping thrillers to heartwarming romance, we have an extensive range of genres to ignite your imagination. Dive into the pages of riveting novels, enlightening non-fiction, intriguing mysteries, inspiring biographies, and so much more.</p>
<p>Finding your next literary gem is a breeze with our user-friendly interface. Explore our intuitive search and recommendation features, which are designed to help you uncover hidden literary treasures and discover new authors. Connect with fellow book lovers through lively discussions in our vibrant community forums and share your thoughts, recommendations, and personal reflections.</p>
<p>At Book Haven, we believe that reading should be accessible to all. That's why we offer a wide selection of formats, including physical books, e-books, and audiobooks, ensuring that you can enjoy your favorite stories in a way that suits your lifestyle and preferences.</p>
<p>Looking to find the perfect gift for a loved one? Delve into our thoughtfully curated collections and themed book sets, handpicked to bring joy to any book enthusiast's heart. You can also explore our range of book-related merchandise, from cozy reading accessories to elegant bookshelf decor, to enhance your reading experience.</p>
<p>We pride ourselves on providing a seamless and secure shopping experience. Our dedicated customer support team is always ready to assist you with any inquiries, ensuring your satisfaction from the moment you enter our virtual store until your book arrives at your doorstep.</p>
<p>Join us on a literary journey that will transport you to distant lands, introduce you to unforgettable characters, and ignite your imagination. Step into the enchanting realm of Book Haven and let the magic of storytelling guide you.</p>
<p>Start exploring today and let the pages come alive!</p>
</div>

    <div className='d-flex flex-wrap justify-content-center mt-1'>
    <ShowCard img = {img1} text="💫𝐴𝑙𝑙 𝐹𝑎𝑐𝑢𝑙𝑡𝑦'𝑠 𝐿𝑒𝑐𝑡𝑢𝑟𝑒
"/>
 
 
    
    <ShowCard img = {img2} text="💫𝐹𝑎𝑠𝑡𝑒𝑠𝑡 𝐷𝑒𝑙𝑖𝑣𝑒𝑟𝑦 𝑆𝑒𝑟𝑣𝑖𝑐𝑒
"/>


    
    <ShowCard img = {img3} text="💫𝐿𝑒𝑐𝑡𝑢𝑟𝑒𝑠 𝑇𝑟𝑎𝑐𝑘𝑖𝑛𝑔 𝐹𝑎𝑐𝑖𝑙𝑖𝑡𝑦
"/>
  

    
    <ShowCard img = {img4} text="💫𝑀𝑎𝑥𝑖𝑚𝑢𝑚 𝐷𝑖𝑠𝑐𝑜𝑢𝑛𝑡"/>
 

    
    <ShowCard img = {img5} text="💫𝐵𝑒𝑠𝑡 𝐶𝑢𝑠𝑡𝑜𝑚𝑒𝑟 𝑆𝑢𝑝𝑝𝑜𝑟𝑡"/>

    
    <ShowCard img = {img6} text="💫𝐵𝑒𝑠𝑡 𝐺𝑟𝑜𝑢𝑝𝑠 𝑡𝑜 𝑠𝑜𝑙𝑣𝑒 𝑦𝑜𝑢𝑟 𝑎𝑙𝑙 𝑑𝑜𝑢𝑏𝑡𝑠"/>
    </div>


      <div className='d-flex justify-content-center flex-column align-text'>
        <div className='mt-4'>
        <div className='reviews newclass p-2'>Popular Products</div>
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