"use client";
import { motion } from "framer-motion";
import { Target, Trophy } from "lucide-react";
import React from "react";
import AnimatedBackground from "../animated-background";
import BadgeBtn from "../button/badge-btn";
import GradientAnimatedBtn from "../button/gradient-animated-btn";
import DefaultFeatures from "./default-features";
import KeyFeatures from "./key-features";

const Hero: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section className="relative overflow-hidden pt-10 pb-20 lg:pt-20 lg:pb-32">
      {/* Animated Backgrounds */}
      <div className="absolute inset-0">
        <AnimatedBackground
          scale={[1, 1.2, 1]}
          rotate={[0, 180, 360]}
          duration={20}
          className="top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <AnimatedBackground
          scale={[1.2, 1, 1.2]}
          rotate={[360, 180, 0]}
          duration={25}
          className="bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          {/* Badge */}
          <BadgeBtn
            icon={<Trophy className="h-3 w-3 mr-2 text-yellow-400" />}
            text="Interactive Learning Platform"
          />

          {/* Main Heading */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Master Your
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-[length:200%_200%] pb-2"
            >
              Learning Journey
            </motion.span>
            <motion.span
              variants={itemVariants}
              className="block text-2xl md:text-3xl lg:text-4xl text-purple-300 font-medium mt-2"
            >
              One Quiz at a Time
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Unlock your potential with our comprehensive quiz platform. From
            mathematics to literature, challenge yourself across multiple
            subjects, track your progress, and achieve academic excellence
            through interactive learning experiences.
          </motion.p>

          {/* Key Features */}
          <KeyFeatures />

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <GradientAnimatedBtn
              rightIcon={<Target className="h-5 w-5" />}
              text="Start Your Journey"
              href="/quizzes"
            />

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="max-w-[200px] sm:max-w-full mx-auto sm:mx-0 px-6 text-sm sm:text-base sm:px-8 py-4 border-2 border-purple-500/50 text-purple-300 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-200 hover:bg-purple-900/20 transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          <DefaultFeatures />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
