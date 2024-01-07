"use client";

import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Autoplay, Pagination, Keyboard } from 'swiper/modules';
import Slide from "./slide";
// import Slide from "../molecules/Slide";

const HeroSection = () => {

  const slideData = [
    {
      id: 0,
      img: "/img6.jpg",
      title: "Unlock code snippets that accelerate your development",
      mainTitle:
        "Save time, improve code quality, and level up your programming skills with our collection of curated code snippets.",
    },
    {
      id: 1,
      img: "/image4.jpg",
      title: "Shop now and unleash the power of code snippets!",
      mainTitle:
        "Save time, improve code quality, and level up your programming skills with our collection of curated code snippets.",
    },
    {
      id: 2,
      img: "/image3.jpg",
      title: "Learning that gets you",
      mainTitle:
        "Explore a wide range of code snippets across various programming languages and frameworks, all carefully crafted and vetted by experienced developers.",
    },
  ];

 

  return (
    <div className="pt-4">
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
        // navigation={true}
        modules={[Keyboard, Pagination, Autoplay]}
        className="mySwiper"
      >
        {slideData.map((item, index) => (
          <SwiperSlide className="" key={index}>
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
