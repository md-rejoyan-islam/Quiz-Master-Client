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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { QUIZ_SET } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { attemptQuiz } from "@/query/quizzes";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const QuizPage = ({ quiz, token }: { quiz: QUIZ_SET; token?: string }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [startQuiz, setStartQuiz] = useState(!quiz.questions.length);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // console.log(quiz);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: (number | string)[];
  }>({});

  // handle starting the quiz
  const handleStartQuiz = () => {
    setStartQuiz(true);
    setTimeTaken(0);

    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setTimeTaken((prev) => prev + 1);
    }, 1000);
  };

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
  const handleSubmit = async () => {
    const questionWithAnswers = quiz.questions.map((question) => ({
      questionId: question.id,
      answerIndices: question.options
        .map((option, index) =>
          selectedAnswers[question.id]?.includes(option) ? index : null
        )
        .filter((index) => index !== null) as number[],
    }));
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const result = questionWithAnswers.reduce<Record<string, number[]>>(
      (acc, current) => {
        acc[current.questionId] = current.answerIndices;
        return acc;
      },
      {}
    );

    const payload = {
      submittedAnswers: result,
      time: timeTaken,
    };

    const { data, error } = await attemptQuiz(quiz.id, payload, token);

    if (error) {
      toast.error(error);
    } else {
      router.push(`/quizzes/${quiz.id}/results?score=${data?.score}`);
    }
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
            <div className="flex justify-between text-sm text-white/70">
              <span>Time taken:</span>
              <span>{formatTime(timeTaken)}</span>
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
        {!startQuiz && quiz.questions.length && (
          <div className="flex items-center h-full justify-center">
            <Button
              onClick={handleStartQuiz}
              className="w-36 h-36 rounded-full mx-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
            >
              Start Quiz
            </Button>
          </div>
        )}

        {startQuiz && (
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
        )}

        {quiz.questions.length > 0 && startQuiz && (
          <div
            className={clsx(
              "flex ",
              currentQuestionIndex === 0
                ? "justify-between"
                : "justify-between",
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
                <AlertDialogContent className="bg-slate-900 text-white border border-slate-700/50">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to submit?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-gray-400">
                      This action cannot be undone. You will see your results
                      after submitting.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleSubmit}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700"
                    >
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
        )}
      </div>
    </div>
  );
};

export default QuizPage;
