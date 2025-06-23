"use client";

import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-work";
import Quizzes from "@/components/home/quizzes";
import Statistics from "@/components/home/statistics";
import { Quiz, QuizLabel, QuizStatus } from "@/lib/types";

interface QuizTypes extends Omit<Quiz, "user"> {
  isAttempt: boolean;
}

const quizzes: QuizTypes[] = [
  {
    id: "1",
    title: "General Knowledge",
    description: "Test your knowledge on various topics",
    createdAt: "2022-10-24",
    updatedAt: "20201-01-23",
    status: QuizStatus.PUBLISHED,
    label: QuizLabel.Easy,
    isAttempt: true, // if user logged in and attemp this quiz
    questions: [
      {
        id: "01",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
      {
        id: "011",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
      {
        id: "02",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],

        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
    ],
    userId: "",
    attempts: [],
  },
  {
    id: "2",
    title: "Science Quiz",
    description: "Explore the wonders of science",
    createdAt: "2022-10-24",
    updatedAt: "20201-01-23",
    status: QuizStatus.DRAFT,
    label: QuizLabel.Easy,
    isAttempt: true, // if user logged in and attemp this quiz
    questions: [
      {
        id: "01",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
      {
        id: "02",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
    ],
    userId: "",
    attempts: [],
  },
  {
    id: "3",
    title: "Physics Challenge",
    description: "Dive into the world of physics",
    createdAt: "2022-10-24",
    updatedAt: "20201-01-23",
    status: QuizStatus.DRAFT,
    label: QuizLabel.Medium,
    isAttempt: true, // if user logged in and attemp this quiz
    questions: [
      {
        id: "01",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
      {
        id: "02",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
    ],
    userId: "",
    attempts: [],
  },
  {
    id: "4",
    title: "Biology Basics",
    description: "Learn about living organisms",
    createdAt: "2022-10-24",
    updatedAt: "20201-01-23",
    status: QuizStatus.DRAFT,
    label: QuizLabel.Easy,
    isAttempt: true, // if user logged in and attemp this quiz
    questions: [
      {
        id: "01",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
      {
        id: "02",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
      {
        id: "03",
        quizId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        marks: 5,
        createdAt: "2022-10-24",
        updatedAt: "20201-01-23",
      },
    ],
    userId: "",
    attempts: [],
  },
];

export default function Home() {
  return (
    <section className="">
      <Hero />
      <HowItWorks />
      <Statistics />
      {/* <div className="px-4 py-8 max-screen-w">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-200">
          Available Quizzes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz, index) => (
            <QuizCard key={index} {...quiz} />
          ))}
        </div>
      </div> */}
      <Quizzes />
    </section>
  );
}
