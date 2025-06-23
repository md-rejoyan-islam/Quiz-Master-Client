"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { GraduationCap, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          <nav className="hidden md:block">
            <ul className="flex items-center space-x-8">
              <NavLinks />
            </ul>
          </nav>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 text-gray-600 hover:text-purple-400 "
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden absolute top-[65px] bg-slate-900/90 backdrop-blur-md left-0 w-full shadow-md"
        >
          <ul className="container mx-auto px-4 py-3 flex flex-col space-y-4 items-center">
            <NavLinks mobile={true} setIsMenuOpen={setIsMenuOpen} />
          </ul>
        </motion.nav>
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

  const isAuthenticated = false;

  const links = [
    { id: 1, name: "Home", path: "/", isActive: pathname === "/" },
    {
      id: 11,
      name: "Quizzes",
      path: "/quizzes",
      isActive: pathname === "/quizzes",
    },
    ...(isAuthenticated
      ? [
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
        ]
      : [
          {
            id: 6,
            name: "Login",
            path: "/login",
            isActive: pathname === "/login",
          },
        ]),
  ];

  return (
    <>
      {links.map((link) => (
        <motion.li
          key={link.id}
          whileHover={{ scale: 1.05 }}
          className="text-gray-300 hover:text-purple-400 transition-colors"
        >
          <Link
            href={link.path}
            className={clsx(
              link.isActive ? "text-purple-400" : "",
              mobile
                ? "sm:text-lg text-gray-300 hover:text-purple-400 transition-colors"
                : ""
            )}
            onClick={() => setIsMenuOpen && setIsMenuOpen(false)}
          >
            {link.name}
          </Link>
        </motion.li>
      ))}
      {isAuthenticated && (
        <li className="group  relative">
          <Avatar className=" hidden md:block w-9 h-9 cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="  md:absolute rounded-md z-10  top-9 md:shadow-md   -right-2  w-[200px] md:bg-slate-900/90 mdbackdrop-blur-md md:border border-purple-500/10 md:hidden md:group-hover:block transition-opacity">
            <p className="hidden md:block  text-white px-3 py-2 border-b border-purple-500 text-center">
              abc@gmail.com
            </p>
            <ul className="flex md:block flex-col items-center space-y-4 md:space-y-0">
              <motion.li
                whileHover={{ scale: 1.05 }}
                className="text-white cursor-pointer hover:text-purple-500 md:px-3 md:py-2 transition-colors"
              >
                <Link href="/profile">Profile</Link>
              </motion.li>

              <motion.li
                whileHover={{ scale: 1.05 }}
                className="text-gray-300 cursor-pointer md:px-3 md:py-2  hover:text-purple-400 transition-colors"
              >
                <Link href="/logout">Logout</Link>
              </motion.li>
            </ul>
          </div>
        </li>
      )}
    </>
  );
};
