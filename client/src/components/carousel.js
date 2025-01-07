import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

const AccommodationCarousel = ({ accommodation }) => {
  const images = accommodation.image_urls
    ? accommodation.image_urls.split(",").map((url) => url.trim())
    : ["/default-image.jpg"];

  return (
    <div className="relative h-full">
      <div className="absolute top-4 left-4 bg-white/70 backdrop-blur-md px-3 py-1 rounded-full shadow-md z-10">
        <span className="text-sm text-gray-800">Verified</span>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3000 }}
        className="h-full"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={`${process.env.PUBLIC_URL}/${image}`}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AccommodationCarousel;
