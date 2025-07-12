import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const successResponse = <T>(data: T) => {
  return {
    status: true,
    data,
    error: null,
  };
};

export const errorResponse = (error: string) => {
  return {
    status: false,
    data: null,
    error,
  };
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes} minute${minutes !== 1 ? "s" : ""} ${
    remainingSeconds > 0
      ? `and ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`
      : ""
  }`;
};
