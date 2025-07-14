"use server";

import { USER } from "@/lib/types";
import { cookies } from "next/headers";
import { cache } from "react";
const api_url = process.env.API_URL!;

type LoginResult = {
  success: boolean;
  error?: string;
};

export async function login(credentials: {
  email: string;
  password: string;
  role: string;
}): Promise<LoginResult> {
  try {
    const response = await fetch(`${api_url}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      // credentials: "include", // Include cookies in the request
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Invalid credentials",
      };
    }

    const {
      data: { accessToken, refreshToken },
    } = await response.json();

    // set access and refresh tokens in cookies
    await setCookie({
      name: "accessToken",
      value: accessToken,
      maxAge: 60 * 60, // 1 hour
    });
    await setCookie({
      name: "refreshToken",
      value: refreshToken,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}

export async function logout(): Promise<LoginResult> {
  try {
    await deleteCookie("accessTooken");
    await deleteCookie("refreshToken");
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}

export async function register(credentials: {
  fullName: string;
  email: string;
  password: string;
  role: string;
}): Promise<LoginResult> {
  try {
    const response = await fetch(`${api_url}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();

      return {
        success: false,
        error: errorData.message || "Registration failed",
      };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unknown error occurred." };
  }
}

// Cache the entire loggedInUser function
export const loggedInUser = cache(
  async (): Promise<{
    success: boolean;
    user?: USER;
    error?: string;
  }> => {
    try {
      let accessToken = await getCookie("accessToken");
      const refreshToken = await getCookie("refreshToken");

      if (!accessToken || !refreshToken) {
        return { success: false, error: "User not authenticated" };
      }

      let response = await fetch(`${api_url}/api/v1/auth/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        // You can add a revalidate option here if you want to control the cache duration
        // next: { revalidate: 60 * 5 } // Revalidate every 5 minutes
      });

      if (response.status === 401) {
        console.log("Access token expired. Attempting to refresh...");

        const refreshResult = await getNewAccessToken();

        if (!refreshResult.success) {
          // If refresh fails, clear cookies and return authentication error
          await deleteCookie("accessToken");
          await deleteCookie("refreshToken");
          return {
            success: false,
            error: refreshResult.error || "Failed to refresh access token",
          };
        }

        console.log(
          "Token refreshed successfully. Retrying the original request..."
        );
        accessToken = refreshResult.accessToken;

        response = await fetch(`${api_url}/api/v1/auth/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          // Ensure this retry also respects revalidation if specified above
        });
      }

      if (!response.ok) {
        const result = await response.json();
        // If the second attempt is also unauthorized, it means something is fundamentally wrong
        // Clear tokens for security
        if (response.status === 401 || response.status === 403) {
          await deleteCookie("accessToken");
          await deleteCookie("refreshToken");
        }
        return {
          success: false,
          error: result.message || "Failed to fetch user after retry",
        };
      }

      const result = await response.json();
      return { success: true, user: result.data };
    } catch (error) {
      if (error instanceof Error) {
        return { success: false, error: error.message };
      }
      return { success: false, error: "An unknown error occurred." };
    }
  }
);

let maxTry = 0;

export async function getNewAccessToken(): Promise<{
  success: boolean;
  accessToken?: string;
  error?: string;
}> {
  try {
    const refreshToken = await getCookie("refreshToken");

    if (!refreshToken) {
      await deleteCookie("accessToken");
      return { success: false, error: "No refresh token found" };
    }

    // Prevents infinite loops
    maxTry++;
    if (maxTry >= 3) {
      await deleteCookie("accessTooken");
      await deleteCookie("refreshToken");
      maxTry = 0; // Reset after hitting the limit
      return {
        success: false,
        error: "Failed to refresh token after multiple attempts.",
      };
    }

    const response = await fetch(`${api_url}/api/v1/auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      const result = await response.json();
      return {
        success: false,
        error: result.message || "Failed to refresh access token",
      };
    }

    const result = await response.json();
    const newAccessToken = result.data.accessToken;

    await setCookie({
      name: "accessToken",
      value: newAccessToken,
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Reset the counter on a successful refresh
    maxTry = 0;

    // Return the new token directly
    return { success: true, accessToken: newAccessToken };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "An unknown error occurred while refreshing token.",
    };
  }
}

export const setCookie = async ({
  name,
  value,
  maxAge = 60 * 60, // Default to 1 hour
}: {
  name: string;
  value: string;
  maxAge: number;
}): Promise<void> => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    maxAge,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
};

export const deleteCookie = async (name: string): Promise<void> => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
};
export const getCookie = async (name: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
};

import { revalidateTag } from "next/cache";

export default async function action() {
  revalidateTag("quizzes");
  revalidateTag("users");
  revalidateTag("user");
}
