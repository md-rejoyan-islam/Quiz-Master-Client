"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

interface QuizLeaderboardEntry {
  id: number;
  name: string;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  timeTaken: string;
}

interface QuizDetails {
  id: number;
  title: string;
  description: string;
  date: string;
  participants: number;
  duration: string;
}

const generateLeaderboardData = (quizId: number): QuizLeaderboardEntry[] => {
  return Array.from({ length: 50 }, (_, i) => {
    const correctAnswers = Math.floor(Math.random() * 20);
    const wrongAnswers = Math.floor(Math.random() * 10);
    const minutes = Math.floor(Math.random() * 30) + 10;
    const seconds = Math.floor(Math.random() * 60);
    return {
      id: i + 1,
      name: `User ${i + 1}`,
      score: correctAnswers * 10 - wrongAnswers * 5,
      correctAnswers,
      wrongAnswers,
      timeTaken: `${minutes}:${seconds.toString().padStart(2, "0")}`,
    };
  }).sort((a, b) => b.score - a.score);
};

const quizDetails: { [key: number]: QuizDetails } = {
  1: {
    id: 1,
    title: "General Knowledge",
    description:
      "Test your knowledge on various topics ranging from history to pop culture.",
    date: "2023-05-15",
    participants: 1500,
    duration: "30 minutes",
  },
  2: {
    id: 2,
    title: "Science Quiz",
    description:
      "Explore the wonders of science with questions covering physics, chemistry, and biology.",
    date: "2023-05-10",
    participants: 1200,
    duration: "25 minutes",
  },
  3: {
    id: 3,
    title: "History Challenge",
    description:
      "Journey through time with questions about significant historical events and figures.",
    date: "2023-05-05",
    participants: 800,
    duration: "20 minutes",
  },
  4: {
    id: 4,
    title: "Math Masters",
    description:
      "Put your mathematical skills to the test with challenging problems and puzzles.",
    date: "2023-04-30",
    participants: 1000,
    duration: "35 minutes",
  },
};

export default function QuizLeaderboardPage() {
  return <QuizLeaderboard />;
}

function QuizLeaderboard() {
  const params = useParams();
  const quizId = Number(params.quizId);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const leaderboardData = generateLeaderboardData(quizId);
  const totalPages = Math.ceil(leaderboardData.length / entriesPerPage);

  const paginatedData = leaderboardData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const quiz = quizDetails[quizId];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-screen-w mx-auto px-4 py-8"
    >
      <div className="flex items-center mb-8">
        <Link
          href="/leaderboard"
          className="mr-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          {quiz.title} Leaderboard
        </h1>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Quiz Details
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {quiz.description}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Calendar className="mr-2" size={20} />
            <span>Date: {quiz.date}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Users className="mr-2" size={20} />
            <span>Participants: {quiz.participants}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="mr-2" size={20} />
            <span>Duration: {quiz.duration}</span>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-600 dark:text-gray-400">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Score</th>
                <th className="py-2 px-4">Correct</th>
                <th className="py-2 px-4">Wrong</th>
                <th className="py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((entry, index) => (
                <motion.tr
                  key={entry.id}
                  className="border-t border-gray-200 dark:border-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-2 px-4">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4">{entry.name}</td>
                  <td className="py-2 px-4">{entry.score}</td>
                  <td className="py-2 px-4 text-green-600 dark:text-green-400">
                    {entry.correctAnswers}
                  </td>
                  <td className="py-2 px-4 text-red-600 dark:text-red-400">
                    {entry.wrongAnswers}
                  </td>
                  <td className="py-2 px-4">{entry.timeTaken}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
