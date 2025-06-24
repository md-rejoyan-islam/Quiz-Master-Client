"use client";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const AnimatedSparkles = () => {
  return (
    <motion.div
      animate={{
        rotate: [0, 360],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "linear",
      }}
      className="absolute top-4 right-4 opacity-20"
    >
      <Sparkles className="h-6 w-6 text-purple-400" />
    </motion.div>
  );
};

export default AnimatedSparkles;
