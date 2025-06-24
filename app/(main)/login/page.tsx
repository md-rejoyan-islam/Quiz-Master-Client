import AuthAnimatedBackground from "@/components/auth-animated-background";
import LoginForm from "@/components/auth/login-form";
import React from "react";

export const metadata = {
  title: "Login",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const LoginPage: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-transparent via-transparent to-slate-900 min-h-[calc(100vh-65px)] flex items-center justify-center relative overflow-hidden">
      <AuthAnimatedBackground />

      <LoginForm />
    </section>
  );
};

export default LoginPage;
