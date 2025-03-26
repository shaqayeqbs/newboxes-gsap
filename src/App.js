import React, { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import data from "./data/thinking";
import Third from "./components/third";
import HorizontalScroll from "./components/gsap/thinking";
import FirstSection from "./components/first-section";
import Navbar from "./components/navbar";

function App() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      smooth: true,
    });

    // Use Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value) : lenis.scroll();
      },
    });

    // Update ScrollTrigger on each animation frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="bg-primary text-black w-full main">
      <div className="relative">
        <FirstSection />
      </div>
      {/* Horizontal Scroll Component */}
      <HorizontalScroll data={data} />

      <section className="min-h-screen flex justify-center items-center">
        <Third />
      </section>
      <section className="min-h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold text-center">Welcome to the page</h1>
      </section>
    </main>
  );
}

export default App;
