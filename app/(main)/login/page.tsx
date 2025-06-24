import AuthBodyTemplate from "@/components/auth/auth-body-template";
import LoginForm from "@/components/auth/login-form";
import React from "react";

export const metadata = {
  title: "Login",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const LoginPage: React.FC = () => {
  return (
    <>
      <AuthBodyTemplate>
        <LoginForm />
      </AuthBodyTemplate>
    </>
  );
};

export default LoginPage;
