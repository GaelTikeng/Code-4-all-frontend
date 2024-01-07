"use client"
import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';

// import './style.css';

// // import required modules
// import { Navigation, Pagination, Keyboard } from 'swiper/modules';

// import CommentCart from "../molecules/commentCart";
// import Slide from "./slide";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import "./style.css";
import CommentCart from "../molecules/commentCart";

type Props = {}

export default function CarousselComment({ }: Props) {

  const comments = [
    {
      id: 0,
      image: "/image2.jpg",
      name: "ricardo",
      createAt: "12 Jan 2013",
      comment: "Wonderfull code"
    },
    {
      id: 1,
      image: "/image3.jpg",
      name: "Sam Marvis",
      createAt: "12 fev 2013",
      comment: "amazing code"
    },
    {
      id: 0,
      image: "/image4.jpg",
      name: "ricardo",
      createAt: "12 Jan 2013",
      comment: "Wonderfull code"
    }
  ]
  return (
    <div className="bg-red-500">
      <Swiper watchSlidesProgress={true} slidesPerView={3} className="mySwiper">
      {comments.map((item, index) => (
          <SwiperSlide key={index}>
            <CommentCart
              createdAt={item.createAt}
              name={item.name}
              comment={item.comment}
            />

          </SwiperSlide>
        ))}
        
      </Swiper>
      {/* <Swiper
        slidesPerView={2}
        spaceBetween={2}
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
        navigation = {true}
        modules={[Keyboard, Pagination, Navigation]}
        // className="mySwiper"
      >
        {comments.map((item, index) => (
          <SwiperSlide key={index}>
            <CommentCart
              image={item.image}
              createdAt={item.createAt}
              name={item.name}
              comment={item.comment}
            />

          </SwiperSlide>
        ))}

      </Swiper> */}

    </div>
  )
}