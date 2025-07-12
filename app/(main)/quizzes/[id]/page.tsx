import SectionSubtitle from "@/components/main/home/section-subtitle";
import SectionTitle from "@/components/main/home/section-title";
import QuizPage from "@/components/main/quiz/quiz-page";
import { QUIZ_SET_LABEL, QUIZ_SET_STATUS } from "@/lib/types";
import { getQuizById } from "@/query/quizzes";
import Link from "next/link";

import { getCookie } from "@/app/actions";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const { data, error } = await getQuizById(id);

  return {
    title: data?.title || "Quiz Not Found",
    description: data?.description || error,
  };
}

export default async function Quiz({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const token = await getCookie("accessToken");

  const { data: quiz, error } = await getQuizById(id);

  return (
    <>
      {quiz ? (
        <section className="min-h-[calc(100vh-65px)] py-12 md:py-20 bg-gradient-to-b from-transparent h-full  via-transparent to-slate-900">
          <div className="px-4 max-w-7xl mx-auto  ">
            <SectionTitle secondLine={quiz.title} firstLine="" />
            <SectionSubtitle title={quiz.description} />

            <QuizPage
              quiz={{
                ...quiz,
                status: quiz.status as QUIZ_SET_STATUS,
                label: quiz.label as QUIZ_SET_LABEL,
              }}
              token={token}
            />
          </div>
        </section>
      ) : (
        <section className="min-h-[calc(100vh-65px)] flex items-center justify-center py-12 md:py-20 bg-gradient-to-b from-transparent h-full  via-transparent to-slate-900">
          <div className="px-4 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-white">
              Quiz Not Found
            </h1>
            <p className="text-lg text-center text-gray-300 mt-4">
              {error || "The quiz you are looking for does not exist."}
            </p>
            <div className="mt-8 text-center">
              <Link
                href="/quizzes"
                className="inline-block px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                Back to Quizzes
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
