import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import Quotes from "./Quotes";
import { collection, query, getDocs, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import ReviewCont from "./ReviewCont";

function Reviews() {
  
  const [slidesPerView, setSlidesPerView] = useState(3);
  const [reviews, setReviews] = useState([]);
  const swiperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 900) {
        setSlidesPerView(1);
      } else if (windowWidth < 1400) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize(); // Call it initially
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviewsRef = query(collection(db, 'reviews'), limit(100));
        const snapshot = await getDocs(reviewsRef);
        const reviewsData = snapshot.docs.map((doc) => doc.data());
        setReviews(reviewsData);
      } catch (error) {
        console.log('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [db]);

  SwiperCore.use([Pagination, Autoplay]); // Use the required modules



  return (
    <div  id="portfolio">
<Swiper
  ref={swiperRef}
   spaceBetween={20}
              slidesPerView={slidesPerView}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
>
        {reviews &&
          reviews.map((review) => (
            <SwiperSlide key={review.ID} className="mb-4">
                           <ReviewCont className = 'font-formt' content={review.textareaValue}  />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Reviews;
