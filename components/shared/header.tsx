"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const { theme, toggleTheme } = useTheme();
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900/90 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href={"/"}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors"
              >
                <GraduationCap className="h-6 w-6" />
              </motion.div>
              <span className="text-xl font-bold text-white">QuizMaster</span>
            </motion.button>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLinks />
          </nav>
          <div className="md:hidden flex items-center">
            {/* <ThemeToggle theme={theme} toggleTheme={toggleTheme} /> */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 text-gray-600 dark:text-gray-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-[65px] bg-slate-900/90 backdrop-blur-md left-0 w-full shadow-md"
        >
          <ul className="container mx-auto px-4 py-2 flex flex-col space-y-3 items-center">
            <NavLinks mobile={true} setIsMenuOpen={setIsMenuOpen} />
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
};

export default Header;

const NavLinks: React.FC<{
  mobile?: boolean;
  setIsMenuOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ mobile, setIsMenuOpen }) => {
  const pathname = usePathname();

  const links = [
    { id: 1, name: "Home", path: "/", isActive: pathname === "/" },
    {
      id: 11,
      name: "Quizzes",
      path: "/quizzes",
      isActive: pathname === "/quizzes",
    },
    {
      id: 2,
      name: "Leaderboard",
      path: "/leaderboard",
      isActive: pathname === "/leaderboard",
    },
    {
      id: 3,
      name: "Performance",
      path: "/performance",
      isActive: pathname === "/performance",
    },
    {
      id: 4,
      name: "Profile",
      path: "/profile",
      isActive: pathname === "/profile",
    },
    { id: 5, name: "Login", path: "/login", isActive: pathname === "/login" },
  ];

  return (
    <>
      {links.map((link) => (
        // <Link
        //   key={link.id}
        //   href={link.path}
        //   className={clsx(
        //     link.isActive
        //       ? "text-blue-600 dark:text-blue-400"
        //       : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 block py-2",
        //     mobile ? "text-lg" : ""
        //   )}
        //   onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
        // >
        //   {link.name}
        //   </Link>
        <motion.span
          key={link.id}
          whileHover={{ scale: 1.05 }}
          className="text-gray-300 hover:text-purple-400 transition-colors"
        >
          <Link
            href={link.path}
            className={clsx(
              link.isActive ? "text-purple-400" : "",
              mobile
                ? "text-lg text-gray-300 hover:text-purple-400 transition-colors"
                : ""
            )}
            onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        </motion.span>
      ))}
    </>
  );
};
