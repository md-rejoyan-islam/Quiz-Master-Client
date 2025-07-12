"use client";
import BadgeBtn from "@/components/main/button/badge-btn";
import SectionSubtitle from "@/components/main/home/section-subtitle";
import SectionTitle from "@/components/main/home/section-title";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
const QuizzesHeader = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <BadgeBtn
        icon={<BookOpen className="h-4 w-4 mr-2" />}
        text="Explore All Quizzes"
      />
      <SectionTitle
        firstLine="Discover Your Next"
        secondLine="Learning Challenge"
      />
      <SectionSubtitle
        title="Browse through our comprehensive collection of quizzes across
            multiple subjects and difficulty levels"
      />
    </motion.div>
  );
};

export default QuizzesHeader;
