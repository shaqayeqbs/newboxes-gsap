import React, { useState, useEffect } from "react";

// Import all page components
import Sixth from "./components/sixth";
import Seventh from "./components/seventh";
import Third from "./components/third";
import Forth from "./components/forth";
import Fifth from "./components/fifth";
import Thinking from "./components/thinking";
import Eighth from "./components/eighth";
import FirstSection from "./components/hero"; // Ensure correct import

function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [isHeroVisited, setIsHeroVisited] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  // Reset states when re-entering the hero section
  useEffect(() => {
    const heroSection = document.getElementById("hero");

    // Create an IntersectionObserver to detect when Hero is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset to the initial state when the hero section is revisited
            setIsHeroVisited(false);
            setIsAnimationFinished(false);
          }
        });
      },
      { threshold: 0 } // Set threshold to 0 to trigger when the top of the section is in view
    );

    observer.observe(heroSection);

    return () => {
      observer.disconnect(); // Clean up observer when component unmounts
    };
  }, []);

  // Observe and update the background color based on the active section
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.1 } // Trigger when the section is at the top
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  useEffect(() => {
    const backgroundColors = {
      hero: "transparent",
      thinking: "black",
      third: "white",
      forth: "transparent",
      fifth: "white",
      sixth: "white",
      seventh: "transparent",
      eighth: "white",
    };

    const currentColor = backgroundColors[activeSection] || "white";
    setBackgroundColor(currentColor);
  }, [activeSection]);

  return (
    <>
      {/* Background Wrapper: Smooth Slow Color Change */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -10,
          backgroundColor: backgroundColor,
          transition: "background-color 2s ease-in-out", // Smooth transition for background color
        }}
      />

      <section id="hero" className="!h-screen">
        <FirstSection
          setIsHeroVisited={setIsHeroVisited}
          setIsAnimationFinished={setIsAnimationFinished}
        />
      </section>

      {/* Prevent access to 'Thinking' until Hero is fully seen */}
      <section id="thinking" className="relative !h-screen !overflow-x-hidden">
        <Thinking />
      </section>

      <section id="third" className="relative !overflow-x-hidden">
        <Third />
      </section>
      <section id="forth">
        <Forth />
      </section>
      <section id="fifth">
        <Fifth />
      </section>
      <section id="sixth">
        <Sixth />
      </section>
      <section id="seventh">
        <Seventh />
      </section>
      <section id="eighth">
        <Eighth />
      </section>
    </>
  );
}

export default App;
