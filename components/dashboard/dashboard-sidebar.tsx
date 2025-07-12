"use client";

import { motion } from "framer-motion";

import { logout } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import clsx from "clsx";
import {
  BookOpen,
  FilePlus2,
  GraduationCap,
  Home,
  LayoutDashboard,
  LogOut,
  LucideChevronLeft,
  Menu,
  Settings,
  Trophy,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// const navItems = [
//   { icon: Home, label: "Overview", href: "/dashboard" },
//   { icon: BookOpen, label: "Quiz Sets", href: "/dashboard/quiz-management" },
//   { icon: BookOpen, label: "Leaderboard", href: "/dashboard/leaderboard" },
//   { icon: Users, label: "Users", href: "/dashboard/users" },
// ];
const navigationItems = [
  {
    id: "overview",
    label: "Overview",
    icon: LayoutDashboard,
    color: "from-blue-500 to-cyan-500",
    href: "/dashboard",
  },
  {
    id: "quizzes",
    label: "Quiz Management",
    icon: BookOpen,
    color: "from-green-500 to-emerald-500",
    href: "/dashboard/quiz-management",
  },
  {
    id: "quizz",
    label: "Create Quiz",
    icon: FilePlus2,
    color: "from-green-500 to-emerald-500",
    href: "/dashboard/quiz-management/create",
  },
  {
    id: "leaderboard",
    label: "Leaderboard",
    icon: Trophy,
    color: "from-yellow-500 to-orange-500",
    href: "/dashboard/leaderboard",
  },
  {
    id: "users",
    label: "Users",
    icon: Users,
    color: "from-purple-500 to-violet-500",
    href: "/dashboard/users",
  },
];

export default function DashboardSidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.refresh();
  };

  const sidebarContent = (
    <div className=" overflow-hidden h-full">
      <div className="flex flex-col h-full hide-scrollbar overflow-scroll">
        <div className="p-4">
          <div className="flex h-12  items-center space-x-3 mb-8">
            <div className="p-2 bg-purple-600 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>

            {!sidebarCollapsed && (
              <div className="duration-200 transition-opacity">
                <h1 className="text-xl font-bold text-white truncate">
                  Admin Panel
                </h1>
                <p className="text-sm text-gray-400 truncate">
                  QuizMaster Dashboard
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="absolute -right-3 bg-purple-800/50 hover:text-white hover:scale-105    w-[25px] h-[25px] flex items-center justify-center rounded-full  text-white/70 top-7 cursor-pointer"
          >
            <LucideChevronLeft
              className={clsx(
                sidebarCollapsed ? "rotate-180" : "",
                "p-0.5 transition-all duration-300"
              )}
            />
          </button>
        </div>
        <nav className="space-y-2 flex-1 px-3">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                href={item.href}
                key={item.id}
                className="inline-block w-full"
              >
                <motion.button
                  key={item.id}
                  // onClick={() => setCurrentPage(item.id)}
                  whileHover={{ scale: 1.02, x: 5 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full flex items-center h-12 space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg"
                      : "text-gray-300 hover:bg-slate-700/50 hover:text-white"
                  }`}
                >
                  <IconComponent className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="font-medium truncate">{item.label}</span>
                  )}
                  {isActive && !sidebarCollapsed && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                    />
                  )}
                </motion.button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 ">
          <div className=" border-t border-purple-500/20">
            <div className="space-y-2 pt-2 ">
              <Link href={"/"} className="block">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center h-12 space-x-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors"
                >
                  <Home className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && (
                    <span className="truncate">Back to Site</span>
                  )}
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleLogout}
                className="w-full flex items-center h-12 space-x-3 px-4 py-3 text-red-300 hover:text-red-200 hover:bg-red-900/20 rounded-xl transition-colors"
              >
                <LogOut className="h-5 w-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="truncate">Logout</span>}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900/50 backdrop-blur-sm border-r border-purple-500/20  shadow-md">
        <div className="flex justify-between items-center p-4">
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
          <div className="flex items-center   space-x-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="bg-slate-800/50 text-white/70 hover:bg-slate-800/40 hover:text-white transition-colors "
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className={clsx(
                  sidebarCollapsed ? "w-[76px]" : "w-64",
                  "p-0 min-h-screen overflow-scroll"
                )}
                showCross={!sidebarCollapsed}
              >
                <SheetHeader />
                <SheetTitle />
                <SheetDescription />
                {sidebarContent}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "hidden md:block  bg-slate-800/50 backdrop-blur-sm border-r border-purple-500/20 transition-all duration-300 relative z-10 h-full",
          sidebarCollapsed ? "w-[76px]" : "w-64"
        )}
      >
        {sidebarContent}
      </div>
    </>
  );
}
