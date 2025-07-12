import { getCookie } from "@/app/actions";
import SectionSubtitle from "@/components/main/home/section-subtitle";
import SectionTitle from "@/components/main/home/section-title";
import CircularBar from "@/components/main/result/circular-progress-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getQuizById, showAttemptedQuizResults } from "@/query/quizzes";
import clsx from "clsx";
import { Metadata } from "next";
import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;

  const { data } = await getQuizById(id);

  return {
    title: data?.title ? `Result | ${data.title}` : "Quiz Not Found",
    description: data?.description || "Quiz results not available",
  };
}

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: quizId } = await params;

  const token = await getCookie("accessToken");
  const { data, error } = await showAttemptedQuizResults(quizId, token);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent via-transparent to-slate-900 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500">Error</h1>
          <p className="text-lg text-gray-300 mt-4">{error}</p>
          <Link
            href={`/quizzes/${quizId}`}
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Go Back to Quiz
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=" bg-gradient-to-b from-transparent via-transparent to-slate-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle secondLine={data?.title} firstLine="" />
        <SectionSubtitle title={data?.description || ""} />

        <div className="grid md:grid-cols-2 mt-4 grid-cols-1 items-center gap-8">
          <div className=" space-y-4 text-lg shadow-md p-6 rounded-xl h-full bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50  order-2 md:order-1">
            <div className="flex justify-between   text-white/80">
              <span>Questions:</span>
              <span>{data?.questions.length}</span>
            </div>
            <div className="flex justify-between  text-white/80">
              <span>Correct:</span>
              <span>{data?.correct}</span>
            </div>
            <div className="flex justify-between  text-white/80">
              <span>Wrong:</span>
              <span>{data?.wrong}</span>
            </div>

            <div className="pt-3">
              <Link
                href={`/quizzes/${quizId}/leaderboard`}
                className=" bg--600  bg-gradient-to-r from-purple-600 to-blue-600 text-white
                hover:bg-gradient-to-l hover:from-purple-600 hover:to-blue-600 py-2 px-3.5 rounded-md text-sm"
              >
                View Leaderboard
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 grid grid-cols-2 gap-4 items-center shadow-md  p-6  rounded-md h-full bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 text-white ">
            <div>
              <h3 className="text-3xl font-bold">
                {data?.correct}/{data?.questions.length}
              </h3>
              <p>Your Mark</p>
            </div>
            <CircularBar
              value={
                data?.correct
                  ? Math.round((data?.correct / data?.questions.length) * 100)
                  : 0
              }
              text={
                data?.correct
                  ? `${Math.round(
                      (data?.correct / data?.questions.length) * 100
                    )}`
                  : "0"
              }
            />
          </div>
        </div>

        <div className="space-y-8 py-10 text-white">
          <h2 className="text-2xl font-bold py-4 text-center mb-4">
            Question Review
          </h2>

          <div className="grid md:grid-cols-2 gap-6 ">
            {data?.questions.map((question, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 text-white/80  shadow-sm  rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {index + 1}. {question.question}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex + "" + index}>
                      <div
                        className={clsx(
                          "flex items-center px-1 py-1 rounded-md  space-x-2",
                          question.answerIndices.includes(optionIndex)
                            ? "bg-green-500/30 text-green-400"
                            : data?.submittedAnswers[question.id]?.includes(
                                optionIndex
                              )
                            ? "bg-red-500/30 text-red-400"
                            : "bg-slate-700/20"
                        )}
                      >
                        <Checkbox
                          id={`option-${index}`}
                          checked={
                            data?.submittedAnswers[question.id]?.includes(
                              optionIndex
                            ) || false
                          }
                          className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-400 data-[state-checked]:border-none border-blue-600 dark:border-blue-400 data-[state=checked]:text-primary-foreground"
                        />
                        <Label
                          htmlFor={`option-${index}`}
                          className="text-base text-white/70 cursor-pointer"
                        >
                          {option}
                        </Label>
                      </div>
                    </div>
                  ))}
                  {/* {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className={`p-2 rounded ${
                        question.correctAnswers.includes(optionIndex)
                          ? "bg-green-500/20 text-green-300"
                          : userAnswers[question.id]?.includes(optionIndex)
                          ? "bg-red-500/20 text-red-300"
                          : "bg-gray-700"
                      }`}
                    >
                      {option}
                      {question.correctAnswers.includes(optionIndex) && (
                        <CheckCircle2 className="inline-block ml-2 w-5 h-5 text-green-500" />
                      )}
                      {!question.correctAnswers.includes(optionIndex) &&
                        userAnswers[question.id]?.includes(optionIndex) && (
                          <XCircle className="inline-block ml-2 w-5 h-5 text-red-500" />
                        )}
                    </div>
                  ))} */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
