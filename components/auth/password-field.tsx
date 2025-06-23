"use client";

import { motion } from "framer-motion";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

const PasswordField = ({
  value,
  label,
  handleInputChange,
  error,
  name,
}: {
  value: string;
  label: string;
  error: string;
  name: string;
  handleInputChange: (field: string, value: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const getPasswordStrength = () => {
    const password = value;
    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;

    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return "Weak";
    if (strength <= 3) return "Medium";
    return "Strong";
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <motion.input
          whileFocus={{ scale: 1.02 }}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => handleInputChange(name, e.target.value)}
          className={`w-full pl-10 pr-12 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
            error ? "border-red-500" : "border-purple-500/30"
          }`}
          placeholder="Create a strong password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Password Strength Indicator */}
      {value && name !== "confirmPassword" && (
        <div className="mt-2">
          <div className="flex items-center space-x-2">
            <div className="flex-1 bg-slate-600 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${(getPasswordStrength() / 5) * 100}%`,
                }}
                className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(
                  getPasswordStrength()
                )}`}
              />
            </div>
            <span
              className={`text-xs font-medium ${
                getPasswordStrength() <= 2
                  ? "text-red-400"
                  : getPasswordStrength() <= 3
                  ? "text-yellow-400"
                  : "text-green-400"
              }`}
            >
              {getStrengthText(getPasswordStrength())}
            </span>
          </div>
        </div>
      )}

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

export default PasswordField;
