import React, { useEffect, useState } from "react";
import "../styles/pages/BannerSlider.css";

import banner1 from "../assets/images/bannert1.avif";
import banner2 from "../assets/images/banner2.avif";
import banner3 from "../assets/images/banner3.avif";

const banners = [banner1, banner2, banner3];
const bannerLinks = ["#", "#", "#"]; // Add your links here

// clone first & last for infinite loop
const slides = [
  banners[banners.length - 1],
  ...banners,
  banners[0]
];

const slideLinks = [
  bannerLinks[bannerLinks.length - 1],
  ...bannerLinks,
  bannerLinks[0]
];

const BannerSlider = () => {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);

  // auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // handle infinite loop jump
  useEffect(() => {
    if (current === slides.length - 1) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(1);
      }, 600);
    }

    if (current === 0) {
      setTimeout(() => {
        setTransition(false);
        setCurrent(slides.length - 2);
      }, 600);
    }
  }, [current]);

  // re-enable transition after jump
  useEffect(() => {
    if (!transition) {
      setTimeout(() => {
        setTransition(true);
      }, 50);
    }
  }, [transition]);

  return (
    <section className="hero">
      <div className="slider-wrapper">
        <div
          className="slider"
          style={{
            transform: `translateX(-${current * 100}%)`,
            transition: transition ? "transform 0.6s ease" : "none"
          }}
        >
          {slides.map((img, index) => (
            <div className="slide" key={index}>
              <a href={slideLinks[index]}>
                <img src={img} alt="banner" />
              </a>
            </div>
          ))}
        </div>

        <button
          className="nav prev"
          onClick={() => setCurrent((prev) => prev - 1)}
        >
          ❮
        </button>

        <button
          className="nav next"
          onClick={() => setCurrent((prev) => prev + 1)}
        >
          ❯
        </button>
      </div>
    </section>
  );
};

export default BannerSlider;
