"use client";
import AnimatedBackgroundPattern from "@/components/animated-background-pattern";
import { QUIZ_SET } from "@/lib/types";
import clsx from "clsx";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Clock, Target, Users } from "lucide-react";
import Link from "next/link";
import BadgeBtn from "../button/badge-btn";
import GradientAnimatedBtn from "../button/gradient-animated-btn";
import SectionSubtitle from "./section-subtitle";
import SectionTitle from "./section-title";
const difficultyColors = {
  easy: "bg-green-900/50 text-green-300 border-green-500/30",
  medium: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
  hard: "bg-red-900/50 text-red-300 border-red-500/30",
};

const Quizzes = ({
  quizzes,
  error,
  userId,
}: {
  quizzes: QUIZ_SET[] | null;
  error: string | null;
  userId: string | null;
}) => {
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

  return (
    <section
      id="how-to"
      className="py-20 px-4 bg-gradient-to-b from-purple-900/50 to-slate-900 text-white relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-[.15] bg-contain bg-center bg-no-repeat"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "url(/brain.svg)",
        }}
      ></motion.div>
      <AnimatedBackgroundPattern />

      <div className=" max-w-7xl mx-auto  relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <BadgeBtn
            text="Challenges"
            icon={<Target className="h-4 w-4 mr-2" />}
          />

          <SectionTitle firstLine="Choose Your" secondLine="Challenge" />
          <SectionSubtitle title="Select from our wide range of quiz categories and test your knowledge" />
          {!error && (
            <div className="py-4">
              <GradientAnimatedBtn
                rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
                text="All Quizzes"
                href="/quizzes"
              />
            </div>
          )}
        </motion.div>

        {error ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-red-500 py-4"
          >
            <p className="text-lg ">Error fetching quizzes: {error}</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {quizzes?.slice(0, 4).map((quiz, index) => (
              <motion.div
                key={quiz.id}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Link
                  href={
                    quiz.attempts?.some((attempt) => attempt.userId === userId)
                      ? `/quizzes/${quiz.id}/results`
                      : `/quizzes/${quiz.id}`
                  }
                  className="bg-white/10 backdrop-blur-sm block rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors"
                    >
                      <Brain className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-xs font-medium border ${
                        difficultyColors[
                          quiz.label?.toLocaleLowerCase() as keyof typeof difficultyColors
                        ]
                      }`}
                    >
                      {quiz.label}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 truncate transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{quiz?.questions?.length} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>
                        {quiz?.questions?.reduce(
                          (acc, q) => acc + (q.time || 0),
                          0
                        )}
                        min
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      index === 3
                        ? "hover:from-blue-600 hover:to-purple-600 from-blue-700 to-purple-700"
                        : "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
                      "w-full py-3 px-4 bg-gradient-to-r  text-white rounded-lg font-semibold  transition-all duration-200 group-hover:shadow-lg"
                    )}
                  >
                    {quiz.attempts?.some((attempt) => attempt.userId === userId)
                      ? "Show Result"
                      : "Start Quiz"}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Quizzes;
