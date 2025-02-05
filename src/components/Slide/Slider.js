import React, { useState } from "react";
import "./Slider.css";

const Slider = ({ slides }) => {
  const [curSlide, setCurSlide] = useState(0);
  const maxSlide = slides.length;

  const nextSlide = () => {
    setCurSlide((prev) => (prev === maxSlide - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurSlide((prev) => (prev === 0 ? maxSlide - 1 : prev - 1));
  };

  const handleDotClick = (index) => {
    setCurSlide(index);
  };

  return (
    <div className="slider">
      <div
        className="slides"
        style={{
          transform: `translateX(-${curSlide * 100}%)`,
          display: "flex",
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="slide">
            {slide.content}
          </div>
        ))}
      </div>
      <button className="slider__btn slider__btn--left" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="slider__btn slider__btn--right" onClick={nextSlide}>
        &#10095;
      </button>
      <div className="dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dots__dot ${
              curSlide === index ? "dots__dot--active" : ""
            }`}
            onClick={() => handleDotClick(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;
