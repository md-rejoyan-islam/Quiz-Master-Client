"use client";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import AuthHeader from "./auth-header";
import InputField from "./input-field";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
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
      //   const user: User = {
      //     id: "1",
      //     email: formData.email,
      //     name: formData.email.split("@")[0],
      //     avatar: undefined,
      //   };
      // onLogin(user);
      setIsLoading(false);
    }, 1500);
  };
  return (
    <div className="max-w-md w-full mx-auto px-4 relative">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-slate-800/50 backdrop-blur-sm rounded-3xl shadow-2xl border border-purple-500/20 overflow-hidden"
      >
        {/* Header */}
        <AuthHeader
          label="Welcome Back!"
          sublabel="Sign in to continue your learning journey"
        />

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <PasswordField
              value={formData.password}
              label="Password"
              handleInputChange={handleInputChange}
              error={errors.password}
              name="password"
              showStrengthIndicator={false}
            />

            <div className="flex items-center gap-3">
              <Checkbox
                id="terms"
                className="border-white/80 data-[state=checked]:border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white dark:data-[state=checked]:border-purple-700 dark:data-[state=checked]:bg-purple-700
                "
              />
              <Label htmlFor="terms" className="text-white/80">
                Check this if you&apos;re logging in as an admin
              </Label>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link href={"/forgot-password"}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  className="text-purple-400 hover:text-purple-300 text-sm font-medium transition-colors"
                >
                  Forgot your password?
                </motion.button>
              </Link>
            </div>

            {/* Submit Button */}
            <SubmitButton isLoading={isLoading} />
          </form>

          {/* Register Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-400">
              Don&apos;t have an account?{" "}
              <Link href={"/register"}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
                >
                  Create one now
                </motion.button>
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
