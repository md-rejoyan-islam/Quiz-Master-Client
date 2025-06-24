import AuthBodyTemplate from "@/components/auth/auth-body-template";
import ForgetPasswordForm from "@/components/auth/forget-password-form";
import React from "react";

export const metadata = {
  title: "Forgot Password",
  description: "Reset your password to regain access to your account",
};

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthBodyTemplate>
      <ForgetPasswordForm />
    </AuthBodyTemplate>
  );
};

export default ForgotPasswordPage;
