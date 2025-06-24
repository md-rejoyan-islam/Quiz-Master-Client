"use client";

import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import { Checkbox } from "@/components/ui/checkbox";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CheckCircle,
  Edit,
  FileText,
  HelpCircle,
  Plus,
  Save,
  Sparkles,
  Target,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";
// Import Shadcn UI Dialog components
import { Button } from "@/components/ui/button"; // Assuming Shadcn Button component is available
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  tags?: string[];
  rating?: number;
  completions?: number;
  createdAt?: string;
  createdBy?: string;
  isActive?: boolean;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number[]; // Changed to number[] for multiple correct answers
  explanation?: string;
  mark: number; // Added mark
  time: number; // Added time in seconds
}

interface CreateQuizModalProps {
  onClose: () => void;
  onSave: (quiz: Quiz) => void;
}

type Step = "basic" | "questions" | "review";

const Page = () => {
  const [currentStep, setCurrentStep] = useState<Step>("basic");
  const [quizData, setQuizData] = useState({
    title: "",
    description: "",
    category: "Mathematics",
    difficulty: "Medium" as "Easy" | "Medium" | "Hard",
    timeLimit: 15,
    tags: [] as string[],
  });
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: [] as number[],
    explanation: "",
    mark: 5, // Default mark for the question
    time: 30, // Default time in seconds for the question
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State for the edit dialog
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [editErrors, setEditErrors] = useState<{ [key: string]: string }>({}); // Separate errors for edit dialog

  const categories = [
    "Mathematics",
    "Science",
    "History",
    "Literature",
    "Technology",
    "Arts",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  const validateBasicInfo = () => {
    const newErrors: { [key: string]: string } = {};

    if (!quizData.title.trim()) {
      newErrors.title = "Quiz title is required";
    }
    if (!quizData.description.trim()) {
      newErrors.description = "Quiz description is required";
    }
    if (quizData.timeLimit < 1 || quizData.timeLimit > 120) {
      newErrors.timeLimit = "Time limit must be between 1 and 120 minutes";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestion = (
    questionData: Question | typeof currentQuestion,
    isEditing = false
  ) => {
    const newErrors: { [key: string]: string } = {};

    if (!questionData.question.trim()) {
      newErrors.question = "Question text is required";
    }

    const filledOptions = questionData.options.filter((opt) => opt.trim());
    if (filledOptions.length < 2) {
      newErrors.options = "At least 2 options are required";
    }

    if (questionData.correctAnswer.length === 0) {
      newErrors.correctAnswer = "At least one correct answer must be selected";
    } else {
      const invalidCorrectAnswers = questionData.correctAnswer.some(
        (index) => !questionData.options[index]?.trim()
      );
      if (invalidCorrectAnswers) {
        newErrors.correctAnswer = "Selected correct answer(s) cannot be empty";
      }
    }

    if (questionData.mark < 1 || questionData.mark > 100) {
      newErrors.mark = "Mark must be between 1 and 100";
    }

    if (questionData.time < 5 || questionData.time > 300) {
      newErrors.time = "Time must be between 5 and 300 seconds";
    }

    if (isEditing) {
      setEditErrors(newErrors);
    } else {
      setErrors(newErrors);
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !quizData.tags.includes(tagInput.trim())) {
      setQuizData({
        ...quizData,
        tags: [...quizData.tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setQuizData({
      ...quizData,
      tags: quizData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const handleAddQuestion = () => {
    if (validateQuestion(currentQuestion)) {
      const newQuestion: Question = {
        id: Date.now().toString(),
        question: currentQuestion.question,
        options: currentQuestion.options.filter((opt) => opt.trim()),
        correctAnswer: currentQuestion.correctAnswer,
        explanation: currentQuestion.explanation || undefined,
        mark: currentQuestion.mark,
        time: currentQuestion.time,
      };

      setQuestions([...questions, newQuestion]);
      setCurrentQuestion({
        question: "",
        options: ["", "", "", ""],
        correctAnswer: [],
        explanation: "",
        mark: 5,
        time: 30,
      });
      setErrors({});
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    setQuestions(questions.filter((q) => q.id !== questionId));
  };

  // Function to handle saving quiz as draft or published
  const handleSaveQuiz = (isPublished: boolean) => {
    if (questions.length === 0) {
      setErrors({ questions: "At least one question is required" });
      return;
    }

    const newQuiz: Quiz = {
      id: "", // This would typically be generated by a backend upon save
      title: quizData.title,
      description: quizData.description,
      category: quizData.category,
      difficulty: quizData.difficulty,
      timeLimit: quizData.timeLimit,
      tags: quizData.tags,
      questions: questions,
      createdAt: new Date().toISOString(),
      isActive: isPublished, // Set isActive based on button clicked
      rating: 0,
      completions: 0,
    };

    // Replace with actual API call or prop function: onSave(newQuiz);
    console.log("Saving Quiz:", newQuiz); // For demonstration purposes
    alert(
      `Quiz saved as ${isPublished ? "Published" : "Draft"}! Check console.`
    );
    // Optionally close modal or redirect after saving
  };

  const nextStep = () => {
    if (currentStep === "basic" && validateBasicInfo()) {
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

  // --- Edit Question Dialog Logic ---
  const handleEditQuestion = (question: Question) => {
    // Create a deep copy to avoid direct mutation of the question in the main array
    setQuestionToEdit({ ...question });
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedQuestion = () => {
    if (!questionToEdit) return;

    if (validateQuestion(questionToEdit, true)) {
      // Pass true to use editErrors
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionToEdit.id ? questionToEdit : q
        )
      );
      setIsEditDialogOpen(false);
      setQuestionToEdit(null); // Clear the edited question data
      setEditErrors({}); // Clear errors after successful save
    }
  };
  // --- End Edit Question Dialog Logic ---

  return (
    <div>
      <DashboardPageHeader
        label="Create new quiz set"
        description="Create and manage quiz content"
      />
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-xl">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Create New Quiz</h2>
            <p className="text-gray-400">
              {currentStep === "basic" && "Set up basic quiz information"}
              {currentStep === "questions" && "Add questions to your quiz"}
              {currentStep === "review" && "Review and save your quiz"}
            </p>
          </div>
        </div>
      </div>
      <div className="px-8 py-6 space-y-4">
        {/* Progress Steps */}
        <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-purple-500/20  shadow-2xl w-full">
          <div className="flex items-center flex-wrap gap-6 justify-center ">
            {[
              { id: "basic", label: "Basic Info", icon: FileText },
              { id: "questions", label: "Questions", icon: HelpCircle },
              { id: "review", label: "Review", icon: CheckCircle },
            ].map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted =
                (step.id === "basic" &&
                  (currentStep === "questions" || currentStep === "review")) ||
                (step.id === "questions" && currentStep === "review");

              return (
                <div key={step.id} className="flex items-center ">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                      isActive
                        ? "bg-purple-600 text-white"
                        : isCompleted
                        ? "bg-green-600 text-white"
                        : "bg-slate-700 text-gray-400"
                    }`}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="font-medium truncate">{step.label}</span>
                  </motion.div>
                  {index < 2 && (
                    <ArrowRight className="h-4 w-4 text-gray-600 mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
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
                  <motion.div
                    key="basic"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    {/* Title */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quiz Title *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="text"
                        value={quizData.title}
                        onChange={(e) =>
                          setQuizData({ ...quizData, title: e.target.value })
                        }
                        className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.title
                            ? "border-red-500"
                            : "border-purple-500/30"
                        }`}
                        placeholder="Enter quiz title..."
                      />
                      {errors.title && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.title}
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Description *
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.02 }}
                        value={quizData.description}
                        onChange={(e) =>
                          setQuizData({
                            ...quizData,
                            description: e.target.value,
                          })
                        }
                        rows={3}
                        className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                          errors.description
                            ? "border-red-500"
                            : "border-purple-500/30"
                        }`}
                        placeholder="Describe what this quiz covers..."
                      />
                      {errors.description && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.description}
                        </p>
                      )}
                    </div>

                    {/* Category and Difficulty */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          value={quizData.category}
                          onChange={(e) =>
                            setQuizData({
                              ...quizData,
                              category: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Difficulty
                        </label>
                        <select
                          value={quizData.difficulty}
                          onChange={(e) =>
                            setQuizData({
                              ...quizData,
                              difficulty: e.target.value as
                                | "Easy"
                                | "Medium"
                                | "Hard",
                            })
                          }
                          className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                        >
                          {difficulties.map((difficulty) => (
                            <option key={difficulty} value={difficulty}>
                              {difficulty}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Time Limit */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Quiz Time Limit (minutes) *
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.02 }}
                        type="number"
                        min="1"
                        max="120"
                        value={quizData.timeLimit}
                        onChange={(e) =>
                          setQuizData({
                            ...quizData,
                            timeLimit: parseInt(e.target.value) || 15,
                          })
                        }
                        className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                          errors.timeLimit
                            ? "border-red-500"
                            : "border-purple-500/30"
                        }`}
                      />
                      {errors.timeLimit && (
                        <p className="text-red-400 text-sm mt-1">
                          {errors.timeLimit}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Tags (Optional)
                      </label>
                      <div className="flex space-x-2 mb-3">
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          value={tagInput}
                          onChange={(e) => setTagInput(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleAddTag()
                          }
                          className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder="Add a tag..."
                        />
                        <motion.button
                          onClick={handleAddTag}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </motion.button>
                      </div>
                      {quizData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {quizData.tags.map((tag, index) => (
                            <motion.span
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm flex items-center space-x-2 border border-purple-500/30"
                            >
                              <span>{tag}</span>
                              <motion.button
                                onClick={() => handleRemoveTag(tag)}
                                whileHover={{ scale: 1.2 }}
                                className="text-purple-400 hover:text-purple-300"
                              >
                                <X className="h-3 w-3" />
                              </motion.button>
                            </motion.span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
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

                      <div className="bg-slate-700/30 rounded-2xl  p-6 border border-purple-500/20">
                        {/* Question Text */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Question *
                          </label>
                          <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            value={currentQuestion.question}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                question: e.target.value,
                              })
                            }
                            rows={2}
                            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                              errors.question
                                ? "border-red-500"
                                : "border-purple-500/30"
                            }`}
                            placeholder="Enter your question..."
                          />
                          {errors.question && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.question}
                            </p>
                          )}
                        </div>

                        {/* Options */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Answer Options *
                          </label>
                          <div className="space-y-3">
                            {currentQuestion.options.map(
                              (option: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center space-x-3"
                                >
                                  <Checkbox
                                    checked={currentQuestion.correctAnswer.includes(
                                      index
                                    )}
                                    onCheckedChange={(checked) => {
                                      setCurrentQuestion((prev) => {
                                        const newCorrectAnswers = checked
                                          ? [...prev.correctAnswer, index]
                                          : prev.correctAnswer.filter(
                                              (i) => i !== index
                                            );
                                        return {
                                          ...prev,
                                          correctAnswer: newCorrectAnswers.sort(
                                            (a, b) => a - b
                                          ), // Keep sorted
                                        };
                                      });
                                    }}
                                  />
                                  <motion.input
                                    whileFocus={{ scale: 1.02 }}
                                    type="text"
                                    value={option}
                                    onChange={(e) => {
                                      const newOptions = [
                                        ...currentQuestion.options,
                                      ];
                                      newOptions[index] = e.target.value;
                                      setCurrentQuestion({
                                        ...currentQuestion,
                                        options: newOptions,
                                      });
                                    }}
                                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                                    placeholder={`Option ${index + 1}...`}
                                  />
                                </div>
                              )
                            )}
                          </div>
                          {errors.options && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.options}
                            </p>
                          )}
                          {errors.correctAnswer && (
                            <p className="text-red-400 text-sm mt-1">
                              {errors.correctAnswer}
                            </p>
                          )}
                        </div>

                        {/* Mark and Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Mark *
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="number"
                              min="1"
                              max="100"
                              value={currentQuestion.mark}
                              onChange={(e) =>
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  mark: parseInt(e.target.value) || 5,
                                })
                              }
                              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                errors.mark
                                  ? "border-red-500"
                                  : "border-purple-500/30"
                              }`}
                            />
                            {errors.mark && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors.mark}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                              Time (seconds) *
                            </label>
                            <motion.input
                              whileFocus={{ scale: 1.02 }}
                              type="number"
                              min="5"
                              max="300"
                              value={currentQuestion.time}
                              onChange={(e) =>
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  time: parseInt(e.target.value) || 30,
                                })
                              }
                              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                                errors.time
                                  ? "border-red-500"
                                  : "border-purple-500/30"
                              }`}
                            />
                            {errors.time && (
                              <p className="text-red-400 text-sm mt-1">
                                {errors.time}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* Explanation */}
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Explanation (Optional)
                          </label>
                          <motion.textarea
                            whileFocus={{ scale: 1.02 }}
                            value={currentQuestion.explanation}
                            onChange={(e) =>
                              setCurrentQuestion({
                                ...currentQuestion,
                                explanation: e.target.value,
                              })
                            }
                            rows={2}
                            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                            placeholder="Explain why this is the correct answer..."
                          />
                        </div>
                      </div>

                      <motion.button
                        onClick={handleAddQuestion}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full mt-3 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center justify-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Question</span>
                      </motion.button>
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
                                              question.correctAnswer.includes(
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

                    {errors.questions && (
                      <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4">
                        <div className="flex items-center space-x-2">
                          <AlertCircle className="h-5 w-5 text-red-400" />
                          <p className="text-red-400">{errors.questions}</p>
                        </div>
                      </div>
                    )}
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
                                {quizData.difficulty}
                              </span>
                            </p>
                            <p>
                              <span className="text-gray-400">Time Limit:</span>{" "}
                              <span className="text-white">
                                {quizData.timeLimit} minutes
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
            <div className="flex items-center justify-between p-6 border-t border-purple-500/20">
              <motion.button
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={currentStep === "basic"}
                className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Previous</span>
              </motion.button>

              <div className="flex items-center space-x-3">
                {currentStep !== "review" ? (
                  <motion.button
                    onClick={nextStep}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2"
                  >
                    <span>Next</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={() => handleSaveQuiz(false)} // Save as Draft
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2 shadow-lg"
                    >
                      <Save className="h-4 w-4" />
                      <span>Save as Draft</span>
                    </motion.button>
                    <motion.button
                      onClick={() => handleSaveQuiz(true)} // Save as Published
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg"
                    >
                      <Sparkles className="h-4 w-4" />
                      <span>Publish Quiz</span>
                    </motion.button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Edit Question Dialog (Shadcn UI) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-slate-900 text-white border-purple-500/20 rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Edit Question
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to your question here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {questionToEdit && (
            <div className="grid gap-4 py-4">
              {/* Question Text */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Question *
                </label>
                <textarea
                  value={questionToEdit.question}
                  onChange={(e) =>
                    setQuestionToEdit({
                      ...questionToEdit,
                      question: e.target.value,
                    })
                  }
                  rows={2}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                    editErrors.question
                      ? "border-red-500"
                      : "border-purple-500/30"
                  }`}
                  placeholder="Enter your question..."
                />
                {editErrors.question && (
                  <p className="text-red-400 text-sm mt-1">
                    {editErrors.question}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Answer Options *
                </label>
                <div className="space-y-3">
                  {questionToEdit.options.map(
                    (option: string, index: number) => (
                      <div key={index} className="flex items-center space-x-3">
                        <Checkbox
                          checked={questionToEdit.correctAnswer.includes(index)}
                          onCheckedChange={(checked) => {
                            setQuestionToEdit((prev) => {
                              if (!prev) return null;
                              const newCorrectAnswers = checked
                                ? [...prev.correctAnswer, index]
                                : prev.correctAnswer.filter((i) => i !== index);
                              return {
                                ...prev,
                                correctAnswer: newCorrectAnswers.sort(
                                  (a, b) => a - b
                                ),
                              };
                            });
                          }}
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) => {
                            setQuestionToEdit((prev) => {
                              if (!prev) return null;
                              const newOptions = [...prev.options];
                              newOptions[index] = e.target.value;
                              return { ...prev, options: newOptions };
                            });
                          }}
                          className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                          placeholder={`Option ${index + 1}...`}
                        />
                      </div>
                    )
                  )}
                </div>
                {editErrors.options && (
                  <p className="text-red-400 text-sm mt-1">
                    {editErrors.options}
                  </p>
                )}
                {editErrors.correctAnswer && (
                  <p className="text-red-400 text-sm mt-1">
                    {editErrors.correctAnswer}
                  </p>
                )}
              </div>

              {/* Mark and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Mark *
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={questionToEdit.mark}
                    onChange={(e) =>
                      setQuestionToEdit((prev) => {
                        if (!prev) return null;
                        return { ...prev, mark: parseInt(e.target.value) || 5 };
                      })
                    }
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      editErrors.mark
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  />
                  {editErrors.mark && (
                    <p className="text-red-400 text-sm mt-1">
                      {editErrors.mark}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Time (seconds) *
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="300"
                    value={questionToEdit.time}
                    onChange={(e) =>
                      setQuestionToEdit((prev) => {
                        if (!prev) return null;
                        return {
                          ...prev,
                          time: parseInt(e.target.value) || 30,
                        };
                      })
                    }
                    className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                      editErrors.time
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  />
                  {editErrors.time && (
                    <p className="text-red-400 text-sm mt-1">
                      {editErrors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Explanation (Optional)
                </label>
                <textarea
                  value={questionToEdit.explanation || ""}
                  onChange={(e) =>
                    setQuestionToEdit({
                      ...questionToEdit,
                      explanation: e.target.value,
                    })
                  }
                  rows={2}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
                  placeholder="Explain why this is the correct answer..."
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsEditDialogOpen(false);
                setEditErrors({});
              }}
              className="bg-slate-700 hover:bg-slate-600 text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveEditedQuestion}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
