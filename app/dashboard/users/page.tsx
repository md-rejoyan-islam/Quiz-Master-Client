"use client";

import { motion } from "framer-motion";

import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import { useState } from "react";

import {
  Ban,
  BookOpen,
  Calendar,
  Clock,
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

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex.johnson@email.com",
      role: "user",
      isActive: true,
      joinedAt: "2024-01-15",
      lastActive: "2024-02-10",
      quizzesCompleted: 45,
      averageScore: 89.2,
    },
    {
      id: "2",
      name: "Sarah Chen",
      email: "sarah.chen@email.com",
      role: "user",
      isActive: true,
      joinedAt: "2024-01-20",
      lastActive: "2024-02-09",
      quizzesCompleted: 42,
      averageScore: 87.8,
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      email: "mike.rodriguez@email.com",
      role: "admin",
      isActive: true,
      joinedAt: "2024-01-10",
      lastActive: "2024-02-10",
      quizzesCompleted: 38,
      averageScore: 91.5,
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily.davis@email.com",
      role: "user",
      isActive: false,
      joinedAt: "2024-01-25",
      lastActive: "2024-02-05",
      quizzesCompleted: 41,
      averageScore: 85.3,
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david.wilson@email.com",
      role: "user",
      isActive: true,
      joinedAt: "2024-02-01",
      lastActive: "2024-02-10",
      quizzesCompleted: 39,
      averageScore: 88.7,
    },
    {
      id: "6",
      name: "Lisa Thompson",
      email: "lisa.thompson@email.com",
      role: "user",
      isActive: true,
      joinedAt: "2024-01-30",
      lastActive: "2024-02-08",
      quizzesCompleted: 36,
      averageScore: 86.9,
    },
  ]);

  const statusFilters = [
    { value: "all", label: "All Users" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "banned", label: "Banned" },
  ];

  const roleFilters = [
    { value: "all", label: "All Roles" },
    { value: "user", label: "Users" },
    { value: "admin", label: "Admins" },
  ];

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && user.isActive) ||
      (statusFilter === "inactive" && !user.isActive);
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleBanUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: false } : user
      )
    );
  };

  const handleUnbanUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isActive: true } : user
      )
    );
  };

  const handleDeleteUser = (userId: string) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const getStatusColor = (user: User) => {
    if (!user.isActive) return "bg-red-900/50 text-red-300 border-red-500/30";
    return "bg-green-900/50 text-green-300 border-green-500/30";
  };

  const getStatusText = (user: User) => {
    if (!user.isActive) return "Inactive";
    return "Active";
  };

  const getRoleColor = (role: string) => {
    if (role === "admin")
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
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <>
      <DashboardPageHeader
        label="User Management"
        description="Manage user accounts"
      />
      <div className="px-8 py-6 space-y-4">
        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            {
              title: "Total Users",
              value: users.length,
              icon: Users,
              color: "from-blue-500 to-cyan-500",
            },
            {
              title: "Active Users",
              value: users.filter((u) => u.isActive).length,
              icon: UserCheck,
              color: "from-green-500 to-emerald-500",
            },
            {
              title: "Inactive Users",
              value: users.filter((u) => !u.isActive).length,
              icon: UserX,
              color: "from-red-500 to-pink-500",
            },
            {
              title: "Admins",
              value: users.filter((u) => u.role === "admin").length,
              icon: Shield,
              color: "from-purple-500 to-violet-500",
            },
          ].map((stat, index) => {
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
                    Last Active
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
                            {user.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {user.name}
                          </h4>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleColor(
                          user?.role!
                        )}`}
                      >
                        {user.role === "admin" ? "Admin" : "User"}
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
                          {new Date(user.joinedAt || "").toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-white text-sm">
                          {new Date(user.lastActive || "").toLocaleDateString()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <BookOpen className="h-3 w-3 text-purple-400" />
                          <span className="text-xs text-gray-300">
                            {user.quizzesCompleted} quizzes
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Target className="h-3 w-3 text-green-400" />
                          <span className="text-xs text-gray-300">
                            {user.averageScore}% avg
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

                        {user.isActive ? (
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
                      {selectedUser.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">
                      {selectedUser.name}
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
                        selectedUser?.role!
                      )}`}
                    >
                      {selectedUser.role === "admin" ? "Administrator" : "User"}
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
                            selectedUser.joinedAt || ""
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-sm text-gray-400">Last Active</p>
                        <p className="text-white">
                          {new Date(
                            selectedUser.lastActive || ""
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
                          {selectedUser.quizzesCompleted}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">Quizzes Completed</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <Target className="h-5 w-5 text-green-400" />
                        <span className="text-2xl font-bold text-white">
                          {selectedUser.averageScore}%
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
                          Completed "Advanced Mathematics" quiz
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
                          Achieved "Quiz Master" badge
                        </p>
                        <p className="text-gray-400 text-xs">1 day ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-slate-600/30 rounded-lg">
                      <BookOpen className="h-5 w-5 text-blue-400" />
                      <div>
                        <p className="text-white text-sm">
                          Started "Science Fundamentals" quiz
                        </p>
                        <p className="text-gray-400 text-xs">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex items-center justify-end space-x-3 p-6 border-t border-purple-500/20 bg-slate-900/50">
                {selectedUser.isActive ? (
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
