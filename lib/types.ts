export enum QUIZ_SET_LABEL {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}
export enum EQuizSetLabel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export type TCreateQuizStep = "basic" | "questions" | "review";

export enum QUIZ_SET_STATUS {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface QUIZ_SET_RATING {
  id: string;
  userId: string;
  quizId: string;
  rating: number; //from 0 to 5
  createdAt: string;
  updatedAt: string;
  user?: USER;
  quiz?: QUIZ_SET;
}

export interface QUESTION {
  id: string;
  quizSetId: string;
  question: string;
  options: string[];
  answerIndices: number[];
  mark: number;
  time: number;
  explanation?: string;
  createdAt: string;
  updatedAt: string;
  quiz?: QUIZ_SET;
}

export type ICreateQuestionFormData = Omit<
  QUESTION,
  "quizSetId" | "createdAt" | "updatedAt" | "quiz"
>;

export interface QUIZ_SET {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  label: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  questions: QUESTION[];
  ratings?: QUIZ_SET_RATING[];
  attempts: ATTEMPT[];
  user?: USER;
  isAttempted?: boolean;
}
export interface IQuizSet {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  label: string;
  createdAt: string;
  updatedAt: string;
  questions: QUESTION[];
  ratings?: QUIZ_SET_RATING[];
  attempts?: ATTEMPT[];
  user?: USER;
}

export interface ICreateQuizSet {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  status: string;
  category: string;
  label: string;
  createdAt: string;
  questions: ICreateQuestionFormData[];
  ratings?: QUIZ_SET_RATING[];
  attempts?: ATTEMPT[];
  user?: USER;
}

export interface ATTEMPT {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  correct: number;
  wrong: number;
  skipped: number;
  createdAt: string;
  updatedAt: string;
  submittedAnswers: SUBMITTED_ANSWER[];
  user?: USER;
  quiz?: QUIZ_SET;
}

export enum USER_ROLE {
  ADMIN = "admin",
  USER = "user",
}

export interface USER {
  id: string;
  fullName: string;
  email: string;
  bio: string | null;
  password: string;
  status: "ACTIVE" | "INACTIVE";
  photo: string | null;
  role: USER_ROLE;
  quizSets?: QUIZ_SET[];
  attempts?: ATTEMPT[];
  createdAt: string;
  updatedAt: string;
}

export interface SUBMITTED_ANSWER {
  questionId: string;
  selectedAnswers: string[];
}
