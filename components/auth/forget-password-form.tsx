"use client";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle,
  GraduationCap,
  Mail,
  Send,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import InputField from "./input-field";
import SubmitButton from "./submit-button";

const ForgetPasswordForm = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === "email") {
      setEmail(value);
    }
    if (error) {
      setError("");
    }
  };

  const onSubmit = (email: string) => {
    // Handle the email submission logic here
    console.log("Email submitted:", email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(email);
      setIsSubmitted(true);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <>
      {isSubmitted ? (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Check Your Email
          </h1>
          <p className="text-gray-300 mb-6 leading-relaxed">
            We&apos;ve sent a password reset link to{" "}
            <span className="text-purple-400 font-medium">{email}</span>
          </p>
          <p className="text-sm text-gray-400 mb-8">
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>

          <div className="space-y-4">
            <motion.button
              onClick={() => setIsSubmitted(false)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg"
            >
              Send Another Email
            </motion.button>

            <Link href={"/login"} className="block">
              <motion.button
                // onClick={onShowLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 border-2 border-purple-500/50 text-purple-300 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-200 hover:bg-purple-900/20 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Login</span>
              </motion.button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className=" text-center relative">
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

            <h1 className="text-3xl font-bold text-white mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-300">
              No worries! Enter your email and we&apos;ll send you a reset link
            </p>
          </div>

          {/* Form */}
          <div className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <InputField
                type="text"
                icon={
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                }
                label="Email Address"
                name="email"
                value={email}
                error={error}
                handleInputChange={handleInputChange}
                placeholder="Enter your email address"
              />

              {/* Submit Button */}
              <SubmitButton isLoading={isLoading}>
                <Send className="h-5 w-5" />
                <span>Send Reset Link</span>
              </SubmitButton>
            </form>

            {/* Back to Login */}
            <div className="mt-8 text-center">
              <Link href={"/login"}>
                <motion.button
                  // onClick={onShowLogin}
                  whileHover={{ scale: 1.05 }}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors flex items-center justify-center space-x-2 mx-auto"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Login</span>
                </motion.button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ForgetPasswordForm;
