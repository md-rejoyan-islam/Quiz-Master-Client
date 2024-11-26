"use client";

import QuizCard from "@/components/home/QuizCard";
import { QuizDifficulty } from "@/lib/types";
import { Atom, Brain, Dna, Microscope } from "lucide-react";

const quizzes = [
  {
    id: 1,
    title: "General Knowledge",
    description: "Test your knowledge on various topics",
    difficulty: QuizDifficulty.Hard,
    questionsCount: 20,
    icon: <Brain size={96} />,
  },
  {
    id: 2,
    title: "Science Quiz",
    description: "Explore the wonders of science",
    difficulty: QuizDifficulty.Medium,
    questionsCount: 15,
    icon: <Dna size={96} />,
  },
  {
    id: 3,
    title: "Physics Challenge",
    description: "Dive into the world of physics",
    difficulty: QuizDifficulty.Easy,
    questionsCount: 10,
    icon: <Atom size={96} />,
  },
  {
    id: 4,
    title: "Biology Basics",
    description: "Learn about living organisms",
    difficulty: QuizDifficulty.Medium,
    questionsCount: 12,
    icon: <Microscope size={96} />,
  },
];

export default function Home() {
  return (
    <div className="px-4 py-8 max-screen-w ">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
        Available Quizzes
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz, index) => (
          <QuizCard key={index} {...quiz} />
        ))}
      </div>
    </div>
  );
}
