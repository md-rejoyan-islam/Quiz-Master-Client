import AnimatedBackground from "@/components/animated-background";
import QuizzesBody from "@/components/quizzes/quizzes-body";
import QuizzesHeader from "@/components/quizzes/quizzes-header";
import React from "react";

export const metadata = {
  title: "Quizzes",
  description:
    "Explore a wide range of quizzes across various subjects and difficulty levels.",
};

const Quizzes: React.FC = () => {
  return (
    <section className="py-8 relative md:py-12 min-h-screen bg-gradient-to-b from-transparent via-transparent  to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedBackground
          scale={[1, 1.2, 1]}
          rotate={[0, 180, 360]}
          duration={20}
          className="bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <QuizzesHeader />

        <QuizzesBody />
      </div>
    </section>
  );
};

export default Quizzes;
