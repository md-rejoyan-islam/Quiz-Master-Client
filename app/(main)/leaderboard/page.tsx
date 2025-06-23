"use client";

import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Medal,
  Star,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  quizzesCompleted: number;
}

interface QuizEntry {
  id: number;
  title: string;
  participants: number;
}

interface AttendedQuiz {
  id: number;
  title: string;
  attendedDate: string;
  rank: number;
  totalParticipants: number;
  score: number;
}

const leaderboardData: LeaderboardEntry[] = Array.from(
  { length: 50 },
  (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    score: Math.floor(Math.random() * 1000),
    quizzesCompleted: Math.floor(Math.random() * 20),
  })
).sort((a, b) => b.score - a.score);

const quizzes: QuizEntry[] = [
  { id: 1, title: "General Knowledge", participants: 1500 },
  { id: 2, title: "Science Quiz", participants: 1200 },
  { id: 3, title: "History Challenge", participants: 800 },
  { id: 4, title: "Math Masters", participants: 1000 },
];

const attendedQuizzes: AttendedQuiz[] = [
  {
    id: 1,
    title: "General Knowledge",
    attendedDate: "2023-05-15",
    rank: 42,
    totalParticipants: 1500,
    score: 850,
  },
  {
    id: 2,
    title: "Science Quiz",
    attendedDate: "2023-05-10",
    rank: 28,
    totalParticipants: 1200,
    score: 920,
  },
  {
    id: 3,
    title: "History Challenge",
    attendedDate: "2023-05-05",
    rank: 15,
    totalParticipants: 800,
    score: 780,
  },
  {
    id: 4,
    title: "Math Masters",
    attendedDate: "2023-04-30",
    rank: 55,
    totalParticipants: 1000,
    score: 720,
  },
];

export default function LeaderboardPage() {
  return <Leaderboard />;
}

function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const totalPages = Math.ceil(leaderboardData.length / entriesPerPage);

  const paginatedData = leaderboardData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const userPosition = 15; // This would typically come from your backend or state management

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-screen-w px-4 py-8"
    >
      <h1 className="text-3xl font-bold mb-8 text-white">Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Global Rankings
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-white/70">
                    <th className="py-2 px-4">Rank</th>
                    <th className="py-2 px-4">Name</th>
                    <th className="py-2 px-4">Score</th>
                    <th className="py-2 px-4">Quizzes</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((entry, index) => (
                    <motion.tr
                      key={entry.id}
                      className="border-t border-purple-300/50"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <td className="py-2 px-4">
                        {(currentPage - 1) * entriesPerPage + index + 1}
                        {index < 3 && (
                          <span className="ml-2">
                            {index === 0 && (
                              <Trophy
                                className="inline text-yellow-400"
                                size={16}
                              />
                            )}
                            {index === 1 && (
                              <Award className="inline text-white" size={16} />
                            )}
                            {index === 2 && (
                              <Medal
                                className="inline text-yellow-600"
                                size={16}
                              />
                            )}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4">{entry.name}</td>
                      <td className="py-2 px-4">{entry.score}</td>
                      <td className="py-2 px-4">{entry.quizzesCompleted}</td>
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
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Your Attended Quizzes
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attendedQuizzes.map((quiz) => (
                <Link key={quiz.id} href={`/quiz/${quiz.id}/leaderboard`}>
                  <motion.div
                    className="bg-purple-800/20 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <h3 className="font-semibold text-white mb-2">
                      {quiz.title}
                    </h3>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span className="flex items-center">
                        <Calendar size={14} className="mr-1" />
                        {quiz.attendedDate}
                      </span>
                      <span className="flex items-center">
                        <Trophy size={14} className="mr-1" />
                        Rank: {quiz.rank}/{quiz.totalParticipants}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center text-sm">
                      <span className="text-blue-600 dark:text-blue-400 font-medium">
                        Score: {quiz.score}
                      </span>
                      <span className="flex items-center text-yellow-600 dark:text-yellow-400">
                        <Star size={14} className="mr-1" />
                        {(
                          ((quiz.totalParticipants - quiz.rank + 1) /
                            quiz.totalParticipants) *
                          100
                        ).toFixed(1)}
                        %
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Your Position
            </h2>
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                {userPosition}
              </p>
              <p className="text-white/70 mt-2">Keep up the good work!</p>
            </div>
          </div>
          <div className="bg-slate-800/50 rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">
              Quiz Leaderboards
            </h2>
            <ul className="space-y-2">
              {quizzes.map((quiz) => (
                <li key={quiz.id}>
                  <Link
                    href={`/quiz/${quiz.id}/leaderboard`}
                    className="block p-3 rounded-lg bg-purple-200/50 hover:bg-gray-100 transition-colors duration-200"
                  >
                    <span className="font-medium text-white">{quiz.title}</span>
                    <span className="ml-2 text-sm text-white/70">
                      {quiz.participants} participants
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
