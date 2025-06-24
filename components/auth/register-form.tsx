"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  GraduationCap,
  LogIn,
  Mail,
  User,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FormHeader from "./form-header";
import InputField from "./input-field";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isAdmin, setIsAdmin] = useState(false);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
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
    <>
      <FormHeader
        icon={<GraduationCap className="h-8 w-8 text-white" />}
        title="Join QuizMaster"
        subTitle="Create your account and start learning today"
      />

      {/* Form */}
      <div className="pt-8">
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
            showStrengthIndicator={false}
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
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isAdmin
                      ? "bg-purple-600 border-purple-600"
                      : "border-purple-500/30 bg-slate-700/50"
                  }`}
                >
                  {isAdmin && <Check className="h-3 w-3 text-white" />}
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
          <SubmitButton isLoading={isLoading}>
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link href={"/login"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in here
              </motion.button>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
