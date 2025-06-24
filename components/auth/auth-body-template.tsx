"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import AuthAnimatedBackground from "../auth-animated-background";

const AuthBodyTemplate = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={clsx(
        "py-12 bg-gradient-to-b from-transparent via-transparent to-slate-900 min-h-[calc(100vh-65px)] flex items-center justify-center relative overflow-hidden",
        className
      )}
    >
      {/* Animated Background Elements */}
      <AuthAnimatedBackground />

      <div className="max-w-md w-full mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm px-8 py-8 rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default AuthBodyTemplate;
