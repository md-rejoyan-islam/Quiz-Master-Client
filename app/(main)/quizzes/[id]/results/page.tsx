import SectionSubtitle from "@/components/home/section-subtitle";
import SectionTitle from "@/components/home/section-title";
import CircularBar from "@/components/result/circular-progress-bar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import clsx from "clsx";
import Link from "next/link";
import "react-circular-progressbar/dist/styles.css";

// Mock data - replace with actual API call in production
const quizData = {
  id: 1,
  title: "React Hooks Quiz",
  description:
    "A quiz on React hooks like useState, useEffect, and useContext.",
  questions: [
    {
      id: 1,
      text: "Which of the following is NOT a binary tree traversal method?",
      options: ["Inorder", "Preorder", "Postorder", "Crossorder"],
      correctAnswers: [3],
    },
    {
      id: 2,
      text: "What is the maximum number of nodes at level 'L' in a binary tree?",
      options: ["2^L", "L", "2^(L-1)", "2L"],
      correctAnswers: [0],
    },
    {
      id: 3,
      text: "What is the height of an empty binary tree?",
      options: ["0", "-1", "1", "Undefined"],
      correctAnswers: [1],
    },
  ],
};

export default async function ResultsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: quizId } = await params;

  const userAnswers: { [key: number]: number[] } = {
    1: [3],
    2: [0],
    3: [0],
  };

  return (
    <div className=" bg-gradient-to-b from-transparent via-transparent to-slate-900 px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <SectionTitle secondLine={quizData.title} firstLine="" />
        <SectionSubtitle title={quizData.description} />

        <div className="grid md:grid-cols-2 mt-4 grid-cols-1 items-center gap-8">
          <div className=" space-y-4 text-lg shadow-md p-6 rounded-xl h-full bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50  order-2 md:order-1">
            <div className="flex justify-between   text-white/80">
              <span>Questions:</span>
              <span>10</span>
            </div>
            <div className="flex justify-between  text-white/80">
              <span>Correct:</span>
              <span>{3}</span>
            </div>
            <div className="flex justify-between  text-white/80">
              <span>Wrong:</span>
              <span>{2}</span>
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
              <h3 className="text-3xl font-bold">5/10</h3>
              <p>Your Mark</p>
            </div>
            <CircularBar value={65} text={`65`} />
          </div>
        </div>

        <div className="space-y-8 py-10 text-white">
          <h2 className="text-2xl font-bold py-4 text-center mb-4">
            Question Review
          </h2>

          <div className="grid md:grid-cols-2 gap-6 ">
            {quizData.questions.map((question, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 text-white/80  shadow-sm  rounded-lg p-6"
              >
                <h3 className="text-xl font-semibold mb-4">
                  {index + 1}. {question.text}
                </h3>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex + "" + index}>
                      <div
                        className={clsx(
                          "flex items-center px-1 py-1 rounded-md  space-x-2",
                          question.correctAnswers.includes(optionIndex)
                            ? "bg-green-500/30 text-green-400"
                            : userAnswers[question.id]?.includes(optionIndex)
                            ? "bg-red-500/30 text-red-400"
                            : "bg-slate-700/20"
                        )}
                      >
                        <Checkbox
                          id={`option-${index}`}
                          checked={
                            userAnswers[question.id]?.includes(optionIndex) ||
                            false
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
