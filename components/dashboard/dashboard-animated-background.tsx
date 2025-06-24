"use client";
import { motion } from "framer-motion";

const DashboardAnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-20 left-10 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
      />
    </div>
  );
};

export default DashboardAnimatedBackground;
