import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "./navbar";
import textData from "../data/hero-data";
import HeroLogo from "./hero-logo";

const FirstSection = ({ setActiveIndex }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef(null);
  const contentRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalSlides = textData.length;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        yPercent: -100 * (totalSlides - 1),
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * (totalSlides - 1) + 450}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const index = Math.round(self.progress * (totalSlides - 1));
            setCurrentIndex(index); // Update currentIndex when a slide is in view
          },
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-screen relative !text-white h-screen overflow-hidden"
    >
      <Navbar />
      <div className="relative  w-full h-full ">
        {textData.map((item, index) => (
          <motion.div
            key={index}
            className="  mt-[50px]  max-w-[70%] h-[80px] w-full px-32 text-4xl font-bold"
            style={{
              zIndex: currentIndex === index ? 10 : 1, // 🔹 Ensure active slide is on top
            }}
            initial={{ opacity: 0, y: 100 }}
            animate={
              currentIndex === index
                ? { opacity: 1, y: 90, transition: { duration: 0.8 } }
                : { opacity: 0, y: -150, transition: { duration: 0.8 } }
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
    </section>
  );
};

export default FirstSection;
