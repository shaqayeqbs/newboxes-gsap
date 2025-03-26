import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.svg";

function HeroLogo({ scrollY }) {
  return (
    <motion.div
      className="absolute w-[400px]  !z-0 top-[110px] 3xl:top-[200px] transition-all"
      initial={{
        right: "-50%",
        opacity: 1,
      }}
      animate={{
        opacity: scrollY > 10 ? 0.5 : 1, // Fade effect on scroll
        right: scrollY > 10 ? "50%" : 0, // Set logo to move towards center
        transform: scrollY > 10 ? "translateX(50%)" : "translateX(50%)", // Apply transform after scroll
      }}
      transition={{
        duration: 1, // Set duration to slow down the transition for the logo to center
        ease: "linear",
      }}
    >
      <img src={logo} alt="Logo" className=" w-[400px]  " />
    </motion.div>
  );
}

export default HeroLogo;
