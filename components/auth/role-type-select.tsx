"use client";
import { motion } from "framer-motion";
import { Shield, UserCheck } from "lucide-react";

const RoleTypeSelect = ({
  loginType,
  setLoginType,
}: {
  loginType: "user" | "admin";
  setLoginType: (type: "user" | "admin") => void;
}) => {
  return (
    <div className="my-6">
      <div className="flex bg-slate-700/50 rounded-xl p-1">
        <motion.button
          type="button"
          onClick={() => setLoginType("user")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            loginType === "user"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <UserCheck className="h-4 w-4" />
          <span>User Login</span>
        </motion.button>
        <motion.button
          type="button"
          onClick={() => setLoginType("admin")}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
            loginType === "admin"
              ? "bg-purple-600 text-white shadow-lg"
              : "text-gray-300 hover:text-white"
          }`}
        >
          <Shield className="h-4 w-4" />
          <span>Admin Login</span>
        </motion.button>
      </div>
    </div>
  );
};

export default RoleTypeSelect;
