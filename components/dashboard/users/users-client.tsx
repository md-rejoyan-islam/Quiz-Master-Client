"use client";

import { motion } from "framer-motion";

import { useState } from "react";

import { USER } from "@/lib/types";
import { banUser, deleteUser, unbanUser } from "@/query/users";
import {
  Ban,
  BookOpen,
  Calendar,
  Eye,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  Trash2,
  Trophy,
  UserCheck,
  Users,
  UserX,
  XCircle,
} from "lucide-react";
import { toast } from "react-toastify";

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role?: "user" | "admin";
  isActive?: boolean;
  joinedAt?: string;
  lastActive?: string;
  quizzesCompleted?: number;
  averageScore?: number;
}

export default function DashboardUserClient({
  data,
  token,
}: {
  data: {
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalItems: number;
    };
    users: USER[];
  } | null;
  token?: string | null;
}) {
  const stats = [
    {
      title: "Total Users",
      value: data?.pagination?.totalItems || 0,
      icon: Users,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Active Users",
      value:
        data?.users?.filter(
          (user) => user.status.toLocaleLowerCase() === "active"
        ).length || 0,
      icon: UserCheck,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Inactive Users",
      value:
        data?.users?.filter(
          (user) => user.status.toLocaleLowerCase() === "inactive"
        ).length || 0,
      icon: UserX,
      color: "from-red-500 to-pink-500",
    },
    {
      title: "Admins",
      value:
        data?.users?.filter((user) => user.role.toLocaleLowerCase() === "admin")
          .length || 0,
      icon: Shield,
      color: "from-purple-500 to-violet-500",
    },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<USER | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock users data
  const [users, setUsers] = useState<USER[]>(data?.users || []);

  const statusFilters = [
    { value: "all", label: "All Users" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  const roleFilters = [
    { value: "all", label: "All Roles" },
    { value: "user", label: "Users" },
    { value: "admin", label: "Admins" },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" &&
        user.status.toLocaleLowerCase() === "active") ||
      (statusFilter === "inactive" &&
        user.status.toLocaleLowerCase() === "inactive");
    const matchesRole =
      roleFilter === "all" || user.role.toLocaleLowerCase() === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleBanUser = async (userId: string) => {
    const response = await banUser(userId, token);

    if (!response.status) {
      return toast.error(response.error || "Failed to ban user");
    }
    toast.success("User banned successfully");
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "INACTIVE" } : user
      )
    );
  };

  const handleUnbanUser = async (userId: string) => {
    const response = await unbanUser(userId, token);
    if (!response.status) {
      return toast.error(response.error || "Failed to unban user");
    }
    toast.success("User unbanned successfully");

    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: "ACTIVE" } : user
      )
    );
  };

  const handleDeleteUser = async (userId: string) => {
    const response = await deleteUser(userId, token);
    if (!response.status) {
      return toast.error(response.error || "Failed to delete user");
    }
    toast.success("User deleted successfully");

    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleViewUser = (user: USER) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getStatusColor = (user: USER) => {
    if (user.status.toLocaleLowerCase() === "active")
      return "bg-red-900/50 text-red-300 border-red-500/30";
    return "bg-green-900/50 text-green-300 border-green-500/30";
  };

  const getStatusText = (user: USER) => {
    if (user.status.toLocaleLowerCase() === "inactive") return "Inactive";
    return "Active";
  };

  const getRoleColor = (role: string) => {
    if (role.toLocaleLowerCase() === "admin")
      return "bg-purple-900/50 text-purple-300 border-purple-500/30";
    return "bg-blue-900/50 text-blue-300 border-blue-500/30";
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <div className="px-8 py-6 space-y-4">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 relative overflow-hidden group"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-2 right-2 opacity-20"
                >
                  <Sparkles className="h-4 w-4 text-purple-400" />
                </motion.div>

                <div className="flex items-center space-x-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      {stat.value}
                    </h3>
                    <p className="text-gray-400 text-sm">{stat.title}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {statusFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {roleFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Users Table */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden"
        >
          <div className="p-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">
              All Users ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Joined
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                    className="hover:bg-purple-500/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {user.fullName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {user.fullName}
                          </h4>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                          user?.role.toLocaleLowerCase() || "user"
                        )}`}
                      >
                        {user.role.toLowerCase() === "admin" ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          user
                        )}`}
                      >
                        {getStatusText(user)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        <span className="text-white text-sm">
                          {new Date(user.createdAt || "").toLocaleDateString()}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-3 w-3 text-purple-400" />
                          <span className="text-xs text-gray-300">
                            {10} quizzes
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-gray-300">
                            {50}% avg
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <motion.button
                          onClick={() => handleViewUser(user)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>

                        {user.status.toLocaleLowerCase() === "active" ? (
                          <motion.button
                            onClick={() => handleBanUser(user.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
                            title="Ban User"
                          >
                            <Ban className="h-4 w-4" />
                          </motion.button>
                        ) : (
                          <motion.button
                            onClick={() => handleUnbanUser(user.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                            title="Unban User"
                          >
                            <UserCheck className="h-4 w-4" />
                          </motion.button>
                        )}

                        <motion.button
                          onClick={() => handleDeleteUser(user.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                          title="Delete User"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* User Details Modal */}
        {showUserModal && selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-800 rounded-3xl shadow-2xl border border-purple-500/20 w-full max-w-2xl max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">
                      {selectedUser.fullName.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedUser.fullName}
                    </h2>
                    <p className="text-gray-400">{selectedUser.email}</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowUserModal(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <XCircle className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[60vh]">
                {/* Status and Role */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Status
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                        selectedUser
                      )}`}
                    >
                      {getStatusText(selectedUser)}
                    </span>
                  </div>
                  <div className="bg-slate-700/30 rounded-xl p-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">
                      Role
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium border ${getRoleColor(
                        selectedUser?.role || "user"
                      )}`}
                    >
                      {selectedUser.role?.toLocaleLowerCase() === "admin"
                        ? "Admin"
                        : "User"}
                    </span>
                  </div>
                </div>

                {/* Account Info */}
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Calendar className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-sm text-gray-400">Joined</p>
                        <p className="text-white">
                          {new Date(
                            selectedUser.createdAt || ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Performance
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <BookOpen className="h-5 w-5 text-purple-400" />
                        <span className="text-2xl font-bold text-white">
                          {10}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Quizzes Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="h-5 w-5 text-green-400" />
                        <span className="text-2xl font-bold text-white">
                          {50}%
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Average Score</p>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-slate-700/30 rounded-xl p-4">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Recent Activity
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-slate-600/30 rounded-lg">
                      <Trophy className="h-5 w-5 text-yellow-400" />
                      <div>
                        <p className="text-white text-sm">
                          Completed &quot;Advanced Mathematics&quot; quiz
                        </p>
                        <p className="text-gray-400 text-xs">
                          Score: 95% • 2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-600/30 rounded-lg">
                      <Star className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white text-sm">
                          Achieved &quot;Quiz Master&quot; badge
                        </p>
                        <p className="text-gray-400 text-xs">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-600/30 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-white text-sm">
                          Started &quot;Science Fundamentals&quot; quiz
                        </p>
                        <p className="text-gray-400 text-xs">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-purple-500/20 bg-slate-900/50">
                {selectedUser.status.toLocaleLowerCase() === "active" ? (
                  <motion.button
                    onClick={() => {
                      handleBanUser(selectedUser.id);
                      setShowUserModal(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <Ban className="h-4 w-4" />
                    <span>Ban User</span>
                  </motion.button>
                ) : (
                  <motion.button
                    onClick={() => {
                      handleUnbanUser(selectedUser.id);
                      setShowUserModal(false);
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <UserCheck className="h-4 w-4" />
                    <span>Unban User</span>
                  </motion.button>
                )}

                <motion.button
                  onClick={() => {
                    handleDeleteUser(selectedUser.id);
                    setShowUserModal(false);
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete User</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-12 border border-purple-500/20 backdrop-blur-sm">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No Users Found
              </h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                No users match your current search and filter criteria.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
