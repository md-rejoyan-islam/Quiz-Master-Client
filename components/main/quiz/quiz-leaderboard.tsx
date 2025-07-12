"use client";
import { QUIZ_SET } from "@/lib/types";
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
import { useState } from "react";

function QuizLeaderboard({
  data,
  quiz,
}: {
  data:
    | {
        score: number;
        correct: number;
        wrong: number;
        time: string;
        user: {
          id: string;
          fullName: string;
        };
      }[]
    | null;
  quiz: QUIZ_SET | null;
}) {
  console.log(data);

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const totalPages = Math.ceil((data?.length || 0) / entriesPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12 md:py-20"
    >
      <div className="flex items-center mb-8">
        <Link
          href="/leaderboard"
          className="mr-4 p-2 rounded-full bg-slate-700/40 text-gray-400  hover:bg-gray-800 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold text-white">
          {quiz?.title} Leaderboard
        </h1>
      </div>
      <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 rounded-lg shadow-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Quiz Details</h2>
        <p className="text-white/80 mb-4">{quiz?.description}</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center text-white/70">
            <Calendar className="mr-2" size={20} />
            <span>
              Date: {new Date(quiz?.createdAt || "").toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center text-white/70">
            <Users className="mr-2" size={20} />
            <span>Participants: {data?.length}</span>
          </div>
          <div className="flex items-center text-white/70">
            <Clock className="mr-2" size={20} />
            <span>
              Duration:{" "}
              {quiz?.questions.reduce((acc, cur) => acc + cur.time, 0)} seconds
            </span>
          </div>
        </div>
      </div>
      <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 rounded-lg shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-white/70">
                <th className="py-2 px-4">Rank</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Score</th>
                <th className="py-2 px-4">Correct</th>
                <th className="py-2 px-4">Wrong</th>
                <th className="py-2 px-4">Time</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((entry, index) => (
                <motion.tr
                  key={index}
                  className="border-t border-slate-700 text-white/70 hover:bg-slate-900/50 transition-colors cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <td className="py-2 px-4">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4">{entry.user.fullName}</td>
                  <td className="py-2 px-4">{entry.score}</td>
                  <td className="py-2 px-4 text-green-600 dark:text-green-400">
                    {entry.correct}
                  </td>
                  <td className="py-2 px-4 text-red-600 dark:text-red-400">
                    {entry.wrong}
                  </td>
                  <td className="py-2 px-4">{entry.time}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div className="mt-4 flex justify-between items-center">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-slate-600/50 hover:bg-slate-600/70 hover:text-white text-white/70  disabled:opacity-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="text-white/60">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-slate-600/50 hover:bg-slate-600/70 hover:text-white text-white/70  disabled:opacity-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default QuizLeaderboard;
