"use client";

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './style.css';

// import required modules
import { Autoplay, Pagination, Navigation, Keyboard } from 'swiper/modules';
import Slide from "./slide";
// import Slide from "../molecules/Slide";

const HeroSection = () => {

  const slideData = [
    {
      id: 0,
      img: "/image1.jpg",
      title: "Build ready-for-anything teams",
      mainTitle:
        "See why leading organizations choose to learn with Udemy Business.",
    },
    {
      id: 1,
      img: "/image3.jpg",
      title: "Learning that gets you",
      mainTitle:
        "Skills for your present (and your future). Get started with us.",
    },
  ];

  return (
    <div className="!bg-white">
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        effect={'fade'}
        loop={true}
        keyboard={{
          enabled: true,
        }}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Keyboard, Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        {slideData.map((item, index) => (
          <SwiperSlide key={index}>
            <Slide
              key={item.id}
              img={item.img}
              title={item.title}
              mainTitle={item.mainTitle}
            />
          </SwiperSlide>
        ))} 
      </Swiper>
    </div>
  );
};

export default HeroSection;
