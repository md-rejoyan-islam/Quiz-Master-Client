import quizzes from "@/lib/data/quizzes.json";
export const getAllQuizzes = () => {
  return quizzes;
};

export const getQuizById = (id: string) => {
  return quizzes.find((quiz) => quiz.id === id);
};
