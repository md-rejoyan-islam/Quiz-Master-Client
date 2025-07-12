import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { loggedInUser } from "../actions";

export const metadata = {
  title: "Quiz Master",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await loggedInUser();

  return (
    <>
      <Header user={user || null} />
      <main className="min-h-[cal(100vh-65px)]">{children}</main>
      <Footer />
    </>
  );
}
