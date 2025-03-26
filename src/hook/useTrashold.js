import { useEffect } from "react";

// Custom hook to handle threshold areas and set active index
const useThreshold = (
  topThresholdRef,
  bottomThresholdRef,
  setActiveIndex,
  topIndex,
  bottomIndex
) => {
  useEffect(() => {
    const handleMouseEnterTop = () => {
      setActiveIndex(topIndex); // Change to the top section (e.g., "thinking")
    };

    const handleMouseEnterBottom = () => {
      setActiveIndex(bottomIndex); // Change to the bottom section (e.g., "forth")
    };

    const topThreshold = topThresholdRef.current;
    const bottomThreshold = bottomThresholdRef.current;

    if (topThreshold) {
      topThreshold.addEventListener("mouseenter", handleMouseEnterTop);
    }
    if (bottomThreshold) {
      bottomThreshold.addEventListener("mouseenter", handleMouseEnterBottom);
    }

    // Cleanup on component unmount or ref change
    return () => {
      if (topThreshold) {
        topThreshold.removeEventListener("mouseenter", handleMouseEnterTop);
      }
      if (bottomThreshold) {
        bottomThreshold.removeEventListener(
          "mouseenter",
          handleMouseEnterBottom
        );
      }
    };
  }, [
    topThresholdRef,
    bottomThresholdRef,
    setActiveIndex,
    topIndex,
    bottomIndex,
  ]);
};

export default useThreshold;
