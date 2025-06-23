"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const InputField = ({
  icon,
  handleInputChange,
  error,
  type,
  value,
  label,
  name,
}: {
  icon: ReactNode;
  error: string;
  type: string;
  value: string;
  label: string;
  name: string;
  handleInputChange: (field: string, value: string) => void;
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        {icon}
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type={type}
          value={value}
          onChange={(e) => handleInputChange(name, e.target.value)}
          className={`w-full pl-10 pr-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
            error ? "border-red-500" : "border-purple-500/30"
          }`}
          placeholder="Enter your full name"
        />
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-red-400 text-sm mt-1"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
};

export default InputField;
