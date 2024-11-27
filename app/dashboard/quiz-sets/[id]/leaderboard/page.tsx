"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";
import { Award, Medal, Trophy } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock data
const leaderboardData = [
  { id: 1, name: "John Doe", score: 95, timeTaken: "10:30" },
  { id: 2, name: "Jane Smith", score: 92, timeTaken: "11:15" },
  { id: 3, name: "Bob Johnson", score: 88, timeTaken: "12:00" },
  { id: 4, name: "Alice Brown", score: 85, timeTaken: "11:45" },
  { id: 5, name: "Charlie Davis", score: 82, timeTaken: "13:00" },
];

export default function LeaderboardPage() {
  const params = useParams();
  const [quizTitle, setQuizTitle] = useState("");

  useEffect(() => {
    // In a real application, you would fetch the quiz title based on the quizId
    setQuizTitle("React Hooks Quiz");
  }, [params.quizId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Leaderboard: {quizTitle}
      </h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Score</TableHead>
            <TableHead>Time Taken</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {leaderboardData.map((entry, index) => (
            <TableRow key={entry.id}>
              <TableCell>
                {index === 0 && (
                  <Trophy className="inline mr-2 text-yellow-500" />
                )}
                {index === 1 && <Award className="inline mr-2 text-gray-400" />}
                {index === 2 && (
                  <Medal className="inline mr-2 text-yellow-700" />
                )}
                {index + 1}
              </TableCell>
              <TableCell className="font-medium">{entry.name}</TableCell>
              <TableCell>{entry.score}</TableCell>
              <TableCell>{entry.timeTaken}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
}
