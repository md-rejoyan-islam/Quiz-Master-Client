"use client";
import { motion } from "framer-motion";
import { GraduationCap, Sparkles } from "lucide-react";

const AuthHeader = ({
  label,
  sublabel,
}: {
  label: string;
  sublabel: string;
}) => {
  return (
    <div className="px-8 pt-8 pb-6 text-center relative">
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

      <motion.div
        whileHover={{ scale: 1.1, rotate: 360 }}
        transition={{ duration: 0.6 }}
        className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
      >
        <GraduationCap className="h-8 w-8 text-white" />
      </motion.div>

      <h1 className="text-3xl font-bold text-white mb-2">{label}</h1>
      <p className="text-gray-300">{sublabel}</p>
    </div>
  );
};

export default AuthHeader;
