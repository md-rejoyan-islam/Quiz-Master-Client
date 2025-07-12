"use client";

import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import { Checkbox } from "@/components/ui/checkbox";
import { easeIn, easeOut, motion } from "framer-motion";
import {
  BookOpen,
  CheckCircle,
  Edit,
  FileText, // Import Edit icon
  Gauge,
  Save,
  Sparkles,
  Target, // Icon for difficulty
  Timer,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
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

// Re-using interfaces from the previous component for consistency
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
  correctAnswer: number[];
  explanation?: string;
  mark: number;
  time: number; // in seconds
}

// Mock Quiz Data (replace with actual data fetching in a real app)
const mockQuiz: Quiz = {
  id: "quiz-123",
  title: "Introduction to React Hooks",
  category: "Technology",
  description:
    "A comprehensive quiz covering the basics of React Hooks, including useState, useEffect, and useContext.",
  timeLimit: 30,
  difficulty: "Medium",
  tags: ["React", "JavaScript", "Frontend", "Web Development"],
  questions: [
    {
      id: "q1",
      question:
        "Which hook is used for managing state in functional components?",
      options: ["useEffect", "useContext", "useState", "useReducer"],
      correctAnswer: [2],
      explanation:
        "useState allows functional components to manage local state.",
      mark: 10,
      time: 45,
    },
    {
      id: "q2",
      question: "What are the common dependencies for useEffect?",
      options: [
        "Empty array [] for componentDidMount",
        "Variables used inside the effect",
        "Functions from props",
        "All of the above",
      ],
      correctAnswer: [3],
      explanation:
        "All listed items can be dependencies for useEffect to control when the effect re-runs.",
      mark: 15,
      time: 60,
    },
    {
      id: "q3",
      question: "How do you access context in a functional component?",
      options: [
        "Context.Consumer",
        "useContext(ContextObject)",
        "this.context",
        "Context.Provider",
      ],
      correctAnswer: [1],
      explanation:
        "The useContext hook provides a convenient way to consume context in functional components.",
      mark: 12,
      time: 30,
    },
    {
      id: "q4",
      question: "Which of the following are valid React Hooks?",
      options: ["useMemo", "useCallback", "useClassState", "useRef"],
      correctAnswer: [0, 1, 3], // Multiple correct answers
      explanation:
        "useMemo, useCallback, and useRef are all valid React Hooks. useClassState is not a standard Hook.",
      mark: 20,
      time: 90,
    },
  ],
  rating: 4.5,
  completions: 1200,
  createdAt: "2023-04-10T10:00:00Z",
  createdBy: "John Doe",
  isActive: true, // Initially published
};

