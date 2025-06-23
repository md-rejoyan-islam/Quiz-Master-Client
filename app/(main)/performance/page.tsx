"use client";

import SectionTitle from "@/components/home/section-title";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { motion } from "framer-motion";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

interface QuizPerformance {
  quizName: string;
  correctAnswers: number;
  wrongAnswers: number;
}

const performanceData: QuizPerformance[] = [
  { quizName: "General Knowledge", correctAnswers: 15, wrongAnswers: 5 },
  { quizName: "Science Quiz", correctAnswers: 18, wrongAnswers: 2 },
  { quizName: "History Challenge", correctAnswers: 12, wrongAnswers: 8 },
  { quizName: "Math Masters", correctAnswers: 16, wrongAnswers: 4 },
  { quizName: "Literature Quiz", correctAnswers: 14, wrongAnswers: 6 },
];

export default function Performance() {
  return (
    <section className="bg-gradient-to-b from-transparent via-transparent to-slate-900 ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto px-4 py-12 md:py-16"
      >
        <SectionTitle firstLine="" secondLine="Overall Performance" />

        <Card className="bg-slate-900/50 mt-8 border-slate-700/50 text-white ">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Quiz Performance
            </CardTitle>
            <CardDescription className="text-white/80 text-center">
              Your performance across different quizzes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                correctAnswers: {
                  label: "Correct Answers",
                  color: "hsl(var(--chart-1))",
                },
                wrongAnswers: {
                  label: "Wrong Answers",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className=" max-w-[700px] mx-auto"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={performanceData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quizName" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Legend />
                  <Bar
                    dataKey="correctAnswers"
                    stackId="a"
                    fill="var(--color-correctAnswers)"
                    name="Correct Answers"
                  />
                  <Bar
                    dataKey="wrongAnswers"
                    stackId="a"
                    fill="var(--color-wrongAnswers)"
                    name="Wrong Answers"
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
