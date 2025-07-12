import AuthBodyTemplate from "@/components/auth/auth-body-template";
import RegisterForm from "@/components/auth/register-form";

export const metadata = {
  title: "Registration",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const RegisterPage = () => {
  return (
    <AuthBodyTemplate>
      <RegisterForm />
    </AuthBodyTemplate>
  );
};

export default RegisterPage;
