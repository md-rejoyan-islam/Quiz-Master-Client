"use client";
import { login } from "@/app/actions";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import FormHeader from "./form-header";
import InputField from "./input-field";
import PasswordField from "./password-field";
import RoleTypeSelect from "./role-type-select";
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
  const [loginType, setLoginType] = useState<"user" | "admin">("user");

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

  const router = useRouter();
  const searchParams = useSearchParams();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    const { success, error } = await login({
      email: formData.email,
      password: formData.password,
      role: loginType,
    });

    if (!success) {
      toast.error(error || "Login failed. Please try again.");
    } else {
      const from = searchParams.get("from");
      console.log(from);

      const isAdmin = loginType === "admin";
      const redirectUrl = isAdmin ? "/dashboard" : "/leaderboard";
      router.push(from || redirectUrl);
    }
    setIsLoading(false);
  };
  return (
    <>
      {/* Header */}
      <FormHeader
        icon={<GraduationCap className="h-8 w-8 text-white" />}
        title="Welcome Back!"
        subTitle="Sign in to continue your learning journey"
      />

      <RoleTypeSelect loginType={loginType} setLoginType={setLoginType} />

      {/* Form */}
      <div className="">
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
            placeholder={
              loginType === "user"
                ? "Enter your email address"
                : "admin@gmail.com"
            }
          />

          <PasswordField
            value={formData.password}
            label="Password"
            handleInputChange={handleInputChange}
            error={errors.password}
            name="password"
            showStrengthIndicator={false}
            placeholder="Enter your password"
          />

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
          <SubmitButton isLoading={isLoading}>
            <LogIn className="h-5 w-5 capitalize" />
            <span>Sign In as {loginType}</span>
            <ArrowRight className="h-4 w-4" />
          </SubmitButton>
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
    </>
  );
};

export default LoginForm;
