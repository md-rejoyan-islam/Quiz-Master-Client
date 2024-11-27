"use client";

import { QuizCard } from "@/components/dashboard/dashboard-quiz-card";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Mock data
const initialQuizSets = [
  {
    id: "1",
    title: "React Hooks",
    description: "A quiz on React hooks",
    questionCount: 10,
    status: "draft" as const,
  },
  {
    id: "2",
    title: "JavaScript Basics",
    description: "Fundamental JavaScript concepts",
    questionCount: 15,
    status: "published" as const,
  },
];

export default function QuizSetsPage() {
  const [quizSets] = useState(initialQuizSets);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Quiz Sets
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
          className="flex items-center justify-center h-full min-h-[200px] cursor-pointer group dark:bg-gray-800 relative overflow-hidden"
          onClick={() => router.push("/dashboard/quiz-sets/new")}
        >
          {/* Background Pattern */}
          <div className="absolute w-full inset-0 z-0 opacity-5 dark:opacity-[0.03]">
            <svg
              className="h-full w-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                />
              </pattern>
              <rect width="100" height="100" fill="url(#grid)" />
            </svg>
          </div>
          <CardContent>
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Plus className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xl font-semibold">Add New Quiz</p>
              <p className="text-sm text-muted-foreground">
                Create a new quiz set
              </p>
            </div>
          </CardContent>
        </Card>
        {quizSets.map((set) => (
          <QuizCard key={set.id} {...set} />
        ))}
      </div>
    </motion.div>
  );
}
