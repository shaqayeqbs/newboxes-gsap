import React from "react";
import { motion } from "framer-motion";
import img1 from "../assets/six1.svg";
import img2 from "../assets/six12.svg";

function Sixth() {
  const items = [
    {
      title: "Technology Solutions",
      description:
        "We provide cutting-edge solutions that drive innovation across industries.",
      image: img1,
    },
    {
      title: "AI & Automation",
      description:
        "Leveraging AI to automate and optimize business processes for maximum efficiency.",
      image: img2,
    },
    {
      title: "Cloud Computing",
      description:
        "Empowering businesses with scalable cloud infrastructure to support growth.",
      image: img2,
    },
    {
      title: "Cybersecurity",
      description:
        "Protecting businesses with advanced security measures and AI-driven threat detection.",
      image: img2,
    },
  ];

  return (
    <div className="overflow-hidden scrollbar-hidden min-h-screen px-40 py-1 pb-32 text-black">
      {/* Title with animation */}
      <motion.h2
        className="text-[40px] mb-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        // viewport={{ once: true }}
      >
        <div>Our focus:</div> The high technology sectors.
      </motion.h2>

      {/* Staggered animation for each row */}
      <div className="space-y-20">
        {items.map((item, index) => (
          <motion.div
            key={index}
            className="flex w-full justify-between items-center gap-10"
            initial={{ opacity: 0, y: 100 }} // Start from bottom
            whileInView={{ opacity: 1, y: 0 }} // Move up when in view
            transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
            // viewport={{ once: true }}
          >
            {/* Text content */}
            <div className="max-w-[200px]">
              <h3 className="text-[30px] font-semibold">{item.title}</h3>
              <p className="mt-4 text-[18px] font-ibm">{item.description}</p>
            </div>
            {/* Image */}
            <div className="flex-shrink-0 w-[555px] h-[139px]">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h- rounded-lg"
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Sixth;
