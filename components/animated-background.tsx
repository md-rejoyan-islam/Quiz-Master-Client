"use client";
import { motion } from "framer-motion";

const AnimatedBackground = ({
  scale,
  rotate,
  duration,
  className,
}: {
  scale: number[];
  rotate: number[];
  duration: number;
  className?: string;
}) => {
  return (
    <motion.div
      animate={{
        scale,
        rotate,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "linear",
      }}
      className={`absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl ${className}`}
    />
  );
};

export default AnimatedBackground;
