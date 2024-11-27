"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { cn } from "@/lib/utils";
import { BookOpen, Home, LogOut, Menu, Moon, Sun, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useTheme } from "./ThemeContext";

const navItems = [
  { icon: Home, label: "Overview", href: "/dashboard" },
  { icon: BookOpen, label: "Quiz Sets", href: "/dashboard/quiz-sets" },
  { icon: BookOpen, label: "Leaderboard", href: "/dashboard/leaderboard" },
  { icon: Users, label: "Users", href: "/dashboard/users" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const { theme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = useState(false);

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quiz Admin
        </h1>
      </div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setIsOpen(false)}
          >
            <span
              className={cn(
                "flex items-center px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                pathname === item.href && "bg-gray-200 dark:bg-gray-700"
              )}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </span>
          </Link>
        ))}
      </nav>
      <div className="p-4 space-y-2">
        <Button
          variant="ghost"
          className="w-full bg-gray-200 dark:bg-gray-900/40 text-gray-600 hover:text-gray-700 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-900/30"
          onClick={toggleTheme}
        >
          Dark Mode
          {theme === "dark" ? (
            <Sun className="ml-2 h-4 w-4" />
          ) : (
            <Moon className="ml-2 h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          className="w-full bg-red-100 dark:bg-red-900/40  text-red-600 hover:text-red-700 hover:bg-red-200 dark:text-red-400 dark:hover:bg-red-900/30"
        >
          <LogOut className="mr-2 h-4 w-4" /> Log out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            QuizMaster
          </h1>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader />
                <SheetTitle />
                <SheetDescription />
                {sidebarContent}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className="hidden md:block w-64 bg-white dark:bg-gray-800 h-full">
        {sidebarContent}
      </div>
    </>
  );
}
