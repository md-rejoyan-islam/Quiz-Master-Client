"use client";

import { QuizDifficulty } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

interface QuizCardProps {
  id: number;
  title: string;
  description: string;
  difficulty: QuizDifficulty;
  questionsCount: number;
  icon: React.ReactNode;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  title,
  description,
  difficulty,
  questionsCount,
  icon,
}) => {
  const difficultyColor = {
    [QuizDifficulty.Easy]:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    [QuizDifficulty.Medium]:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    [QuizDifficulty.Hard]:
      "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  };

  return (
    <Link href={`/quiz/${id}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl cursor-pointer"
      >
        <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
          {icon}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          <div className="flex justify-between items-center">
            <span
              className={`px-2 py-1 rounded text-sm font-medium ${difficultyColor[difficulty]}`}
            >
              {difficulty}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {questionsCount} questions
            </span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
      </motion.div>
    </Link>
  );
};

export default QuizCard;
