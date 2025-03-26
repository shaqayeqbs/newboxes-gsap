import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const ScrollSection = ({ children, isHorizontal = false }) => {
  const containerRef = useRef();
  const contentRef = useRef([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalSlides = contentRef.current.length;

    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        [isHorizontal ? "xPercent" : "yPercent"]: -100 * (totalSlides - 1),
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: isHorizontal
            ? `+=${window.innerWidth * (totalSlides - 1)}`
            : `+=${window.innerHeight * (totalSlides - 1)}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
    });

    return () => {
      ctx.revert();
      ScrollTrigger.killAll();
    };
  }, [isHorizontal]);

  return (
    <section
      ref={containerRef}
      className={`w-screen h-screen ${
        isHorizontal ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      <div
        className={`flex ${isHorizontal ? "flex-row w-fit" : "flex-col h-fit"}`}
      >
        {React.Children.map(children, (child, i) =>
          React.cloneElement(child, {
            ref: (el) => (contentRef.current[i] = el),
            className: `w-screen h-screen flex justify-center items-center ${
              child.props.className || ""
            }`,
          })
        )}
      </div>
    </section>
  );
};

export default ScrollSection;
