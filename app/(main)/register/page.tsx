"use client";

import AuthHeader from "@/components/auth/auth-header";
import InputField from "@/components/auth/input-field";
import PasswordField from "@/components/auth/password-field";
import { motion } from "framer-motion";
import { ArrowRight, Check, Mail, User, UserPlus } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

export interface UserType {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface RegisterPageProps {
  onRegister: (user: UserType) => void;
  onShowLogin: () => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({
  onRegister,
  onShowLogin,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [acceptTerms, setAcceptTerms] = useState(false);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase, and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!acceptTerms) {
      newErrors.terms = "Please accept the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const user: UserType = {
        id: Date.now().toString(),
        email: formData.email,
        name: formData.name,
        avatar: undefined,
      };
      onRegister(user);
      setIsLoading(false);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
    <section className="py-12 min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
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
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-md w-full mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden"
        >
          {/* Header */}
          <AuthHeader
            label="Join QuizMaster"
            sublabel="Create your account and start learning today"
          />

          {/* Form */}
          <div className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <InputField
                type="text"
                error={errors.name}
                value={formData.name}
                label={"Full Name"}
                icon={
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                }
                handleInputChange={handleInputChange}
                name={"name"}
              />
              {/* Email Field */}
              <InputField
                type="email"
                error={errors.email}
                value={formData.email}
                label={"Email Address"}
                icon={
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                }
                handleInputChange={handleInputChange}
                name={"email"}
              />

              {/* Password Field */}
              <PasswordField
                value={formData.password}
                label="Password"
                handleInputChange={handleInputChange}
                error={errors.password}
                name="password"
              />
              <PasswordField
                value={formData.confirmPassword}
                label="Confirm Password"
                handleInputChange={handleInputChange}
                error={errors.confirmPassword}
                name="confirmPassword"
              />

              {/* Terms and Conditions */}
              <div>
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                        acceptTerms
                          ? "bg-purple-600 border-purple-600"
                          : "border-purple-500/30 bg-slate-700/50"
                      }`}
                    >
                      {acceptTerms && <Check className="h-3 w-3 text-white" />}
                    </div>
                  </div>
                  <div className="flex flex-col text-sm gap-2 text-white/80">
                    <p>Check this if you&apos;re registering as an admin</p>
                  </div>
                </motion.label>
                {errors.terms && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.terms}
                  </motion.p>
                )}
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    <span>Create Account</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </form>

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link href={"/login"}>
                  <motion.button
                    onClick={onShowLogin}
                    whileHover={{ scale: 1.05 }}
                    className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  >
                    Sign in here
                  </motion.button>
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RegisterPage;
