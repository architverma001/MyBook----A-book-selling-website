import React, { useState, useContext, useEffect, useRef, lazy, Suspense } from 'react';
import Book from './../../component/cards/Book/Book';
import { collection, query, orderBy, startAfter, limit, getDocs } from "firebase/firestore"; 
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import './Img.css'
import { db } from '../../firebase';
import Search from "../../pages/Search/Search";


function PoularSwiper() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(6); 
    const [slidesPerView, setSlidesPerView] = useState(3);
    useEffect(() => {
        const handleResize = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth < 350) {
            setSlidesPerView(1);
          }
          else if (windowWidth < 800) {
            setSlidesPerView(2);
          } else if (windowWidth < 1200) {
            setSlidesPerView(4);
          } else {
            setSlidesPerView(5);
          }
        };
    
        handleResize(); // Call it initially
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);




      useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);
            try {
              const querys = query(collection(db, "popularproducts"), limit(20));
              const querySnapshot = await getDocs(querys);
              const booksData = querySnapshot.docs.map((doc) => doc.data());
              setBooks(booksData);
              console.log(booksData);
            }
            catch (error) {
                console.log('An error occurred while fetching books:', error);
                }
            setLoading(false);
            };
            fetchBooks();
        }, []);


        
      
        return (
            <Swiper
              spaceBetween={20}
              slidesPerView={slidesPerView}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
            >
              {books.map((book) => (
                <SwiperSlide key={book.desc + book.Id  + book.imgUrl + book.mrp + book.offer} className='mgn'>
                  <Book
          key={book.desc + book.Id + book.teacherName + book.imgUrl + book.mrp + book.offer} 
         img = {book.imgUrl}
         name= {book.desc}
          desc = {book.teacherbookDescription}
          mrp = {book.price}
          offer = {book.offer}
          pdf = {book.pdfUrl}
          teacherName = {book.teacherName}
          />
                </SwiperSlide>
              ))}
            </Swiper>
          );
}

export default PoularSwiper
