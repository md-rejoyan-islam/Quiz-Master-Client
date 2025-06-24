import AuthAnimatedBackground from "@/components/auth-animated-background";
import RegisterForm from "@/components/auth/register-form";
import React from "react";

export const metadata = {
  title: "Registration",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const RegisterPage: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-transparent via-transparent to-slate-900 min-h-[calc(100vh-65px)] flex items-center justify-center relative overflow-hidden">
      <AuthAnimatedBackground />

      <RegisterForm />
    </section>
  );
};

export default RegisterPage;
