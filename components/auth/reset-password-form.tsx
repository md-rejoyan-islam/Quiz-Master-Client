"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { CheckCircle, Shield } from "lucide-react";
import FormHeader from "./form-header";
import PasswordField from "./password-field";
import SubmitButton from "./submit-button";

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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

  const onSubmit = (password: string) => {
    // Handle successful password reset logic here
    console.log("Password reset successful:", password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSubmit(formData.password);
      setIsSuccess(true);
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
      {isSuccess ? (
        <>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <CheckCircle className="h-10 w-10 text-white" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white text-center mb-4">
            Password Reset Successful!
          </h1>
          <p className="text-gray-300 text-center mb-8 leading-relaxed">
            Your password has been successfully updated. You can now sign in
            with your new password.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-sm text-gray-400 mb-6 text-center"
          >
            Redirecting to login page in 3 seconds...
          </motion.div>
        </>
      ) : (
        <>
          {/* head  */}
          <FormHeader
            icon={<Shield className="h-8 w-8 text-white" />}
            title="Reset Your Password"
            subTitle="Enter your new password below"
          />

          {/* Form */}
          <div className="pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Password Field */}
              <PasswordField
                label="New Password"
                error={errors.password}
                handleInputChange={handleInputChange}
                name="password"
                value={formData.password}
              />
              {/* Confirm Password Field */}
              <PasswordField
                label="Confirm Password"
                error={errors.confirmPassword}
                handleInputChange={handleInputChange}
                name="confirmPassword"
                value={formData.confirmPassword}
                showStrengthIndicator={false}
              />

              {/* Security Notice */}
              <div className="bg-slate-700/30 border border-purple-500/20 rounded-xl p-4">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-sm font-medium text-white mb-1">
                      Security Tips
                    </h4>
                    <ul className="text-xs text-gray-300 space-y-1">
                      <li>• Use at least 8 characters</li>
                      <li>• Include uppercase and lowercase letters</li>
                      <li>• Add numbers and special characters</li>
                      <li>• Avoid common words or personal information</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <SubmitButton isLoading={isLoading}>
                <Shield className="h-5 w-5" />
                <span>Update Password</span>
              </SubmitButton>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default ResetPasswordForm;
