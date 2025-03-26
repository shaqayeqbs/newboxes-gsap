import { useScroll, motion, useTransform } from "framer-motion";
import { div } from "framer-motion/client";
import React, { useRef } from "react";

function Words({ value }) {
  const element = useRef();
  const { scrollYProgress } = useScroll({
    target: element,
    offset: ["start 0.9", "start 0.25"], // Adjust to control scroll behavior
  });

  const words = value.split(" ");

  return (
    <div className=" overflow-y-auto scrollbar-hidden mx-auto text-center flex flex-col justify-center items-center">
      <div
        ref={element}
        className="flex flex-wrap  xl:text-[75px] overflow-y-auto " // Full height and internal scroll
        style={{ opacity: scrollYProgress }}
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} range={[start, end]} progress={scrollYProgress}>
              {word}
            </Word>
          );
        })}
      </div>
    </div>
  );
}

export default Words;

const Word = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mr-4 mt-2 text-[60px]">
      <motion.span className="absolute opacity-20">{children}</motion.span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};
