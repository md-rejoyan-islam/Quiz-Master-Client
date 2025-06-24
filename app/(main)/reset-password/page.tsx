import AuthBodyTemplate from "@/components/auth/auth-body-template";
import ResetPasswordForm from "@/components/auth/reset-password-form";
import React from "react";
export const metadata = {
  title: "Reset Password",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const ResetPasswordPage: React.FC = () => {
  return (
    <>
      <AuthBodyTemplate>
        <ResetPasswordForm />
      </AuthBodyTemplate>
    </>
  );
};

export default ResetPasswordPage;
