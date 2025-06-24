"use client";
import { motion } from "framer-motion";
import { Bell, Search, Settings } from "lucide-react";

const DashboardPageHeader = ({
  label,
  description,
}: {
  label: string;
  description: string;
}) => {
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden md:block bg-slate-800/30 backdrop-blur-sm border-b border-purple-500/20 px-8 py-4"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white capitalize">{label}</h1>
          <p className="text-gray-400">{description}</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
            />
          </div>

          {/* Notifications */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative p-2 bg-slate-700/50 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>

          {/* Settings */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 bg-slate-700/50 rounded-lg text-gray-400 hover:text-white transition-colors"
          >
            <Settings className="h-5 w-5" />
          </motion.button>
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardPageHeader;
