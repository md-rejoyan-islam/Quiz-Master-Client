"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, Edit, Plus, Target, Trash2 } from "lucide-react";
import { useState } from "react";
// Import Shadcn UI Dialog components
import {
  ICreateQuestionFormData,
  ICreateQuizSet,
  TCreateQuizStep,
} from "@/lib/types";
import BasicForm from "./basic-form";
import CreateQuizFooter from "./create-quiz-footer";
import CreateStep from "./create-step";
import EditQuestionDialog from "./edit-question-dialog";
import ProgressSteps from "./progress-steps";
import QuestionForm from "./question-form";

const CreateQuizClient = () => {
  const [currentStep, setCurrentStep] = useState<TCreateQuizStep>("basic");
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "",
    label: "" as "Easy" | "Medium" | "Hard",
    tags: [] as string[],
  });
  const [questions, setQuestions] = useState<ICreateQuestionFormData[]>([]);

  // State for the edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] =
    useState<ICreateQuestionFormData | null>(null);

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  // Function to handle saving quiz as draft or published
  const handleSaveQuiz = (isPublished: boolean) => {
    const newQuiz: ICreateQuizSet = {
      title: quizData.title,
      description: quizData.description,
      category: quizData.category,
      label: quizData.label,
      tags: quizData.tags,
      questions: questions,
      createdAt: new Date().toISOString(),
      status: isPublished ? "published" : "draft",
    };

    // Replace with actual API call or prop function: onSave(newQuiz);
    console.log("Saving Quiz:", newQuiz); // For demonstration purposes
    alert(
      `Quiz saved as ${isPublished ? "Published" : "Draft"}! Check console.`
    );
    // Optionally close modal or redirect after saving
  };

  const nextStep = () => {
    if (currentStep === "basic" && quizData.title) {
      setCurrentStep("questions");
    } else if (currentStep === "questions" && questions.length > 0) {
      setCurrentStep("review");
    }
  };

  const prevStep = () => {
    if (currentStep === "questions") {
      setCurrentStep("basic");
    } else if (currentStep === "review") {
      setCurrentStep("questions");
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  };

  const handleEditQuestion = (question: ICreateQuestionFormData) => {
    setQuestionToEdit({ ...question });
    setIsEditDialogOpen(true);
  };

  return (
    <div>
      <CreateStep currentStep={currentStep} />
      <div className="px-8 py-6 space-y-4">
        {/* Progress Steps */}
        <ProgressSteps currentStep={currentStep} />
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className=" bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20  shadow-2xl w-full "
            onClick={(e) => e.stopPropagation()}
          >
            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {currentStep === "basic" && (
                  <BasicForm
                    setQuizData={setQuizData}
                    quizData={quizData}
                    nextStep={nextStep}
                  />
                )}

                {currentStep === "questions" && (
                  <motion.div
                    key="questions"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className=" grid lg:grid-cols-2  gap-8"
                  >
                    {/* Add Question Form */}
                    <div className="">
                      <h3 className="text-lg  justify-center font-bold text-white mb-4 flex items-center space-x-2">
                        <Plus className="h-5 w-5" />
                        <span>Add New Question</span>
                      </h3>

                      <div className="bg-slate-700/30 rounded-2xl p-6 border border-purple-500/20">
                        <h2 className="text-2xl font-bold text-white mb-6">
                          Create New Question
                        </h2>
                        <QuestionForm setQuestions={setQuestions}>
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full mt-3 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                          >
                            <Plus className="h-4 w-4" />
                            <span>Add Question</span>
                          </motion.button>
                        </QuestionForm>
                      </div>
                    </div>

                    {/* Questions List */}
                    <div className="lg:hidden py-2">
                      <hr className="border-purple-500/30" />
                    </div>

                    <div className="relative overflow-hidden  w-full h-full">
                      <h3 className="text-lg justify-center font-bold text-white mb-4 flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span>Questions ({questions.length})</span>
                      </h3>
                      {questions.length ? (
                        <div className="overflow-y-auto h-full pb-16 mt-1 w-full z-20 lg:absolute top-10  left-0">
                          <div className="space-y-4">
                            {questions.map((question, index) => (
                              <motion.div
                                key={question.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/20"
                              >
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <h4 className="font-semibold text-white mb-2">
                                      {index + 1}. {question.question}
                                    </h4>
                                    <div className="text-sm text-gray-400 mb-2">
                                      Mark:{" "}
                                      <span className="text-purple-300">
                                        {question.mark}
                                      </span>{" "}
                                      | Time:{" "}
                                      <span className="text-purple-300">
                                        {question.time}s
                                      </span>
                                    </div>
                                    <div className="space-y-1">
                                      {question.options.map(
                                        (option, optIndex) => (
                                          <div
                                            key={optIndex}
                                            className={`text-sm px-3 py-1 rounded ${
                                              question.answerIndices.includes(
                                                optIndex
                                              )
                                                ? "bg-green-600/20 text-green-300 border border-green-500/30"
                                                : "text-gray-400"
                                            }`}
                                          >
                                            {String.fromCharCode(65 + optIndex)}
                                            . {option}
                                          </div>
                                        )
                                      )}
                                    </div>
                                    {question.explanation && (
                                      <p className="text-sm text-blue-300 mt-2 italic">
                                        Explanation: {question.explanation}
                                      </p>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <motion.button
                                      onClick={() =>
                                        handleEditQuestion(question)
                                      }
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg transition-colors"
                                    >
                                      <Edit className="h-4 w-4" />
                                    </motion.button>
                                    <motion.button
                                      onClick={() =>
                                        handleRemoveQuestion(question.id)
                                      }
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </motion.button>
                                  </div>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/20">
                          <p className="text-center text-red-200">
                            No Question added!
                          </p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === "review" && (
                  <motion.div
                    key="review"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="bg-slate-700/30 rounded-2xl p-6 border border-purple-500/20">
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                        <CheckCircle className="h-6 w-6" />
                        <span>Quiz Summary</span>
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="font-semibold text-purple-300 mb-2">
                            Basic Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-400">Title:</span>{" "}
                              <span className="text-white">
                                {quizData.title}
                              </span>
                            </p>
                            <p>
                              <span className="text-gray-400">Category:</span>{" "}
                              <span className="text-white">
                                {quizData.category}
                              </span>
                            </p>
                            <p>
                              <span className="text-gray-400">Difficulty:</span>{" "}
                              <span className="text-white">
                                {quizData.label}
                              </span>
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-purple-300 mb-2">
                            Content
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="text-gray-400">Questions:</span>{" "}
                              <span className="text-white">
                                {questions.length}
                              </span>
                            </p>
                            <p>
                              <span className="text-gray-400">Tags:</span>{" "}
                              <span className="text-white">
                                {quizData.tags.length > 0
                                  ? quizData.tags.join(", ")
                                  : "None"}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-purple-300 mb-2">
                          Description
                        </h4>
                        <p className="text-gray-300 text-sm">
                          {quizData.description}
                        </p>
                      </div>
                    </div>

                    <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-4">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <p className="text-green-300 font-medium">
                          Quiz is ready to be saved!
                        </p>
                      </div>
                      <p className="text-green-400 text-sm mt-1">
                        Your quiz will be created and available for students to
                        take.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <CreateQuizFooter
              currentStep={currentStep}
              handleSaveQuiz={handleSaveQuiz}
              nextStep={nextStep}
              prevStep={prevStep}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Question Dialog (Shadcn UI) */}
      <EditQuestionDialog
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        questionToEdit={questionToEdit}
        setQuestions={setQuestions}
      />
    </div>
  );
};

export default CreateQuizClient;
