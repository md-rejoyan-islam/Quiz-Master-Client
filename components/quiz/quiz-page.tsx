"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { QUIZ_SET } from "@/lib/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

const QuizPage = ({ quiz, id }: { quiz: QUIZ_SET; id: string }) => {
  console.log(quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: (number | string)[];
  }>({});

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleOptionToggle = (option: string | number) => {
    setSelectedAnswers((prev) => {
      const current = prev[currentQuestion.id] || [];

      if (current?.includes(option)) {
        return {
          ...prev,
          [currentQuestion.id]: current.filter((i) => i !== option),
        };
      } else {
        return { ...prev, [currentQuestion.id]: [...current, option] };
      }
    });
  };

  const participationCount = Object.values(selectedAnswers).filter(
    (val) => val.length >= 1
  ).length;

  const handleNext = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const router = useRouter();
  const handleSubmit = () => {
    const results = quiz.questions.map((question) => ({
      questionId: question.id,
      correct:
        JSON.stringify(selectedAnswers[question.id]?.sort()) ===
        JSON.stringify(question.correctAnswers.sort()),
    }));

    const score = results.filter((r) => r.correct).length;
    router.push(
      `/quizzes/${id}/results?score=${score}&total=${quiz.questions.length}`
    );
  };
  return (
    <div className="flex mt-6 flex-col md:flex-row gap-8 mb-8">
      <div className="w-full md:w-1/2">
        <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 shadow-md rounded-lg p-6 h-full">
          <h3 className="text-lg font-semibold mb-4 text-white">
            Quiz Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between  text-sm text-white/70">
              <span>Total questions:</span>
              <span>{quiz.questions.length}</span>
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span>Participation:</span>
              <span>{participationCount}</span>
            </div>
            <div className="flex justify-between text-sm text-white/70">
              <span>Remaining:</span>
              <span>{quiz.questions.length - participationCount}</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2.5 ">
              <div
                className="bg-pink-600 h-2.5 rounded-full"
                style={{
                  width: `${
                    (participationCount / quiz.questions.length) * 100
                  }%`,
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <div className="bg-gradient-to-r from-slate-900/60 to-slate-900/40 border border-slate-700/50 rounded-lg p-6 mb-6 shadow-md">
          {quiz.questions.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-6 text-white">
                {currentQuestionIndex + 1}. {currentQuestion.question}
              </h2>
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Checkbox
                      id={`option-${index}`}
                      checked={
                        selectedAnswers[currentQuestion?.id]?.includes(
                          option
                        ) || false
                      }
                      className="data-[state=checked]:bg-purple-600 border-purple-600  data-[state-checked]:border-none   data-[state=checked]:text-primary-foreground"
                      onCheckedChange={() => handleOptionToggle(option)}
                    />
                    <Label
                      htmlFor={`option-${index}`}
                      className="text-base text-white/70 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="text-white/70">No questions available</p>
          )}
        </div>

        <div
          className={clsx(
            "flex ",
            currentQuestionIndex === 0 ? "justify-between" : "justify-between",
            quiz.questions.length === 0 && "hidden"
          )}
        >
          {
            <Button
              onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
          }
          {currentQuestionIndex === quiz.questions.length - 1 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="outline"
                  className="bg-gradient-to-r border-none hover:text-white from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                >
                  Submit Quiz
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to submit?
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. You will see your results
                    after submitting.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleSubmit}>
                    Submit
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}

          {currentQuestionIndex < quiz.questions.length - 1 && (
            <Button
              onClick={handleNext}
              disabled={currentQuestionIndex === quiz.questions.length - 1}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPage;
