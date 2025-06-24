"use client";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, LogIn, Mail, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import FormHeader from "./form-header";
import InputField from "./input-field";
import PasswordField from "./password-field";
import RoleTypeSelect from "./role-type-select";
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

  const [loginType, setLoginType] = useState<"user" | "admin">("user");

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

      <RoleTypeSelect loginType={loginType} setLoginType={setLoginType} />

      {/* Form */}
      <div className="">
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
            placeholder="Enter your full name"
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
            placeholder="Enter your email address"
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

          {/* Submit Button */}
          <SubmitButton isLoading={isLoading}>
            <LogIn className="h-5 w-5 " />
            <span className="capitalize">Create {loginType} Account</span>
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
