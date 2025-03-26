import React, { useState, useEffect } from "react";
import img from "../assets/71.svg";
import img1 from "../assets/72.svg";
import img2 from "../assets/73.svg";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

function Eighth() {
  const [key, setKey] = useState(0); // State to force reset of TypeAnimation

  const data = [
    { image: img },
    { image: img1 },
    { image: img2 },
    { image: img },
    { image: img1 },
    { image: img2 },
    { image: img1 },
    { image: img2 },
    { image: img },
    { image: img1 },
    { image: img2 },
  ];

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

    const section = document.getElementById("eighth-section");
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
    <div className="text-black w-full">
      <motion.div
        id="eighth-section"
        className="w-full scrollbar-hidden h-screen mx-auto px-40 py-24 transition-all overflow-y-scroll duration-1000 ease-in-out"
      >
        <h4 className="!text-[40px] mb-16 mx-auto">
          <TypeAnimation
            key={key} // Use key prop to force restart of animation
            sequence={[
              "Newboxes is constantly receptive to new ideas. Our partners enhance and expand our portfolio, serving as collaborators who help us broaden our perspectives.",
            ]}
            wrapper="span"
            speed={50}
            style={{ fontSize: "40px", display: "inline-block" }}
            repeat={0} // Prevent the animation from repeating continuously
          />
        </h4>

        <div className="grid grid-cols-6 gap-4 gap-y-8 mt-5">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-center items-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 6 + index * 0.2, // Start after text animation
              }}
            >
              <img
                src={item.image}
                alt={`logo-${index}`}
                className="w-[76px] h-auto"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default Eighth;
