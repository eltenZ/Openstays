import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ImageCarousel = ({ imageUrls }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ensure imageUrls is an array
  if (!imageUrls || imageUrls.length === 0) return null;

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden rounded-2xl">
      <img
        src={imageUrls[currentIndex]}
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