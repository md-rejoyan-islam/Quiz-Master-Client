import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { ThemeProvider } from "@/components/ThemeContext";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "QuizMaster - Test Your Knowledge",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <body
          className={`${inter.className} antialiased min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300`}
        >
          <Header />
          <main
            className="
          min-h-[calc(100vh-136px)]
          "
          >
            {children}
          </main>
          <Footer />
        </body>
      </ThemeProvider>
    </html>
  );
}
