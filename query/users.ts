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
        next: {
          tags: ["users"],
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
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: false,
      error: message,
      data: null,
    };
  }
};

export const updateUserProfile = async (
  userId: string,
  profileData: {
    fullName: string;
    bio?: string;
    password?: string;
  },
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
  data: {
    id: string;
    fullName: string;
    email: string;
    bio: string | null;
  } | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(profileData),
      }
    );

    const result = await response.json();

    console.log(result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to update user profile");
    }

    return {
      status: true,
      error: null,
      data: result.data as USER,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: false,
      error: message,
      data: null,
    };
  }
};

export const deleteUser = async (
  userId: string,
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete user");
    }

    return { status: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { status: false, error: message };
  }
};

export const banUser = async (
  userId: string,
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${userId}/ban`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: {
          tags: ["users", "user"],
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to ban user");
    }

    return { status: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { status: false, error: message };
  }
};
export const unbanUser = async (
  userId: string,
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${userId}/unban`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: {
          tags: ["users", "user"],
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to unban user");
    }

    return { status: true, error: null };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return { status: false, error: message };
  }
};
export const getUserById = async (
  userId: string,
  token: string | null = null
): Promise<{
  status: boolean;
  error: string | null;
  data: USER | null;
}> => {
  try {
    const response = await fetch(
      `http://localhost:5000/api/v1/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: {
          tags: ["user"],
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch user");
    }

    return {
      status: true,
      error: null,
      data: result.data as USER,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      status: false,
      error: message,
      data: null,
    };
  }
};
