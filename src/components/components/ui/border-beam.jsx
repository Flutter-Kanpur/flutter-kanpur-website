"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion"; // using motion here
import "../css/border-beam.css";

export function BorderBeam({
  lightWidth = 200,
  duration = 10,
  lightColor = "#13FDFD",
  borderWidth = 1,
  className = "",
  ...props
}) {
  const pathRef = useRef(null);

  const updatePath = () => {
    if (pathRef.current) {
      const div = pathRef.current;
      div.style.setProperty(
        "--path",
        `path("M 0 0 H ${div.offsetWidth} V ${div.offsetHeight} H 0 V 0")`
      );
    }
  };

  useEffect(() => {
    updatePath();
    window.addEventListener("resize", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
    };
  }, []);

  return (
    <div
      ref={pathRef}
      className={`border-beam ${className}`}
      style={{
        "--duration": `${duration}s`,
        "--border-width": `${borderWidth}px`,
        "--light-color": lightColor,
        "--light-width": `${lightWidth}px`,
      }}
      {...props}
    >
      <motion.div
        className="beam-light"
        style={{
          "--light-color": lightColor,
          "--light-width": `${lightWidth}px`,
          width: "var(--light-width)",
          offsetPath: "var(--path)",
        }}
        animate={{
          offsetDistance: ["0%", "100%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}
