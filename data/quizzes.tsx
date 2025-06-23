import { QUIZ_SET, QUIZ_SET_LABEL, QUIZ_SET_STATUS } from "@/lib/types";

interface QuizTypes extends Omit<QUIZ_SET, "user"> {
  isAttempt: boolean;
}

const quizzes: QuizTypes[] = [
  {
    id: "1",
    title: "General Knowledge",
    description: "Test your knowledge on various topics",
    createdAt: "2022-10-24",
    updatedAt: "20201-01-23",
    status: QUIZ_SET_STATUS.PUBLISHED,
    label: QUIZ_SET_LABEL.EASY,
    isAttempt: true, // if user logged in and attemp this quiz
    questions: [
      {
        id: "01",
        quizSetId: "01111",
        question: "this is question",
        options: ["A", "B", "C", "D"],
        correctAnswers: ["A", "B"],
        mark: 5,
        time: 3,
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

export default quizzes;
