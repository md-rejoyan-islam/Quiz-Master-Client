"use client";

import { QuestionForm } from "@/components/question-form";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const mockQuizSet = {
  id: "1",
  title: "My First Quiz",
  description: "This is my first quiz.",
  questions: [
    {
      id: "1",
      text: "What is the capital of France?",
      options: ["London", "Paris", "Berlin", "Rome"],
      correctAnswer: 1,
    },
    {
      id: "2",
      text: "What is the highest mountain in the world?",
      options: ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"],
      correctAnswer: 2,
    },
  ],
};

export default function QuizSetDetailPage() {
  const [quizSet, setQuizSet] = useState(mockQuizSet);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const toast = useToast();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    // Fetch quiz set data here based on params.id
  }, []);

  const handleEditQuestion = (question) => {
    setEditingQuestion(question);
  };

  const handleUpdateQuestion = (updatedQuestion) => {
    setQuizSet((prevState) => ({
      ...prevState,
      questions: prevState.questions.map((q) =>
        q.id === updatedQuestion.id ? { ...q, ...updatedQuestion } : q
      ),
    }));
    setEditingQuestion(null);
    toast({
      title: "Question updated",
      description: "The question has been successfully updated.",
    });
  };

  const handleDeleteQuestion = (questionId) => {
    setQuizSet((prevState) => ({
      ...prevState,
      questions: prevState.questions.filter((q) => q.id !== questionId),
    }));
    toast({
      title: "Question deleted",
      description: "The question has been successfully deleted.",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white text-center">
        {quizSet.title}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">
        {quizSet.description}
      </p>
      <div className="flex gap-4 items-center justify-center ">
        {/* total questions: {quizSet.questions.length} */}
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Total Questions: {quizSet.questions.length}
        </p>

        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() =>
            router.push(`/dashboard/quiz-sets/${params.id}/leaderboard`)
          }
        >
          View Leaderboard
        </Button>
      </div>
      <h2 className="text-2xl font-bold  text-gray-800 dark:text-white mt-4">
        All Questions
      </h2>
      <div className="gap-6 grid lg:grid-cols-2 py-10">
        {quizSet.questions.map((question, index) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <Card className="dark:bg-gray-800">
              <CardHeader>
                <CardTitle>Question {index + 1}</CardTitle>
                <CardDescription>{question.text}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {question.options.map((option, optionIndex) => (
                    <div
                      key={optionIndex}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={optionIndex === question.correctAnswer}
                        disabled
                      />
                      <Label
                        className={
                          optionIndex === question.correctAnswer
                            ? "text-green-600 font-medium"
                            : ""
                        }
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4 mr-2" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Question</DialogTitle>
                      <DialogDescription>
                        Make changes to the question here. Click save when
                        you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <QuestionForm
                      initialData={question}
                      onSubmit={(data) =>
                        handleUpdateQuestion({ ...data, id: question.id })
                      }
                    />
                  </DialogContent>
                </Dialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4 mr-2" /> Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete the question and remove it from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
