import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import textData from "../data/hero-data";
import HeroLogo from "./hero-logo";
import Navbar from "./navbar";

const FirstSection = ({ setActiveIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const sectionRef = useRef(null);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef(null);

  // Handle scroll wheel navigation
  const handleWheel = (event) => {
    if (isScrollingRef.current) return;

    let newIndex = currentIndex;
    if (event.deltaY > 0 && currentIndex < textData.length - 1) {
      newIndex += 1;
    } else if (event.deltaY < 0 && currentIndex > 0) {
      newIndex -= 1;
    }

    if (newIndex !== currentIndex) {
      isScrollingRef.current = true;
      setCurrentIndex(newIndex);

      // Fade out before switching section
      if (currentIndex === 3 && event.deltaY > 0) {
        setIsFadingOut(true);
        setTimeout(() => {
          setActiveIndex("thinking");
        }, 2000);
      }

      timeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false;
      }, 1000);
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (section) {
      section.addEventListener("wheel", handleWheel);
    }
    return () => {
      if (section) {
        section.removeEventListener("wheel", handleWheel);
      }
    };
  }, [currentIndex]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
      animate={
        isFadingOut ? { opacity: 0 } : { background: "#ED6B62", opacity: 1 }
      }
      transition={{ duration: 1.5 }}
    >
      <Navbar />
      <div className="relative max-w-[75%] w-full h-full flex items-center justify-center">
        {textData.map((item, index) => (
          <motion.div
            key={index}
            className="absolute top-0 bg-black w-full h-full flex items-start justify-start px-32 text-4xl font-bold"
            style={{
              zIndex: currentIndex === index ? 10 : 1, // 🔹 Ensure active slide is on top
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={
              currentIndex === index
                ? { opacity: 1, y: 0, transition: { duration: 0.8 } }
                : { opacity: 0, y: -50, transition: { duration: 0.8 } }
            }
          >
            {item.isAnimated ? (
              <TypeAnimation
                sequence={[item.text, 2000]}
                speed={40}
                cursor={true}
                repeat={0}
              />
            ) : (
              item.text
            )}
          </motion.div>
        ))}
      </div>

      <HeroLogo scrollY={currentIndex === 0 ? 3 : 13} />
    </motion.div>
  );
};

export default FirstSection;
