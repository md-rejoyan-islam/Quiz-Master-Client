"use client";

import { AddQuestion } from "@/components/dashboard/add-question";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { ChevronLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const quizSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  questions: z
    .array(
      z.object({
        text: z.string().min(1, "Question text is required"),
        options: z
          .array(z.string().min(1, "Option text is required"))
          .min(2, "At least 2 options are required"),
        correctAnswer: z.number().min(0, "Correct answer is required"),
      })
    )
    .min(1, "At least one question is required"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

export default function NewQuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      title: "",
      description: "",
      questions: [{ text: "", options: ["", ""], correctAnswer: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "questions",
  });

  const onSubmit = (data: QuizFormValues) => {
    console.log(data);
    // Here you would typically send the data to your backend
    router.push("/dashboard/quiz-sets");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Create New Quiz
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {step === 1 && (
            <Card className="dark:bg-gray-800 border-none">
              <CardHeader>
                <CardTitle>Quiz Details</CardTitle>
                <CardDescription>
                  Enter the basic information for your quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter quiz title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter quiz description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter>
                <Button type="button" onClick={() => setStep(2)}>
                  Next
                </Button>
              </CardFooter>
            </Card>
          )}
          {step === 2 && (
            <>
              <div className="gap-6 grid lg:grid-cols-2">
                <Card className="w-full h-fit dark:bg-gray-800">
                  <CardHeader>
                    <CardTitle className="text-2xl font-semibold text-primary">
                      Quiz set name
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Quiz set description will go here
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-medium">
                        Total questions: 5
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <Button
                        variant="outline"
                        // onClick={onPrevious}
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>
                      <Button
                        variant="outline"
                        // onClick={onShowAll}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Show All Questions
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <AddQuestion />
              </div>
            </>
          )}
        </form>
      </Form>
    </motion.div>
  );
}
