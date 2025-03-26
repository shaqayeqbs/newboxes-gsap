import React, { useState, useEffect } from "react";
import img from "../assets/lieb.svg";
import img1 from "../assets/benz.svg";
import img2 from "../assets/bmw.svg";
import img3 from "../assets/whiterolls.svg";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Words from "./word";

function Seventh() {
  const text =
    "Our commitment to quality and innovation has been recognized by industry leaders and institutions.";
  const words = text.split(" "); // Split text into words

  return (
    <div className="flex flex-col !opacity-100 justify-evenly w-full">
      <motion.div
        className="w-full 3xl:max-w-[70%]   flex flex-col justify-center items-center 3xl:text-[90px] scrollbar-hidden h-screen mx-auto px-40 py-24 transition-all duration-1000 ease-in-out"
        style={{ position: "relative" }}
      >
        {/* Background faded text */}
        <div className="max-h-[40rem] w-full flex flex-col items-center justify-center gap-16">
          <Words value={text} />
          <div className="flex w-full mt-10 items-center justify-between">
            {[img, img1, img2, img3].map((logo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }} // Fade-in effect for logos
                transition={{
                  delay: index * 0.5, // Staggered delays
                  duration: 1.5,
                }}
              >
                <img src={logo} alt={`logo-${index}`} />
              </motion.div>
            ))}
          </div>
        </div>
        {/* Logos fade-in animation with staggered delay */}
      </motion.div>
    </div>
  );
}

export default Seventh;
