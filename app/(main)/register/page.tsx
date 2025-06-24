import AuthBodyTemplate from "@/components/auth/auth-body-template";
import RegisterForm from "@/components/auth/register-form";
import React from "react";

export const metadata = {
  title: "Registration",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const RegisterPage: React.FC = () => {
  return (
    <AuthBodyTemplate>
      <RegisterForm />
    </AuthBodyTemplate>
  );
};

export default RegisterPage;
