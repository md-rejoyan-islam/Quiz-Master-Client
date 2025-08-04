import { getCookie } from "@/app/actions";
import QuizLeaderboard from "@/components/main/quiz/quiz-leaderboard";
import { getAllAttemptsByQuizId, getQuizById } from "@/query/quizzes";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quiz Leaderboard",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default async function QuizLeaderboardPage({
  params,
}: {
  readonly params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getCookie("accessToken");
  const { data, error } = await getAllAttemptsByQuizId(id, token);
  const { data: quiz } = await getQuizById(id);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent via-transparent to-slate-900 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500">Error</h1>
          <p className="text-lg text-gray-300 mt-4">{error}</p>
          <Link
            href={`/quizzes/${id}`}
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go Back to Quiz
          </Link>
        </div>
      </div>
    );
  }

  return <QuizLeaderboard data={data} quiz={quiz} />;
}