const QuizDetailPage = () => {
  const [quizData, setQuizData] = useState<Quiz>(mockQuiz);
  const [questions, setQuestions] = useState<Question[]>(mockQuiz.questions);

  const [isEditingQuizDetails, setIsEditingQuizDetails] = useState(false);
  const [editQuizDetailsErrors, setEditQuizDetailsErrors] = useState<{
    [key: string]: string;
  }>({});

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<Question | null>(null);
  const [editQuestionErrors, setEditQuestionErrors] = useState<{
    [key: string]: string;
  }>({}); // Separate errors for question dialog

  const categories = [
    "Mathematics",
    "Science",
    "History",
    "Literature",
    "Technology",
    "Arts",
  ];
  const difficulties = ["Easy", "Medium", "Hard"];

  // Effect to ensure questions state is in sync with quizData.questions initially
  useEffect(() => {
    setQuestions(quizData.questions);
  }, [quizData.questions]);

  const validateQuizDetails = () => {
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
    setEditQuizDetailsErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateQuestion = (questionData: Question) => {
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

    setEditQuestionErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveQuizDetails = () => {
    if (validateQuizDetails()) {
      // In a real app, you'd send this updated quizData to your backend
      console.log("Saving quiz details:", quizData);
      setIsEditingQuizDetails(false);
      setEditQuizDetailsErrors({});
      // Update the mockQuiz to reflect changes, if desired for persistence across renders
      // For this example, quizData state is enough.
      alert("Quiz details saved!");
    }
  };

  const handleEditQuestionClick = (question: Question) => {
    setQuestionToEdit({ ...question }); // Deep copy to prevent direct mutation
    setIsEditDialogOpen(true);
  };

  const handleSaveEditedQuestion = () => {
    if (!questionToEdit) return;

    if (validateQuestion(questionToEdit)) {
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) =>
          q.id === questionToEdit.id ? questionToEdit : q
        )
      );
      setIsEditDialogOpen(false);
      setQuestionToEdit(null);
      setEditQuestionErrors({});
      alert("Question updated successfully!");
    }
  };

  const handleRemoveQuestion = (questionId: string) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      setQuestions(questions.filter((q) => q.id !== questionId));
      alert("Question deleted!");
    }
  };

  const handleSaveQuiz = (isPublished: boolean) => {
    if (questions.length === 0) {
      alert("Please add at least one question before saving.");
      return;
    }

    // Prepare the updated quiz object
    const updatedQuiz: Quiz = {
      ...quizData,
      questions: questions, // Ensure latest questions are included
      isActive: isPublished,
      // You might update a 'lastModifiedAt' timestamp here
      // lastModifiedAt: new Date().toISOString(),
    };

    // In a real application, send updatedQuiz to your backend API
    console.log(
      `Saving quiz ${isPublished ? "published" : "draft"}:`,
      updatedQuiz
    );
    alert(`Quiz saved as ${isPublished ? "published" : "draft"}!`);
  };

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: easeOut }, // use imported easeOut
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: easeIn }, // use imported easeIn
    }, // use imported easeIn
  };

  return (
    <div className="  text-white">
      <DashboardPageHeader
        label="Quiz Details"
        description="View and manage quiz content"
      />

      <div className="flex items-center justify-between p-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-xl">
            <BookOpen className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">
              {quizData.title || "Loading Quiz..."}
            </h2>
            <p className="text-gray-400">
              Details and questions for your quiz set.
            </p>
          </div>
        </div>
      </div>

      <div className="px-8 py-6 space-y-8">
        {/* Quiz Basic Details Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl w-full"
        >
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-white flex items-center space-x-2">
              <FileText className="h-6 w-6 text-purple-400" />
              <span>Quiz Information</span>
            </h3>
            <Button
              onClick={() => {
                setIsEditingQuizDetails(!isEditingQuizDetails);
                setEditQuizDetailsErrors({}); // Clear errors on toggle
              }}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2"
            >
              <Edit className="h-4 w-4" />
              <span>
                {isEditingQuizDetails ? "Cancel Edit" : "Edit Details"}
              </span>
            </Button>
          </div>

          {!isEditingQuizDetails ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-gray-400">Title:</p>
                <p className="text-white font-medium text-lg">
                  {quizData.title}
                </p>
              </div>
              <div>
                <p className="text-gray-400">Category:</p>
                <p className="text-white font-medium">{quizData.category}</p>
              </div>
              <div>
                <p className="text-gray-400">Difficulty:</p>
                <p
                  className={`font-medium flex items-center space-x-1 ${
                    quizData.difficulty === "Easy"
                      ? "text-green-400"
                      : quizData.difficulty === "Medium"
                      ? "text-yellow-400"
                      : "text-red-400"
                  }`}
                >
                  <Gauge className="h-4 w-4" />{" "}
                  <span>{quizData.difficulty}</span>
                </p>
              </div>
              <div>
                <p className="text-gray-400">Time Limit:</p>
                <p className="text-white font-medium flex items-center space-x-1">
                  <Timer className="h-4 w-4" />{" "}
                  <span>{quizData.timeLimit} minutes</span>
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-400 mb-1">Description:</p>
                <p className="text-gray-300">{quizData.description}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-gray-400 mb-1">Tags:</p>
                {quizData.tags && quizData.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {quizData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No tags added.</p>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Editable Fields */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quiz Title *
                </label>
                <input
                  type="text"
                  value={quizData.title}
                  onChange={(e) =>
                    setQuizData({ ...quizData, title: e.target.value })
                  }
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    editQuizDetailsErrors.title
                      ? "border-red-500"
                      : "border-purple-500/30"
                  }`}
                />
                {editQuizDetailsErrors.title && (
                  <p className="text-red-400 text-sm mt-1">
                    {editQuizDetailsErrors.title}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  value={quizData.description}
                  onChange={(e) =>
                    setQuizData({ ...quizData, description: e.target.value })
                  }
                  rows={3}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                    editQuizDetailsErrors.description
                      ? "border-red-500"
                      : "border-purple-500/30"
                  }`}
                ></textarea>
                {editQuizDetailsErrors.description && (
                  <p className="text-red-400 text-sm mt-1">
                    {editQuizDetailsErrors.description}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={quizData.category}
                    onChange={(e) =>
                      setQuizData({ ...quizData, category: e.target.value })
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
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Quiz Time Limit (minutes) *
                </label>
                <input
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
                    editQuizDetailsErrors.timeLimit
                      ? "border-red-500"
                      : "border-purple-500/30"
                  }`}
                />
                {editQuizDetailsErrors.timeLimit && (
                  <p className="text-red-400 text-sm mt-1">
                    {editQuizDetailsErrors.timeLimit}
                  </p>
                )}
              </div>
              {/* Tags editing - simplified, can be expanded to previous tag input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Tags (Comma-separated)
                </label>
                <input
                  type="text"
                  value={quizData.tags?.join(", ") || ""}
                  onChange={(e) =>
                    setQuizData({
                      ...quizData,
                      tags: e.target.value
                        .split(",")
                        .map((tag) => tag.trim())
                        .filter(Boolean),
                    })
                  }
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  placeholder="e.g., React, Hooks, JavaScript"
                />
              </div>

              <div className="flex justify-end pt-4">
                <Button
                  onClick={handleSaveQuizDetails}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Quiz Details</span>
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Questions List Section */}
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={animationVariants}
          className="bg-slate-900/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20 shadow-2xl w-full"
        >
          <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-400" />
            <span>Questions ({questions.length})</span>
          </h3>
          {questions.length ? (
            <div className="space-y-4">
              {questions.map((question, index) => (
                <motion.div
                  key={question.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/20 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="text-sm text-gray-400 mb-2 flex items-center space-x-4">
                      <span>
                        Mark:{" "}
                        <span className="text-purple-300 font-medium">
                          {question.mark}
                        </span>
                      </span>
                      <span>
                        Time:{" "}
                        <span className="text-purple-300 font-medium">
                          {question.time}s
                        </span>
                      </span>
                    </div>
                    <div className="space-y-1">
                      {question.options.map((option, optIndex) => (
                        <div
                          key={optIndex}
                          className={`text-sm px-3 py-1 rounded ${
                            question.correctAnswer.includes(optIndex)
                              ? "bg-green-600/20 text-green-300 border border-green-500/30"
                              : "text-gray-400"
                          }`}
                        >
                          {String.fromCharCode(65 + optIndex)}. {option}
                        </div>
                      ))}
                    </div>
                    {question.explanation && (
                      <p className="text-sm text-blue-300 mt-2 italic">
                        Explanation: {question.explanation}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-2">
                    <motion.button
                      onClick={() => handleEditQuestionClick(question)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Edit Question"
                    >
                      <Edit className="h-4 w-4" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleRemoveQuestion(question.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded-lg transition-colors"
                      title="Delete Question"
                    >
                      <Trash2 className="h-4 w-4" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-700/30 rounded-xl p-4 border border-purple-500/20 text-center">
              <p className="text-red-200">No questions added yet.</p>
              <p className="text-gray-400 text-sm mt-1">
                Go back to the creation page to add new questions.
              </p>
            </div>
          )}
        </motion.div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-6">
          <motion.button
            onClick={() => handleSaveQuiz(false)} // Save as Draft
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-3 shadow-lg"
          >
            <Save className="h-5 w-5" />
            <span>Save Changes (Draft)</span>
          </motion.button>
          <motion.button
            onClick={() => handleSaveQuiz(true)} // Publish Quiz
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-3 shadow-lg"
          >
            <Sparkles className="h-5 w-5" />
            <span>Publish Quiz</span>
            <CheckCircle className="h-5 w-5" />
          </motion.button>
        </div>
      </div>

      {/* Edit Question Dialog (Shadcn UI) */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-slate-800 text-white border-purple-500/30 rounded-xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Edit Question
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to your question here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {questionToEdit && (
            <div className="grid gap-4 py-4">
              {/* Question Text */}
              <div className="mb-2">
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
                  rows={3}
                  className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                    editQuestionErrors.question
                      ? "border-red-500"
                      : "border-purple-500/30"
                  }`}
                  placeholder="Enter your question..."
                />
                {editQuestionErrors.question && (
                  <p className="text-red-400 text-sm mt-1">
                    {editQuestionErrors.question}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="mb-2">
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
                {editQuestionErrors.options && (
                  <p className="text-red-400 text-sm mt-1">
                    {editQuestionErrors.options}
                  </p>
                )}
                {editQuestionErrors.correctAnswer && (
                  <p className="text-red-400 text-sm mt-1">
                    {editQuestionErrors.correctAnswer}
                  </p>
                )}
              </div>

              {/* Mark and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
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
                      editQuestionErrors.mark
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  />
                  {editQuestionErrors.mark && (
                    <p className="text-red-400 text-sm mt-1">
                      {editQuestionErrors.mark}
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
                      editQuestionErrors.time
                        ? "border-red-500"
                        : "border-purple-500/30"
                    }`}
                  />
                  {editQuestionErrors.time && (
                    <p className="text-red-400 text-sm mt-1">
                      {editQuestionErrors.time}
                    </p>
                  )}
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-2">
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
                setEditQuestionErrors({});
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

export default QuizDetailPage;
