"use client";

import { motion } from "framer-motion";

const BadgeBtn = ({ icon, text }: { icon?: React.ReactNode; text: string }) => {
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
      whileHover={{ scale: 1.05 }}
      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-full text-purple-300 text-sm font-medium mb-8 border border-purple-500/30 shadow-lg backdrop-blur-sm"
    >
      {icon && <div>{icon}</div>}

      <span className="bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-[11px] text-transparent font-semibold">
        {text}
      </span>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
    </motion.div>
  );
};

export default BadgeBtn;
