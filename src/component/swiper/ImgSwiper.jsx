
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import Banner from '../../img/lecturebasket.jpg';
import Basket from '../../img/basket.png';
import manga from '../../img/manga.jpg';
import manga2 from '../../img/manga2.jpg';
import science from '../../img/scinece.jpg';
import spaces from '../../img/student.jpg';
import lib2 from '../../img/lib2.jpg';
import library from '../../img/library.webp';
import './Img.css'
const ImgSwiper = () => {
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
      const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth < 600) {
          setSlidesPerView(1);
        } else if (windowWidth < 1200) {
          setSlidesPerView(2);
        } else {
          setSlidesPerView(3);
        }
      };
  
      handleResize(); // Call it initially
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    SwiperCore.use([Pagination, Autoplay]);
  return (
    <Swiper
    spaceBetween={30}
    slidesPerView={1}
    grabCursor={true}
    className="portfolio-slider"
    modules={[Pagination, Autoplay]}
    pagination={{ clickable: true }}
    autoplay={{ delay: 4000 }} // Autoplay with a 3-second delay between slides
  >

   <SwiperSlide>
        <img src={manga} alt="basket" className="imgmanager mb-5" />
    </SwiperSlide> 

    <SwiperSlide>
        <img src={manga2} alt="banner"  className="imgmanager mb-4"/>
    </SwiperSlide>


    <SwiperSlide>
        <img src={science} alt="basket" className="imgmanager" />
    </SwiperSlide> 


    <SwiperSlide>
        <img src={spaces} alt="banner" className="imgmanager" />
    </SwiperSlide> 

    <SwiperSlide>
        <img src={lib2} alt="basket" className="imgmanager" />
    </SwiperSlide> 

    <SwiperSlide>
        <img src={library} alt="banner" className="imgmanager" />
    </SwiperSlide>   
  </Swiper>
  )
}

export default ImgSwiper