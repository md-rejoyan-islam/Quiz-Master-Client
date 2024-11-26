"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswers: number[];
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

// Mock data - replace with actual API call in production
const quizData: Quiz = {
  id: 1,
  title: "React Hooks Quiz",
  description:
    "A quiz on React hooks like useState, useEffect, and useContext.",
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a binary tree traversal method?",
      options: ["Inorder", "Preorder", "Postorder", "Crossorder"],
      correctAnswers: [3],
    },
    {
      id: 2,
      text: "What is the maximum number of nodes at level 'L' in a binary tree?",
      options: ["2^L", "L", "2^(L-1)", "2L"],
      correctAnswers: [0],
    },
    {
      id: 3,
      text: "What is the height of an empty binary tree?",
      options: ["0", "-1", "1", "Undefined"],
      correctAnswers: [1],
    },
    // Add more questions as needed
  ],
};

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const quizId = Number(params.quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number[];
  }>({});
  const [participationCount, setParticipationCount] = useState(0);

  const currentQuestion = quizData.questions[currentQuestionIndex];

  const handleOptionToggle = (optionIndex: number) => {
    setSelectedAnswers((prev) => {
      const current = prev[currentQuestion.id] || [];
      if (current.includes(optionIndex)) {
        return {
          ...prev,
          [currentQuestion.id]: current.filter((i) => i !== optionIndex),
        };
      } else {
        return { ...prev, [currentQuestion.id]: [...current, optionIndex] };
      }
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setParticipationCount((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    const results = quizData.questions.map((question) => ({
      questionId: question.id,
      correct:
        JSON.stringify(selectedAnswers[question.id]?.sort()) ===
        JSON.stringify(question.correctAnswers.sort()),
    }));
    const score = results.filter((r) => r.correct).length;
    router.push(
      `/quiz/${quizId}/results?score=${score}&total=${quizData.questions.length}`
    );
  };

  return (
    <div className="px-4 py-8 max-screen-w">
      <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white text-center">
        {quizData.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8 text-center">
        {quizData.description}
      </p>

      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="w-full md:w-1/2 border">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 h-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Quiz Progress
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between  text-sm text-gray-600 dark:text-gray-400">
                <span>Total questions:</span>
                <span>{quizData.questions.length}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Participation:</span>
                <span>{participationCount}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Remaining:</span>
                <span>{quizData.questions.length - participationCount}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{
                    width: `${
                      (participationCount / quizData.questions.length) * 100
                    }%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 mb-6 border">
            <h2 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
              {currentQuestionIndex + 1}. {currentQuestion.text}
            </h2>
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`option-${index}`}
                    checked={
                      selectedAnswers[currentQuestion.id]?.includes(index) ||
                      false
                    }
                    onCheckedChange={() => handleOptionToggle(index)}
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="text-base text-gray-700 dark:text-gray-300"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div
            className={clsx(
              "flex ",
              currentQuestionIndex === 0 ? "justify-between" : "justify-between"
            )}
          >
            {
              <Button
                onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700  text-white"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
            }
            {currentQuestionIndex === quizData.questions.length - 1 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="outline" className="">
                    Submit Quiz
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to submit?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. You will see your results
                      after submitting.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSubmit}>
                      Submit
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}

            {currentQuestionIndex < quizData.questions.length - 1 && (
              <Button
                onClick={handleNext}
                disabled={
                  currentQuestionIndex === quizData.questions.length - 1
                }
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700  text-white"
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
