import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import lottieData from "../assets/lottie/search.json"; // Import your Lottie JSON animation here
import { TypeAnimation } from "react-type-animation";

function Fifth() {
  const [key, setKey] = useState(0);

  // Trigger TypeAnimation reset when the section becomes visible
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      { threshold: 0.5 } // Trigger when 50% of the section is in view
    );

    const section = document.getElementById("seventh-section");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  // Reset TypeAnimation on section view change
  useEffect(() => {
    if (inView) {
      setKey((prevKey) => prevKey + 1); // Increment key to restart animation
    }
  }, [inView]);

  return (
    <motion.div
      className="px-28  overflow-y-auto text-black py-16 h-screen"
      transition={{
        duration: 2, // Duration of 2 seconds
        ease: "easeInOut", // Smooth transition
        delay: 1, // Delay the animation by 1 second
      }}
      style={{
        transition: "background-color 1s ease-in-out", // Smooth transition for background color change
      }}
    >
      {/* Title with animation */}
      <motion.div
        className="text-[40px] my-16 transition-all"
        initial={{ opacity: 1, transform: "translateX(-70rem)" }}
        whileInView={{ transform: "translateX(7rem)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        The newboxes method
      </motion.div>

      {/* Flexbox container */}
      <div className="flex px-28 items-center justify-between gap-10">
        {/* Lottie animation on the left */}
        <div className="flex-shrink-0 w-[400px] h-[354px]">
          <Lottie
            animationData={lottieData} // Path to your Lottie JSON file
            loop
            autoplay
            style={{ width: "100%", height: "100%" }}
          />
        </div>

        {/* Text section on the right */}
        <div className="max-w-[600px]">
          <h3 className="text-[40px] font-semibold">
            Mit newboxes können Sie messbare Ergebnisse erwarten.
          </h3>
          <p className="mt-4 !text-[18px] !font-[ibm]">
            <TypeAnimation
              key={key}
              sequence={[
                "gesteigerte Effizienz, optimierte Prozesse, konkrete Kosteneinsparungen und innovative, skalierbare Geschäftsmodelle. Unser Ziel ist es, nicht nur kurzfristige Ergebnisse zu liefern, sondern Ihr Unternehmen nachhaltig für die Zukunft aufzustellen.",
              ]}
              wrapper="span"
              speed={50}
              style={{ fontSize: "18px", display: "inline-block" }}
              repeat={0}
            />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export default Fifth;
