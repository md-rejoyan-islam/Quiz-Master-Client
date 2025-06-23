export enum QuizDifficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}
export enum QuizLabel {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export enum QuizStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string; // Corrected typo from "updateddAt"
  status: QuizStatus.DRAFT | QuizStatus.PUBLISHED; // Enum-like type for status
  userId: string;
  user: User; // User object reference
  label: QuizLabel.Easy | QuizLabel.Medium | QuizLabel.Hard; // Enum-like type for label
  attempts: Attempt[]; // Array of Attempt objects
  questions: Question[]; // Array of Question objects
}

export interface Attempt {
  id: string;
  userId: string;
  user: User; // User object reference
  quizId: string;
  quiz: Quiz; // Quiz object reference
  score: number;
  submittedAnswers: SubmittedAnswer[]; // Define submittedAnswers type if structured
  completed: boolean;
  percentage: number;
  correct: number;
  wrong: number;
  skipped: number;
  createdAt: string;
  updatedAt: string; // Corrected typo from "updateddAt"
}

export interface Question {
  id: string;
  quizId: string;
  quiz?: Quiz; // Quiz object reference
  question: string;
  options: string[]; // Array of answer options
  correctAnswers: string[] | number[]; // Array of correct answers
  marks: number;
  createdAt: string;
  updatedAt: string; // Corrected typo from "updateddAt"
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string; // Should be stored securely in production
  photo: string | null;
  role: "admin" | "user"; // Enum-like type for roles
  refreshToken: string | null;
  quizzes: Quiz[]; // Array of Quiz objects
  attempts: Attempt[]; // Array of Attempt objects
  createdAt: string;
  updatedAt: string; // Corrected typo from "updateddAt"
}

// Optional: Define the type for submitted answers if needed
export interface SubmittedAnswer {
  questionId: string;
  selectedAnswers: string[];
}
