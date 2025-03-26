import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import data from "../data/challenges";

function Third() {
  return (
    <div
      id="third-section"
      className="px-28 bg-white flex flex-col w-full overflow-hidden !text-[black] min-h-screen justify-evenly relative"
    >
      {/* Title Animation (Only Starts When Visible) */}
      <motion.div
        className="text-[40px] pt-20"
        initial={{ opacity: 0, x: -200 }} // Start off-screen (left)
        whileInView={{ opacity: 1, x: 0 }} // Move to position when in view
        viewport={{ once: true }} // Only trigger once
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        Challenges we address
      </motion.div>

      {/* List Items (Appear One by One) */}
      <div className="w-full mt-4">
        {data[1].data.map((item, index) => (
          <motion.div
            key={index}
            id={`challenge-${index}`}
            className="my-20 flex items-center"
            initial={{ opacity: 1, x: -200 }} // Start off-screen (left)
            whileInView={{
              opacity: 1,
              x: 0, // Move into place
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              delay: index * 0.3, // Delay each item
            }}
          >
            <Lottie
              animationData={item.img}
              loop={false} // Play animation only once
              className="w-[150px] h-[150px]"
            />
            <div className="text-left ml-5">
              <h3 className="text-[40px]">{item.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Third;
