import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Parallax, Mousewheel, Navigation } from "swiper/modules";
import { motion } from "framer-motion";
import data from "../data/thinking";

const Thinking = ({ setActivePageIndex }) => {
  const [activeIndex, setLocalActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const thinkingRef = useRef(null);
  const [isThinkingInView, setIsThinkingInView] = useState(false);

  // Observe if the Thinking section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsThinkingInView(entry.isIntersecting);
      },
      { threshold: 0.5 } // Trigger when at least 50% is visible
    );

    if (thinkingRef.current) {
      observer.observe(thinkingRef.current);
    }

    return () => {
      if (thinkingRef.current) {
        observer.unobserve(thinkingRef.current);
      }
    };
  }, []);

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setLocalActiveIndex(swiper.realIndex);
    setIsScrolling(true); // Disable scrolling while slide is changing

    clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 1500);
  };

  // Handle wheel scrolling
  const handleWheel = (event) => {
    if (isScrolling) return; // Prevent multiple quick scrolls

    const swiper = swiperRef.current?.swiper;
    const scrollAmount = event.deltaY;

    setIsScrolling(true); // Disable scrolling before slide change

    setTimeout(() => {
      if (activeIndex === 0 && scrollAmount < 0 && isThinkingInView) {
        // ✅ Only switch to "hero" when Thinking is in view and scrolling up
        setActivePageIndex("hero");
      } else if (activeIndex === 2 && scrollAmount > 0) {
        setActivePageIndex("third");
      } else {
        if (scrollAmount > 0) {
          swiper?.slideNext();
        } else {
          swiper?.slidePrev();
        }
      }
      setIsScrolling(false);
    }, 1000); // 1s delay
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, [activeIndex, isScrolling, isThinkingInView]);

  return (
    <motion.div
      ref={thinkingRef} // Attach ref to the Thinking section
      className="w-screen h-screen scrollbar-hidden !overflow-hidden"
      initial={{ backgroundColor: "transparent", opacity: 0 }}
      animate={{ opacity: 1, background: "black" }}
      transition={{ delay: 0.5 }}
    >
      <Swiper
        ref={swiperRef}
        spaceBetween={100}
        centeredSlides={true}
        slidesPerView={1}
        loop={false}
        speed={1500}
        parallax={true}
        mousewheel={{ forceToAxis: true, sensitivity: 1 }}
        modules={[Parallax, Mousewheel, Navigation]}
        onSlideChange={handleSlideChange}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index} className="relative w-full overflow-hidden">
            <div className="flex items-center justify-evenly h-screen relative">
              {/* Image Animation */}
              <motion.img
                src={item.img}
                alt={item.title}
                className="w-[500px] !z-30 h-[500px] object-contain rounded-lg absolute"
                animate={{
                  x: activeIndex === index ? "-55%" : "150%",
                  opacity: 1,
                }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Text Animation */}
              <motion.div
                className="max-w-[500px] !z-0 text-left text-white "
                initial={{ opacity: 0.3, x: "50%" }}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  x: "70%",
                }}
                transition={{ duration: 1.5 }}
              >
                <h3 className="text-[30px]   !z-0  font-semibold mb-10">
                  <span className="text-primary">{item.span}</span> {item.title}
                </h3>
                <p className="text-[18px]  !z-0 ">{item.description}</p>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </motion.div>
  );
};

export default Thinking;
