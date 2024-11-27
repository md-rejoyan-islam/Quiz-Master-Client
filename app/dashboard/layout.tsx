"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

import DashboardSidebar from "@/components/dashboard-sidebar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex h-screen">
      <DashboardSidebar />
      <motion.div
        className="flex-1 overflow-auto mt-[70px] md:mt-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-6">{children}</div>
      </motion.div>
    </main>
  );
}
