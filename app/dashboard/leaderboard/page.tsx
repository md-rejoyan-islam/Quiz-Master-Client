"use client";
import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Medal, Trophy } from "lucide-react";
import { useState } from "react";

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
  quizzesCompleted: number;
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
export default function Leaderboard() {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;
  const totalPages = Math.ceil(leaderboardData.length / entriesPerPage);

  const paginatedData = leaderboardData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Global Rankings
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600 dark:text-gray-400">
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
                className="border-t border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <td className="py-2 px-4">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                  {index < 3 && (
                    <span className="ml-2">
                      {index === 0 && (
                        <Trophy className="inline text-yellow-400" size={16} />
                      )}
                      {index === 1 && (
                        <Award className="inline text-gray-400" size={16} />
                      )}
                      {index === 2 && (
                        <Medal className="inline text-yellow-600" size={16} />
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
  );
}
