"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import AnimatedSparkles from "./animated-sparkles";

const FormHeader = ({
  title,
  subTitle,
  icon,
}: {
  title: string;
  subTitle: string;
  icon: ReactNode;
}) => {
  return (
    <div className="text-center">
      <AnimatedSparkles />

      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
      >
        {icon}
      </motion.div>

      <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
      <p className="text-gray-300">{subTitle}</p>
    </div>
  );
};

export default FormHeader;
