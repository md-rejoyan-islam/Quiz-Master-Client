"use client";

import SectionTitle from "@/components/main/home/section-title";
import { QUIZ_SET } from "@/lib/types";
import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Medal,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

function LeaderboardClient({
  data,
  error,
  userId,
  quizzes,
}: {
  userId: string | undefined;
  quizzes: QUIZ_SET[];
  data:
    | {
        totalScore: number;
        fullName: string;
        score: number;
        userId: string;
        attempts: {
          createdAt: string;
          score: number;
          quizSet: { description: string; id: string; title: string };
        }[];
      }[]
    | null;
  error: string | null;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const totalPages = data?.length ? Math.ceil(data.length / entriesPerPage) : 1;

  const paginatedData = data?.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const userIndex = data
    ? data.findIndex((entry) => entry.userId === userId)
    : -1;
  const userPosition = userIndex !== -1 ? userIndex + 1 : 0;

  if (error) {
    return (
      <section className="bg-gradient-to-b from-transparent via-transparent to-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-4 py-12 md:py-16"
        >
          <SectionTitle firstLine="" secondLine="Leaderboard" />
          <div className="text-red-500 text-center">{error}</div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b py-12 md:py-16  from-transparent via-transparent to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 "
      >
        <SectionTitle firstLine="" secondLine="Leaderboard" />

        <div className="grid grid-cols-1 mt-8 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold mb-4 text-white">
                Global Rankings
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-white/80">
                      <th className="py-2 px-4">Rank</th>
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Score</th>
                      <th className="py-2 px-4">Quizzes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedData?.map((entry, index) => (
                      <motion.tr
                        key={index}
                        className="border-t text-white/70 hover:bg-slate-600/40 cursor-pointer border-slate-600/50"
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
                                <Award
                                  className="inline text-white"
                                  size={16}
                                />
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
                        <td className="py-2 px-4">{entry.fullName}</td>
                        <td className="py-2 px-4">{entry.score}</td>
                        <td className="py-2 px-4">{entry?.attempts.length}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
            </div>
            <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50  rounded-lg shadow-lg p-6">
              <h2 className="text-xl text-center font-semibold mb-7 text-white">
                Your Attended Quizzes
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {data &&
                  userIndex !== -1 &&
                  data[userIndex]?.attempts?.map((quiz) => (
                    <Link
                      key={quiz.quizSet.id}
                      href={`/quiz/${quiz.quizSet.id}/leaderboard`}
                    >
                      <motion.div
                        className="bg-slate-700/40 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <h3 className="font-semibold text-white mb-2">
                          {quiz.quizSet.title}
                          {String(quiz)}
                        </h3>
                        <div className="flex justify-between items-center text-sm text-gray-400 ">
                          <span className="flex items-center">
                            <Calendar size={14} className="mr-1" />
                            {new Date(quiz.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center">
                            <Trophy size={14} className="mr-1" />
                            {/* Rank: {quiz.rank}/{quiz.totalParticipants} */}
                          </span>
                        </div>
                        <div className="mt-2 flex justify-between items-center text-sm">
                          <span className="text-blue-600 dark:text-blue-400 font-medium">
                            Score: {quiz.score}
                          </span>
                        </div>
                      </motion.div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div>
            <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50  rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl text-center font-semibold mb-6 text-white">
                Your Position
              </h2>
              <div className="text-center">
                <p className="text-4xl font-bold text-pink-500">
                  {userPosition}
                </p>
                <p className="text-white/80 mt-2">Keep up the good work!</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50  rounded-lg shadow-lg p-6">
              <h2 className="text-xl text-center font-semibold mb-6 text-white">
                Quiz Leaderboards
              </h2>
              <ul className="space-y-2">
                {quizzes.map((quiz) => (
                  <li key={quiz.id}>
                    <Link
                      href={`/quizzes/${quiz.id}/leaderboard`}
                      className="block p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors duration-200"
                    >
                      <span className="font-medium text-white">
                        {quiz.title}
                      </span>
                      <span className="ml-2 text-sm text-white/70">
                        {quiz.attempts.length} participants
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default LeaderboardClient;
