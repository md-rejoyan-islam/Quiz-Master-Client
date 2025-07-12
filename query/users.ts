import { USER } from "@/lib/types";

export const getAllUsers = async (
  query: string = "page=1&limit=10",
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
  data: {
    pagination: {
      page: number;
      limit: number;
      totalPages: number;
      totalItems: number;
    };
    users: USER[];
  } | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users?${query}`,
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
      throw new Error(result.message || "Failed to fetch users");
    }

    return {
      status: true,
      error: null,
      data: {
        pagination: result.pagination,
        users: result.data as USER[],
      },
    };
  } catch (error) {
    console.log("Error fetching users:", error);

    const message = error instanceof Error ? error.message : String(error);
    return {
      status: false,
      error: message,
      data: null,
    };
  }
};

export const getAllUserAttemptById = async (
  userId: string,
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
  data:
    | {
        quizName: string;
        correctAnswers: number;
        wrongAnswers: number;
      }[]
    | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${userId}/attempts`,
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
      throw new Error(result.message || "Failed to fetch user attempts");
    }

    return {
      status: true,
      error: null,
      data: result.data.map((dt: any) => ({
        quizName: dt.quizSet.title,
        correctAnswers: dt.correct,
        wrongAnswers: dt.wrong,
      })),
    };
  } catch (error) {
    console.log("Error fetching user attempts:", error);

    const message = error instanceof Error ? error.message : String(error);
    return {
      status: false,
      error: message,
      data: null,
    };
  }
};
