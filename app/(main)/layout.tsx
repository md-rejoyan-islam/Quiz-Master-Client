import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";

export const metadata = {
  title: "Quiz Master",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-136px)]">{children}</main>
      <Footer />
    </>
  );
}
