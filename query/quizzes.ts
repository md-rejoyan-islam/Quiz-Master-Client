import { QUESTION, QUIZ_SET } from "@/lib/types";
import { errorResponse, successResponse } from "@/lib/utils";

const api_url = process.env.NEXT_PUBLIC_API_URL!;

export const getAllQuizzes = async (
  query: string = "page=1&limit=10"
): Promise<{
  status: boolean;
  error: string | null;
  data: QUIZ_SET[] | null;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}> => {
  try {
    const response = await fetch(`${api_url}/api/v1/quiz-sets?${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies in the request
      next: {
        tags: ["quizzes"],
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch quizzes");
    }

    return {
      status: true,
      data: result.data,
      error: null,
      pagination: result.pagination,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const getQuizById = async (
  id: string
): Promise<{
  status: boolean;
  error: string | null;
  data: QUIZ_SET | null;
}> => {
  try {
    const response = await fetch(`${api_url}/api/v1/quiz-sets/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch quiz");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const getAllAdminQuizzesByUserId = async (
  userId: string,
  token?: string
): Promise<{
  status: boolean;
  error: string | null;
  data: QUIZ_SET[] | null;
}> => {
  try {
    const response = await fetch(`${api_url}/api/v1/users/${userId}/quizzes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      next: {
        tags: ["quizzes"],
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch admin quizzes");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const createQuizSet = async (
  quizSet: QUIZ_SET,
  token?: string
): Promise<{
  status: boolean;
  error: string | null;
  data: QUIZ_SET | null;
}> => {
  try {
    const response = await fetch(`${api_url}/api/v1/quiz-sets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(quizSet),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create quiz set");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const getAllCategories = async (): Promise<{
  status: boolean;
  error: string | null;
  data: string[] | null;
}> => {
  try {
    const response = await fetch(`${api_url}/api/v1/quiz-sets/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch categories");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const attemptQuiz = async (
  quizId: string,
  payload: {
    submittedAnswers: Record<string, number[]>;
    time: number;
  },
  token?: string
): Promise<{
  status: boolean;
  error: string | null;
  data: {
    score: number;
    time: number;
  } | null;
}> => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/quiz-sets/${quizId}/attempt`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to attempt quiz");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const showAttemptedQuizResults = async (
  quizId: string,
  token?: string
): Promise<{
  status: boolean;
  error: string | null;
  data: {
    title: string;
    description: string;
    score: number;
    time: number;
    submittedAnswers: Record<string, number[]>;
    questions: QUESTION[];
    correct: number;
    wrong: number;
    skipped: number;
    mark: number;
  } | null;
}> => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/quiz-sets/${quizId}/attempt/result`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch quiz results");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const getAllAttemptsByQuizId = async (
  quizId: string,
  token?: string
): Promise<{
  status: boolean;
  error: string | null;
  data:
    | {
        score: number;
        correct: number;
        wrong: number;
        time: string;
        user: {
          id: string;
          fullName: string;
        };
      }[]
    | null;
}> => {
  try {
    const response = await fetch(
      `${api_url}/api/v1/quiz-sets/${quizId}/attempts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch quiz attempts");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};

export const leaderBoard = async (
  token?: string
): Promise<{
  status: boolean;
  error: string | null;
  data:
    | {
        totalScore: number;
        fullName: string;
        score: number;
        userId: string;
        attempts: {
          score: number;
          createdAt: string;
          quizSet: { description: string; id: string; title: string };
        }[];
      }[]
    | null;
}> => {
  try {
    const response = await fetch(`${api_url}/api/v1/quiz-sets/leaderboard`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch leaderboard");
    }

    return successResponse(result.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return errorResponse(message);
  }
};
