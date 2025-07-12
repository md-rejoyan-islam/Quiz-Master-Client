import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz Master",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 transition-colors duration-300`}
      >
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
