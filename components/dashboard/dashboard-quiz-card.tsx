"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

import { FileQuestion, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { EditQuizModal } from "./edit-quiz-modal";

interface QuizCardProps {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  status: "draft" | "published";
}

export function QuizCard({
  id,
  title,
  description,
  questionCount,
  status,
}: QuizCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { toast } = useToast();

  const router = useRouter();

  const handleDelete = () => {
    toast({
      title: "Are you sure?",
      description: "This action cannot be undone.",
      action: (
        <Button
          variant="destructive"
          onClick={() => {
            toast({
              description: "Quiz deleted successfully",
            });
          }}
        >
          Delete
        </Button>
      ),
    });
  };

  return (
    <>
      <Card className="relative overflow-hidden dark:bg-gray-800">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-5 w-full dark:opacity-[0.03]">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <Badge variant={status === "published" ? "default" : "secondary"}>
              {status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="relative">
          <div className="flex items-center gap-2">
            <FileQuestion className="h-4 w-4" />
            <span>{questionCount} questions</span>
          </div>
        </CardContent>
        <CardFooter className="relative flex justify-between gap-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <Button
            variant="default"
            onClick={() => router.push(`/dashboard/quiz-sets/${id}`)}
          >
            View Details
          </Button>
        </CardFooter>
      </Card>

      <EditQuizModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        initialData={{ title, description, status }}
        onSubmit={() => {
          setIsEditModalOpen(false);
          toast({
            description: "Quiz updated successfully",
          });
        }}
      />
    </>
  );
}
