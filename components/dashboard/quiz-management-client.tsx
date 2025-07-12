"use client";

import { QUIZ_SET } from "@/lib/types";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  CheckCircle,
  Clock,
  Copy,
  Edit,
  Eye,
  MoreVertical,
  Plus,
  Search,
  Sparkles,
  Target,
  Trash2,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  label: "Easy" | "Medium" | "Hard";
  tags?: string[];
  rating?: number;
  completions?: number;
  createdAt?: string;
  createdBy?: string;
  status: "DRAFT" | "PUBLISHED";
}

// "id": "e0c8b6a3-7b1e-4d5c-9a1b-3c4d5e6f7a8b",
// "quizSetId": "6a8b1c9d-4e2f-4a6b-8c7d-9e0f1a2b3c4d",
// "question": "What is the capital of Japan?",
// "options": "[\"Kyoto\",\"Osaka\",\"Tokyo\",\"Hiroshima\"]",
// "answerIndices": "[2]",
// "mark": 5,
// "time": 30,
// "explanation": "Tokyo has been the capital of Japan since 1868.",
// "createdAt": "2024-09-02T10:00:00.000Z",
// "updatedAt": "2024-09-02T10:00:00.000Z"

export interface Question {
  id: string;
  quizSetId: string;
  question: string;
  options: string[];
  answerIndices: number[];
  mark: number;
  time: number; // in seconds
  explanation?: string;
  createdAt?: string;
  updatedAt?: string;
}

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

