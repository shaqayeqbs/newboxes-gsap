import React from "react";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from "uuid";
import toprightarrow from "../assets/toprightarrow.svg";
import gridData from "../data/solving";

function Forth() {
  return (
    <div
      id="forth-section"
      className="px-28 flex flex-col h-screen justify-evenly"
    >
      <motion.div
        className="text-[40px] transition-all"
        initial={{ opacity: 1, transform: "translateX(-70rem)" }}
        whileInView={{ transform: "translateX(7rem)" }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
      >
        How we solve them
      </motion.div>

      {/* Grid Layout */}
      <div className="grid px-28 pb-0 w-fit items-start grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 gap-x-32">
        {gridData.map((item, index) => (
          <motion.div
            key={uuidv4()}
            className="flex items-start justify-start gap-10"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { delay: (index + 1.5) * 0.5, duration: 1 },
            }}
            whileHover={{ scale: 1.3 }}
          >
            <motion.img
              src={toprightarrow}
              alt={item.title}
              className="w-[37px] mt-2 h-[37px]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5 + index * 0.5, duration: 0.8 },
              }}
            />
            <div>
              <motion.h3
                className="text-[30px] font-semibold"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 0.2 + index * 0.5, duration: 1 },
                }}
              >
                {item.title}
              </motion.h3>
              <motion.p
                className="max-w-52 !text-[18px] !font-[ibm] mt-2"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: 1 + index * 0.5, duration: 1 },
                }}
              >
                {item.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Forth;
