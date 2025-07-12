"use client";
import { motion } from "framer-motion";
import { Award, Clock, Star } from "lucide-react";
import React from "react";
const keyFeatures = [
  {
    icon: Star,
    text: "Expert-Crafted Questions",
    color: "from-yellow-400 to-orange-400",
  },
  {
    icon: Clock,
    text: "Real-Time Progress",
    color: "from-blue-400 to-cyan-400",
  },
  {
    icon: Award,
    text: "Instant Results",
    color: "from-purple-400 to-pink-400",
  },
];

const KeyFeatures: React.FC = () => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={itemVariants}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {keyFeatures.map((feature, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05, y: -2 }}
          className="text-sm sm:text-base flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-purple-500/20 shadow-sm"
        >
          <feature.icon
            className={`h-4 w-4 mr-2 text-white stroke-pink-300  `}
          />
          <span className="text-gray-300 font-medium">{feature.text}</span>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default KeyFeatures;
