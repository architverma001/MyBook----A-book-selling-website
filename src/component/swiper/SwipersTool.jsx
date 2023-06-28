import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SwiperCore, { Pagination, Autoplay } from "swiper";
import Quotes from "./Quotes";

function SwipersTool() {
  const [slidesPerView, setSlidesPerView] = useState(3);

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

  SwiperCore.use([Pagination, Autoplay]); // Enable pagination and autoplay

  return (
    <div className="portfolio" id="portfolio">
      {/* heading */}
      {/* slider */}
   

      <Swiper
        spaceBetween={30}
        slidesPerView={slidesPerView}
        grabCursor={true}
        className="portfolio-slider"
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }} // Autoplay with a 3-second delay between slides
      >
        
        <SwiperSlide className="mb-4">
          <Quotes className = 'font-formt' content ="Always remember that the best is yet to come, your current position doesn't decide your future, your destination will be defined on the labour you put in." />
        </SwiperSlide>
        <SwiperSlide>
        <Quotes className = 'font-formt' content="Let your profile decide the dedication and commitment to excellence in every aspect of personal and professional life." />
        </SwiperSlide>
        <SwiperSlide>
        <Quotes className = 'font-formt' content="Success is not final, failure is not the end, it's the courage that counts. Strive for progress not perfection. " />
        </SwiperSlide>
        <SwiperSlide>
        <Quotes className = 'font-formt' content="Find strength in vulnerability and genuineness, let your past fuel for your bright future. " />
        </SwiperSlide>

        <SwiperSlide>
        <Quotes className = 'font-formt' content="Being different doesn't mean being subordinate, dare to be unique and leave a trail of inspiration behind you. " />
        </SwiperSlide>
        
      </Swiper>
    </div>

  );
}

export default SwipersTool;