export default function QuizManagementClient({
  data,
}: {
  data: QUIZ_SET[] | null;
}) {
  const [quizzes, setQuizzes] = useState<QUIZ_SET[]>(data || []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [, setShowCreateModal] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const tags = [
    "All",
    ...Array.from(new Set(quizzes.map((quiz) => quiz.tags).flat())),
  ];
  const statuses = ["All", "Published", "Draft"];

  const filteredQuizzes = quizzes.filter((quiz) => {
    const matchesSearch =
      quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quiz.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || quiz.tags?.includes(selectedCategory);
    const matchesStatus =
      selectedStatus === "All" ||
      (selectedStatus === "Published" && quiz.status === "PUBLISHED") ||
      (selectedStatus === "Draft" && quiz.status === "DRAFT");

    return matchesSearch && matchesCategory && matchesStatus;
  });

  // const handleCreateQuiz = (newQuiz: Quiz) => {
  //   setQuizzes([...quizzes, { ...newQuiz, id: Date.now().toString() }]);
  //   setShowCreateModal(false);
  // };

  const handleDeleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter((quiz) => quiz.id !== quizId));
  };

  const handleDuplicateQuiz = (quiz: QUIZ_SET) => {
    const duplicatedQuiz = {
      ...quiz,
      id: Date.now().toString(),
      title: `${quiz.title} (Copy)`,
      createdAt: new Date().toISOString(),
    };
    setQuizzes([...quizzes, duplicatedQuiz]);
  };

  const getStatusColor = (quiz: QUIZ_SET) => {
    if (quiz.status === "DRAFT")
      return "bg-yellow-900/50 text-yellow-300 border-yellow-500/30";
    return "bg-green-900/50 text-green-300 border-green-500/30";
  };

  const getStatusText = (quiz: QUIZ_SET) => {
    if (quiz.status === "DRAFT") return "Draft";
    return "Published";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Quiz Management
          </h1>
          <p className="text-gray-400">
            Create, edit, and manage your quiz content
          </p>
        </div>

        <Link href="/dashboard/quiz-management/create">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Plus className="h-5 w-5" />
            <span>Create New Quiz</span>
          </motion.button>
        </Link>
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
            title: "Total Quizzes",
            value: quizzes.length,
            icon: BookOpen,
            color: "from-blue-500 to-cyan-500",
          },
          {
            title: "Active Quizzes",
            value: quizzes.filter((q) => q.status === "PUBLISHED").length,
            icon: CheckCircle,
            color: "from-green-500 to-emerald-500",
          },
          {
            title: "Draft Quizzes",
            value: quizzes.filter((q) => q.status === "DRAFT").length,
            icon: AlertCircle,
            color: "from-yellow-500 to-orange-500",
          },
          {
            title: "Total Questions",
            value: quizzes.reduce(
              (acc, quiz) => acc + quiz.questions.length,
              0
            ),
            icon: Target,
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
              placeholder="Search quizzes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              {tags.map((tag, index) => (
                <option key={index} value={tag}>
                  {tag}
                </option>
              ))}
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            {/* View Mode Toggle */}
            <div className="flex bg-slate-700/50 rounded-xl p-1">
              <motion.button
                onClick={() => setViewMode("grid")}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-2 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Grid
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                whileHover={{ scale: 1.05 }}
                className={`px-3 py-2 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-purple-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                List
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quiz Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          viewMode === "grid"
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-4"
        }
      >
        {filteredQuizzes.map((quiz) => (
          <motion.div
            key={quiz.id}
            variants={itemVariants}
            whileHover={{
              scale: viewMode === "grid" ? 1.05 : 1.02,
              rotateY: viewMode === "grid" ? 5 : 0,
              rotateX: viewMode === "grid" ? 5 : 0,
              z: 50,
            }}
            style={{
              transformStyle: "preserve-3d",
              perspective: "1000px",
            }}
            className={`bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 group cursor-pointer overflow-hidden relative ${
              viewMode === "list" ? "p-6" : "p-6"
            }`}
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
              className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10"
            />

            {viewMode === "grid" ? (
              // Grid View
              <>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                      quiz
                    )}`}
                  >
                    {getStatusText(quiz)}
                  </span>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      className="p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </motion.button>
                  </div>
                </div>

                <div className="mb-4">
                  <Link href={`/dashboard/quiz-management/${quiz.id}`}>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {quiz.title}
                    </h3>
                  </Link>
                  <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300 transition-colors">
                    {quiz.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {(
                          quiz.questions?.reduce(
                            (acc, question) => acc + question.time,
                            0
                          ) / 60 || 0
                        ).toFixed(2)}
                        m
                      </span>
                    </div>
                  </div>
                  {/* {quiz.rating && (
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{quiz.rating}</span>
                    </div>
                  )} */}
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-1"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDuplicateQuiz(quiz)}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="p-2 bg-red-900/50 hover:bg-red-800/50 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </>
            ) : (
              // List View
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="p-3 bg-purple-600 rounded-xl">
                    <BookOpen className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {quiz.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          quiz
                        )}`}
                      >
                        {getStatusText(quiz)}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mb-2">
                      {quiz.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{quiz?.tags}</span>
                      <span>{quiz.questions.length} questions</span>
                      <span>{10} minutes</span>
                      {/* {quiz.completions && (
                        <span>{quiz.completions} completions</span>
                      )} */}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDuplicateQuiz(quiz)}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="p-2 bg-slate-700 hover:bg-slate-600 text-gray-400 hover:text-white rounded-lg transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleDeleteQuiz(quiz.id)}
                    className="p-2 bg-red-900/50 hover:bg-red-800/50 text-red-400 hover:text-red-300 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* No Results */}
      {filteredQuizzes.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <div className="bg-slate-800/50 rounded-2xl p-12 border border-purple-500/20 backdrop-blur-sm">
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-4">
              No Quizzes Found
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              {searchTerm ||
              selectedCategory !== "All" ||
              selectedStatus !== "All"
                ? "No quizzes match your current filters. Try adjusting your search criteria."
                : "You haven't created any quizzes yet. Create your first quiz to get started!"}
            </p>
            <motion.button
              onClick={() => setShowCreateModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2 mx-auto"
            >
              <Plus className="h-5 w-5" />
              <span>Create Your First Quiz</span>
            </motion.button>
          </div>
        </motion.div>
      )}
    </>
  );
}
