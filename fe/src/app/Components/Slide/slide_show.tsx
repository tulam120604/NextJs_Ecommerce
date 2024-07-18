'use client';

import React from 'react'
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";


const Slide_show = ({children} : {children : React.ReactNode}) => {
    return (
            <Swiper className="mySwiper">
            {React.Children.map(children, (child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
            ))}
            </Swiper>
    )
}

export default Slide_show