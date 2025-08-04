import AuthBodyTemplate from "@/components/auth/auth-body-template";
import LoginForm from "@/components/auth/login-form";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata = {
  title: "Login",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const LoginPage = () => {
  return (
    <AuthBodyTemplate>
      <Suspense fallback={<Loading />}>
        <LoginForm />
      </Suspense>
    </AuthBodyTemplate>
  );
};

export default LoginPage;
