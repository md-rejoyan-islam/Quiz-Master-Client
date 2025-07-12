"use client";

import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award, // Icon for date
  Medal, // Icon for score
  Timer,
  Trophy, // Icon for leaderboard
  User,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Interfaces (re-used for consistency, though only parts are needed here)
export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  tags?: string[];
  rating?: number;
  completions?: number;
  createdAt?: string;
  createdBy?: string;
  isActive?: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number[];
  explanation?: string;
  mark: number;
  time: number; // in seconds
}

// Interface for a leaderboard entry
export interface LeaderboardEntry {
  userId: string;
  userName: string;
  score: number; // Total score obtained
  timeTakenSeconds: number; // Total time taken to complete the quiz in seconds
  completionDate: string; // ISO string date of completion
}

// Mock Quiz Data (to get the quiz title for context)
const mockQuizDetails: Quiz = {
  id: "quiz-123",
  title: "Introduction to React Hooks",
  category: "Technology",
  description: "A comprehensive quiz covering the basics of React Hooks.",
  timeLimit: 30,
  difficulty: "Medium",
  tags: ["React", "JavaScript"],
  questions: [], // Not needed for leaderboard, but keeping interface consistent
  rating: 4.5,
  completions: 1200,
  createdAt: "2023-04-10T10:00:00Z",
  createdBy: "John Doe",
  isActive: true,
};

// Mock Leaderboard Data
const mockLeaderboardData: LeaderboardEntry[] = [
  {
    userId: "user-001",
    userName: "Alice Smith",
    score: 95,
    timeTakenSeconds: 1200,
    completionDate: "2023-05-01T14:30:00Z",
  },
  {
    userId: "user-002",
    userName: "Bob Johnson",
    score: 88,
    timeTakenSeconds: 1500,
    completionDate: "2023-05-01T15:00:00Z",
  },
  {
    userId: "user-003",
    userName: "Charlie Brown",
    score: 92,
    timeTakenSeconds: 1100,
    completionDate: "2023-05-02T09:00:00Z",
  },
  {
    userId: "user-004",
    userName: "Diana Prince",
    score: 78,
    timeTakenSeconds: 1800,
    completionDate: "2023-05-02T10:15:00Z",
  },
  {
    userId: "user-005",
    userName: "Eve Adams",
    score: 100,
    timeTakenSeconds: 1000,
    completionDate: "2023-05-03T11:45:00Z",
  },
  {
    userId: "user-006",
    userName: "Frank White",
    score: 85,
    timeTakenSeconds: 1600,
    completionDate: "2023-05-03T13:00:00Z",
  },
  {
    userId: "user-007",
    userName: "Grace Lee",
    score: 90,
    timeTakenSeconds: 1350,
    completionDate: "2023-05-04T16:20:00Z",
  },
  {
    userId: "user-008",
    userName: "Harry Kim",
    score: 75,
    timeTakenSeconds: 1900,
    completionDate: "2023-05-04T17:00:00Z",
  },
  {
    userId: "user-009",
    userName: "Ivy Green",
    score: 98,
    timeTakenSeconds: 950,
    completionDate: "2023-05-05T08:30:00Z",
  },
  {
    userId: "user-010",
    userName: "Jack Black",
    score: 82,
    timeTakenSeconds: 1750,
    completionDate: "2023-05-05T09:40:00Z",
  },
];

const QuizLeaderboardPage = () => {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>(
    []
  );
  const [quizTitle] = useState<string>(mockQuizDetails.title); // Get quiz title from mock data
  const [sortBy, setSortBy] = useState<"score" | "time">("score"); // 'score' or 'time'
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc"); // 'desc' or 'asc'

  useEffect(() => {
    // In a real application, you would fetch leaderboard data for a specific quiz ID here.
    // For now, we'll use mock data and simulate a fetch delay.
    const fetchLeaderboard = setTimeout(() => {
      setLeaderboardData(mockLeaderboardData);
    }, 500); // Simulate network delay

    return () => clearTimeout(fetchLeaderboard);
  }, []);

  // Memoize sorted data to prevent re-sorting on every render
  const sortedLeaderboard = useMemo(() => {
    const sorted = [...leaderboardData];
    if (sortBy === "score") {
      sorted.sort((a, b) =>
        sortOrder === "desc" ? b.score - a.score : a.score - b.score
      );
    } else if (sortBy === "time") {
      sorted.sort((a, b) =>
        sortOrder === "asc"
          ? a.timeTakenSeconds - b.timeTakenSeconds
          : b.timeTakenSeconds - a.timeTakenSeconds
      );
    }
    return sorted;
  }, [leaderboardData, sortBy, sortOrder]);

  const handleSortChange = (newSortBy: "score" | "time") => {
    if (sortBy === newSortBy) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(newSortBy);
      setSortOrder(newSortBy === "score" ? "desc" : "asc"); // Default sort order
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" as const },
    },
  };

  return (
    <div className=" text-white">
      <DashboardPageHeader
        label="Quiz Leaderboard"
        description={`Top performers for "${quizTitle}"`}
      />

      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-xl">
            <Trophy className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              Leaderboard: {quizTitle}
            </h2>
            <p className="text-gray-400">
              See how users performed in this quiz!
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <Medal className="h-6 w-6 text-yellow-400" />
              <span>Top Scorers</span>
            </h3>
            <div className="flex space-x-2">
              <motion.button
                onClick={() => handleSortChange("score")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center space-x-2 ${
                  sortBy === "score"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                }`}
              >
                <Award className="h-4 w-4" />
                <span>
                  Score{" "}
                  {sortBy === "score" && (sortOrder === "desc" ? "↓" : "↑")}
                </span>
              </motion.button>
              <motion.button
                onClick={() => handleSortChange("time")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-xl font-semibold transition-colors flex items-center space-x-2 ${
                  sortBy === "time"
                    ? "bg-purple-600 text-white"
                    : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                }`}
              >
                <Timer className="h-4 w-4" />
                <span>
                  Time {sortBy === "time" && (sortOrder === "asc" ? "↑" : "↓")}
                </span>
              </motion.button>
            </div>
          </div>

          {sortedLeaderboard.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-purple-500/30">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider rounded-tl-lg">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Time Taken
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider rounded-tr-lg">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-500/20">
                  <AnimatePresence>
                    {sortedLeaderboard.map((entry, index) => (
                      <motion.tr
                        key={entry.userId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-700/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {index + 1}
                          {index === 0 && (
                            <span className="ml-2 text-yellow-400">🥇</span>
                          )}
                          {index === 1 && (
                            <span className="ml-2 text-gray-400">🥈</span>
                          )}
                          {index === 2 && (
                            <span className="ml-2 text-amber-600">🥉</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center space-x-2">
                          <User className="h-4 w-4 text-purple-400" />{" "}
                          <span>{entry.userName}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-300 font-semibold">
                          {entry.score}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-300">
                          {formatTime(entry.timeTakenSeconds)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                          {new Date(entry.completionDate).toLocaleDateString()}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/20 text-center">
              <p className="text-gray-400">
                No leaderboard data available for this quiz yet.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default QuizLeaderboardPage;
