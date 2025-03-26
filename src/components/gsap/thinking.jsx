import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const HorizontalScroll = ({ data }) => {
  const imageRef = useRef([]);
  const imageContainerRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const totalSlides = data.length;

    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        xPercent: -100 * (totalSlides - 1), // Moves exactly 1 slide width at a time
        ease: "power2.inOut",
        snap: {
          snapTo: 1 / (totalSlides - 1), // Ensure snapping to exact slides
          duration: 0.5,
          ease: "power2.inOut",
        },
        scrollTrigger: {
          trigger: imageContainerRef.current,
          start: "top top",
          end: `+=${window.innerWidth * (totalSlides - 1)}`, // Ensure full scroll length
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
  }, []);

  return (
    <section
      ref={imageContainerRef}
      className="w-screen h-screen overflow-hidden"
    >
      <div className="flex w-[100vw] h-full overflow-hidden">
        {data.map((_, i) => (
          <div
            key={i}
            ref={(el) => (imageRef.current[i] = el)}
            className="w-screen h-full flex justify-center items-center bg-black p-20 shrink-0 overflow-hidden"
          >
            <img src={_.img} className="w-[400px] h-[400px] mx-10" />
            <div className="max-w-[500px] text-left text-white">
              <h3 className="text-[30px] font-semibold mb-10">
                <span className="text-primary">{_.span}</span> {_.title}
              </h3>
              <p className="text-[18px]">{_.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HorizontalScroll;
