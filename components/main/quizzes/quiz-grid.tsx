import { QUIZ_SET } from "@/lib/types";
import { motion } from "framer-motion";
import { Award, Brain, Clock, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
const difficultyColors = {
  easy: "bg-green-900/50 text-green-300 border-green-500/30",
  medium: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
  hard: "bg-red-900/50 text-red-300 border-red-500/30",
};

const QuizGrid = ({ quizzes }: { quizzes: QUIZ_SET[] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {quizzes.map((quiz: QUIZ_SET) => {
        return (
          <Link
            key={quiz.id}
            href={
              quiz.isAttempted
                ? `/quizzes/${quiz.id}/results`
                : `/quizzes/${quiz.id}`
            }
          >
            <motion.div
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                rotateY: 5,
                rotateX: 5,
                z: 50,
              }}
              whileTap={{ scale: 0.95 }}
              style={{
                transformStyle: "preserve-3d",
                perspective: "1000px",
              }}
              className="bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 group cursor-pointer overflow-hidden backdrop-blur-sm relative"
              // onClick={() => onStartQuiz(quiz)}
            >
              {/* Background Decoration */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors"
                  >
                    <Brain className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        difficultyColors[
                          quiz.label.toLowerCase() as keyof typeof difficultyColors
                        ]
                      }`}
                    >
                      {quiz.label}
                    </span>
                    {/* {
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-300">4.7</span>
                      </div>
                    } */}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  {quiz.title}
                </h3>

                <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">
                  {quiz.description}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {quiz.questions?.reduce(
                          (acc, q) => acc + (q.time || 0),
                          0
                        )}{" "}
                        min
                      </span>
                    </div>
                  </div>
                  {quiz && (
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4" />
                      <span>23+ taken</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                {quiz.tags && quiz.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {quiz.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {!quiz?.isAttempted ? (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 group-hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Start Quiz</span>
                    <Award className="h-4 w-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 group-hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>View Result</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          </Link>
        );
      })}
    </motion.div>
  );
};

export default QuizGrid;
