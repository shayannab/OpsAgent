import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const FallingText = ({
  text,
  highlightWords = [],
  highlightClass = "highlighted",
  trigger = "auto", // auto, scroll
  backgroundColor = "transparent",
  fontSize = "2rem",
}) => {
  const containerRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }

    if (!hasStarted && trigger === "auto") {
      setHasStarted(true);
    }

    if (trigger === "scroll") {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setHasStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      if (containerRef.current) observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger, hasStarted]);

  const words = text.split(" ");

  return (
    <div 
        ref={containerRef} 
        className="relative w-full h-full overflow-hidden"
        style={{ fontSize, backgroundColor }}
    >
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 p-10">
        {words.map((word, i) => {
          const isHighlighted = highlightWords.includes(word.replace(/[.,]/g, ""));
          
          // Generate random "physics" values
          const randomX = (Math.random() - 0.5) * 40; // Slight horizontal drift
          const randomRotate = (Math.random() - 0.5) * 60; // Random rotation
          const delay = i * 0.05;

          return (
            <motion.div
              key={i}
              initial={{ y: -500, opacity: 0, rotate: 0 }}
              animate={hasStarted ? { 
                y: 0, 
                opacity: 1, 
                rotate: randomRotate,
                x: randomX,
              } : {}}
              transition={{ 
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: delay,
                duration: 0.8
              }}
              whileHover={{ scale: 1.2, rotate: 0, zIndex: 50 }}
              className={`inline-block cursor-default select-none
                ${isHighlighted ? highlightClass : 'text-slate-500/60'}
              `}
            >
              {word}
            </motion.div>
          );
        })}
      </div>
      
      {/* Decorative floor glow */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
    </div>
  );
};

export default FallingText;
