"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

const questionSchema = z.object({
  text: z.string().min(1, "Question text is required"),
  options: z
    .array(
      z.object({
        text: z.string().min(1, "Option text is required"),
      })
    )
    .min(2, "At least 2 options are required"),
  correctAnswer: z.number().min(0, "Correct answer is required"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

interface QuestionFormProps {
  initialData?: QuestionFormValues;
  onSubmit: (data: QuestionFormValues) => void;
}

export function QuestionForm({ initialData, onSubmit }: QuestionFormProps) {
  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: initialData || {
      text: "",
      options: [{ text: "" }, { text: "" }],
      correctAnswer: 0,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question Text</FormLabel>
              <FormControl>
                <Input placeholder="Enter the question" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields.map((field, index) => (
          <FormField
            key={field.id}
            control={form.control}
            name={`options.${index}.text`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option {index + 1}</FormLabel>
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Input {...field} />
                    {index > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={() => append({ text: "" })}
        >
          Add Option
        </Button>

        <FormField
          control={form.control}
          name="correctAnswer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correct Answer</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  max={fields.length - 1}
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Enter the index of the correct answer (0-based)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Question</Button>
      </form>
    </Form>
  );
}
