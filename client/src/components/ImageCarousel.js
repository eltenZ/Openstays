import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Convert the image_urls string into an array
  const images = imageUrls 
    ? imageUrls.split(',').map(img => img.trim())
    : [];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (!images || images.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />
      
      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-white/70 rounded-full hover:bg-white transition-all"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 p-2 bg-white/70 rounded-full hover:bg-white transition-all"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};

export default ImageCarousel;
