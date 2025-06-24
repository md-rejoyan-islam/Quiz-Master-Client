"use client";
import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Crown,
  Download,
  Medal,
  Search,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";

interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  quizzesCompleted: number;
  userId: string;
  userName: string;
  userAvatar: undefined | string;
  totalScore: number;
  averageScore: number;
  rank: number;
  badges: string[];
}

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock leaderboard data
  const [leaderboardData] = useState<LeaderboardEntry[]>([
    {
      id: "1",
      name: "Alex Johnson",
      score: 2847,
      userId: "user1",
      userName: "Alex Johnson",
      userAvatar: undefined,
      totalScore: 2847,
      quizzesCompleted: 45,
      averageScore: 89.2,
      rank: 1,
      badges: ["Quiz Master", "Speed Demon", "Perfect Score"],
    },
    {
      id: "2",
      name: "Sarah Chen",
      score: 2756,
      userId: "user2",
      userName: "Sarah Chen",
      userAvatar: undefined,
      totalScore: 2756,
      quizzesCompleted: 42,
      averageScore: 87.8,
      rank: 2,
      badges: ["Quiz Master", "Consistent Performer"],
    },
    {
      id: "3",
      name: "Mike Rodriguez",
      score: 2689,
      userId: "user3",
      userName: "Mike Rodriguez",
      userAvatar: undefined,
      totalScore: 2689,
      quizzesCompleted: 38,
      averageScore: 91.5,
      rank: 3,
      badges: ["Perfect Score", "High Achiever"],
    },
    {
      id: "4",
      name: "Emily Davis",
      score: 2543,
      userId: "user4",
      userName: "Emily Davis",
      userAvatar: undefined,
      totalScore: 2543,
      quizzesCompleted: 41,
      averageScore: 85.3,
      rank: 4,
      badges: ["Consistent Performer"],
    },
    {
      id: "5",
      name: "David Wilson",
      score: 2487,
      userId: "user5",
      userName: "David Wilson",
      userAvatar: undefined,
      totalScore: 2487,
      quizzesCompleted: 39,
      averageScore: 88.7,
      rank: 5,
      badges: ["Speed Demon"],
    },
    {
      id: "6",
      name: "Lisa Thompson",
      score: 2398,
      userId: "user6",
      userName: "Lisa Thompson",
      userAvatar: undefined,
      totalScore: 2398,
      quizzesCompleted: 36,
      averageScore: 86.9,
      rank: 6,
      badges: ["High Achiever"],
    },
    {
      id: "7",
      name: "James Brown",
      score: 2287,
      userId: "user7",
      userName: "James Brown",
      userAvatar: undefined,
      totalScore: 2287,
      quizzesCompleted: 34,
      averageScore: 84.2,
      rank: 7,
      badges: ["Consistent Performer"],
    },
    {
      id: "8",
      name: "Anna Garcia",
      score: 2156,
      userId: "user8",
      userName: "Anna Garcia",
      userAvatar: undefined,
      totalScore: 2156,
      quizzesCompleted: 32,
      averageScore: 87.1,
      rank: 8,
      badges: ["Quiz Master"],
    },
  ]);

  const timeFilters = [
    { value: "all-time", label: "All Time" },
    { value: "this-month", label: "This Month" },
    { value: "this-week", label: "This Week" },
    { value: "today", label: "Today" },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "mathematics", label: "Mathematics" },
    { value: "science", label: "Science" },
    { value: "history", label: "History" },
    { value: "literature", label: "Literature" },
  ];
  const filteredLeaderboard = leaderboardData.filter((entry) =>
    entry.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getBadgeColor = (badge: string) => {
    const colors = {
      "Quiz Master": "bg-purple-600/20 text-purple-300 border-purple-500/30",
      "Speed Demon": "bg-red-600/20 text-red-300 border-red-500/30",
      "Perfect Score": "bg-green-600/20 text-green-300 border-green-500/30",
      "Consistent Performer": "bg-blue-600/20 text-blue-300 border-blue-500/30",
      "High Achiever": "bg-yellow-600/20 text-yellow-300 border-yellow-500/30",
    };
    return (
      colors[badge as keyof typeof colors] ||
      "bg-gray-600/20 text-gray-300 border-gray-500/30"
    );
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

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-400" />;
      default:
        return <Trophy className="h-5 w-5 text-purple-400" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "from-yellow-500 to-orange-500";
      case 2:
        return "from-gray-400 to-gray-600";
      case 3:
        return "from-orange-500 to-red-500";
      default:
        return "from-purple-500 to-blue-500";
    }
  };

  return (
    <>
      <DashboardPageHeader
        label="Leaderboard"
        description="Track top performers"
      />
      <div className="px-8 py-6 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col lg:flex-row   lg:items-center lg:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Leaderboard</h1>
            <p className="text-gray-400">
              Track top performers and achievements
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            {
              title: "Total Participants",
              value: "12,847",
              icon: Users,
              color: "from-blue-500 to-cyan-500",
              change: "+12.5%",
            },
            {
              title: "Active Competitors",
              value: "3,456",
              icon: TrendingUp,
              color: "from-green-500 to-emerald-500",
              change: "+8.2%",
            },
            {
              title: "Avg. Score",
              value: "78.5%",
              icon: Target,
              color: "from-purple-500 to-violet-500",
              change: "+2.1%",
            },
            {
              title: "Perfect Scores",
              value: "234",
              icon: Star,
              color: "from-yellow-500 to-orange-500",
              change: "+15.3%",
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

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}
                  >
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400 font-medium">
                      {stat.change}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 text-sm">{stat.title}</p>
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
                placeholder="Search participants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {timeFilters.map((filter) => (
                  <option key={filter.value} value={filter.value}>
                    {filter.label}
                  </option>
                ))}
              </select>

              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20 relative overflow-hidden"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full -translate-y-16 translate-x-16"
          />

          <h2 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center space-x-2">
            <Trophy className="h-6 w-6 text-yellow-400" />
            <span>Top Performers</span>
          </h2>

          <div className="flex items-end justify-center space-x-8">
            {/* 2nd Place */}
            {filteredLeaderboard[1] && (
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {filteredLeaderboard[1].userName.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">
                  {filteredLeaderboard[1].userName}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {filteredLeaderboard[1].totalScore} pts
                </p>
                <div className="bg-slate-700/50 rounded-lg p-3 h-16 flex items-center justify-center">
                  <Medal className="h-8 w-8 text-gray-400" />
                </div>
              </motion.div>
            )}

            {/* 1st Place */}
            {filteredLeaderboard[0] && (
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg ring-4 ring-yellow-400/30">
                    <span className="text-2xl font-bold text-white">
                      {filteredLeaderboard[0].userName.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Crown className="h-4 w-4 text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">
                  {filteredLeaderboard[0].userName}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {filteredLeaderboard[0].totalScore} pts
                </p>
                <div className="bg-slate-700/50 rounded-lg p-3 h-20 flex items-center justify-center">
                  <Crown className="h-10 w-10 text-yellow-400" />
                </div>
              </motion.div>
            )}

            {/* 3rd Place */}
            {filteredLeaderboard[2] && (
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="text-center"
              >
                <div className="relative mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
                    <span className="text-2xl font-bold text-white">
                      {filteredLeaderboard[2].userName.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-white mb-1">
                  {filteredLeaderboard[2].userName}
                </h3>
                <p className="text-gray-400 text-sm mb-2">
                  {filteredLeaderboard[2].totalScore} pts
                </p>
                <div className="bg-slate-700/50 rounded-lg p-3 h-16 flex items-center justify-center">
                  <Award className="h-8 w-8 text-orange-400" />
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden"
        >
          <div className="p-6 border-b border-purple-500/20">
            <h2 className="text-xl font-bold text-white">Full Rankings</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/30">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Participant
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Total Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Quizzes
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Avg Score
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">
                    Badges
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-purple-500/10">
                {filteredLeaderboard.map((entry, index) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "rgba(139, 92, 246, 0.05)" }}
                    className="hover:bg-purple-500/5 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRankColor(
                            entry.rank
                          )} flex items-center justify-center`}
                        >
                          {entry.rank <= 3 ? (
                            getRankIcon(entry.rank)
                          ) : (
                            <span className="text-white font-bold text-sm">
                              {entry.rank}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {entry.userName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">
                            {entry.userName}
                          </h4>
                          <p className="text-sm text-gray-400">
                            ID: {entry.userId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-white">
                          {entry.totalScore.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-400">pts</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <BookOpen className="h-4 w-4 text-purple-400" />
                        <span className="text-white">
                          {entry.quizzesCompleted}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <Target className="h-4 w-4 text-green-400" />
                        <span className="text-white">
                          {entry.averageScore}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {entry.badges
                          ?.slice(0, 2)
                          .map((badge: string, badgeIndex: number) => (
                            <span
                              key={badgeIndex}
                              className={`px-2 py-1 rounded-full text-xs font-medium border ${getBadgeColor(
                                badge
                              )}`}
                            >
                              {badge}
                            </span>
                          ))}
                        {(entry.badges?.length || 0) > 2 && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-600/20 text-gray-300 border border-gray-500/30">
                            +{(entry.badges?.length || 0) - 2}
                          </span>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </>
  );
}
