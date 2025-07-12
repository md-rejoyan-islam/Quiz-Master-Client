"use client";

import {
  Activity,
  ArrowDown,
  ArrowUp,
  Award,
  BookOpen,
  Clock,
  Eye,
  Globe,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
  Zap,
} from "lucide-react";

const recentActivity = [
  {
    id: 1,
    type: "quiz_created",
    title: 'New quiz "Advanced Mathematics" created',
    user: "John Doe",
    time: "2 minutes ago",
    icon: BookOpen,
    color: "text-green-400",
  },
  {
    id: 2,
    type: "user_registered",
    title: "New user registered",
    user: "Jane Smith",
    time: "5 minutes ago",
    icon: Users,
    color: "text-blue-400",
  },
  {
    id: 3,
    type: "quiz_completed",
    title: "Quiz completed with 95% score",
    user: "Mike Johnson",
    time: "8 minutes ago",
    icon: Trophy,
    color: "text-yellow-400",
  },
  {
    id: 4,
    type: "achievement",
    title: 'User earned "Quiz Master" badge',
    user: "Sarah Wilson",
    time: "12 minutes ago",
    icon: Award,
    color: "text-purple-400",
  },
];

import { motion } from "framer-motion";

const topQuizzes = [
  { id: 1, title: "JavaScript Fundamentals", completions: 1247, rating: 4.8 },
  { id: 2, title: "React Basics", completions: 1156, rating: 4.7 },
  { id: 3, title: "Python for Beginners", completions: 1089, rating: 4.9 },
  { id: 4, title: "Data Structures", completions: 987, rating: 4.6 },
  { id: 5, title: "Web Development", completions: 876, rating: 4.8 },
];

export default function DashboardOverview({
  summary,
}: {
  summary: {
    totalUsers: number;
    activeQuizzes: number;
    completedQuizzes: number;
    averageScore: number;
  };
}) {
  const stats = [
    {
      id: 1,
      title: "Total Users",
      value: summary.totalUsers,
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/20 to-cyan-900/20",
    },
    {
      id: 2,
      title: "Active Quizzes",
      value: summary.activeQuizzes,
      change: "+8.2%",
      trend: "up",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-900/20 to-emerald-900/20",
    },
    {
      id: 3,
      title: "Quiz Completions",
      value: summary.completedQuizzes,
      change: "+23.1%",
      trend: "up",
      icon: Trophy,
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-900/20 to-violet-900/20",
    },
    {
      id: 4,
      title: "Average Score",
      value: `${summary.averageScore}%`,
      icon: Target,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20",
    },
  ];

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
      <div className="px-8 py-8">
        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 pb-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                className={`bg-gradient-to-br ${stat.bgColor} rounded-2xl p-6 border border-purple-500/20 backdrop-blur-sm hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden group`}
              >
                {/* Background Decoration */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"
                />

                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotateY: 180,
                    }}
                    transition={{ duration: 0.6 }}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </motion.div>

                  <div
                    className={`flex items-center space-x-1 text-sm font-medium ${
                      stat.trend === "up" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <ArrowUp className="h-4 w-4" />
                    ) : (
                      <ArrowDown className="h-4 w-4" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-300 text-sm group-hover:text-gray-200 transition-colors">
                    {stat.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 pb-6 lg:grid-cols-3 gap-8">
          {/* Top Performing Quizzes */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-slate-800/50 backdrop-blur-sm lg:col-span-2  rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Top Performing Quizzes
                </h3>
                <p className="text-gray-400">
                  Most popular quizzes by completion rate
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>View All</span>
              </motion.button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {topQuizzes.map((quiz, index) => (
                <motion.div
                  key={quiz.id}
                  whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    z: 50,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                  }}
                  className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 group relative overflow-hidden"
                >
                  {/* Rank Badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Background Sparkle */}
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
                    className="absolute top-1 left-1 opacity-20"
                  >
                    <Sparkles className="h-4 w-4 text-purple-400" />
                  </motion.div>

                  <div className="mb-3">
                    <h4 className="font-semibold text-white text-sm mb-2 group-hover:text-purple-300 transition-colors">
                      {quiz.title}
                    </h4>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <Users className="h-3 w-3" />
                      <span>{quiz.completions.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3 text-yellow-400 fill-current" />
                      <span className="text-xs font-medium text-gray-300">
                        {quiz.rating}
                      </span>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="p-1 bg-purple-600/20 rounded-full"
                    >
                      <Zap className="h-3 w-3 text-purple-400" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-purple-400 hover:text-purple-300 text-sm font-medium"
              >
                View All
              </motion.button>
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <motion.div
                    key={activity.id}
                    whileHover={{ scale: 1.02, x: 5 }}
                    className="flex items-start space-x-3 p-3 rounded-xl hover:bg-slate-700/30 transition-all duration-200 group"
                  >
                    <div
                      className={`p-2 rounded-lg bg-slate-700/50 ${activity.color}`}
                    >
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                        {activity.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        by {activity.user}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">98.5%</h4>
                <p className="text-sm text-gray-400">System Uptime</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">2.3s</h4>
                <p className="text-sm text-gray-400">Avg Response Time</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">47</h4>
                <p className="text-sm text-gray-400">Countries Served</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
