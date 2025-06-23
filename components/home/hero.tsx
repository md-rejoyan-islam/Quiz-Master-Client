"use client";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Brain,
  Clock,
  Sparkles,
  Star,
  Target,
  Trophy,
  Users,
} from "lucide-react";
import React from "react";
import BadgeBtn from "../button/badge-btn";
import GradientAnimatedBtn from "../button/gradient-animated-btn";

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
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
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
            icon={<Trophy className="h-4 w-4 mr-2 text-yellow-400" />}
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
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Unlock your potential with our comprehensive quiz platform. From
            mathematics to literature, challenge yourself across multiple
            subjects, track your progress, and achieve academic excellence
            through interactive learning experiences.
          </motion.p>

          {/* Key Features */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              {
                icon: Star,
                text: "Expert-Crafted Questions",
                color: "from-yellow-400 to-orange-400",
              },
              {
                icon: Clock,
                text: "Real-Time Progress",
                color: "from-blue-400 to-cyan-400",
              },
              {
                icon: Award,
                text: "Instant Results",
                color: "from-purple-400 to-pink-400",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-purple-500/20 shadow-sm"
              >
                <feature.icon
                  className={`h-4 w-4 mr-2 text-white stroke-pink-300  `}
                />
                <span className="text-gray-300 font-medium">
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <GradientAnimatedBtn
              rightIcon={<Target className="h-5 w-5" />}
              text="Start Your Journey"
            />

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 border-2 border-purple-500/50 text-purple-300 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-200 hover:bg-purple-900/20 transition-all duration-300 backdrop-blur-sm"
            >
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Feature Grid with 3D Hover Effects */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
          >
            {[
              {
                icon: Brain,
                title: "Smart Learning",
                description:
                  "AI-powered question selection adapts to your learning pace and knowledge level",
                color: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-900/20 to-cyan-900/20",
              },
              {
                icon: Clock,
                title: "Timed Challenges",
                description:
                  "Build confidence with time-based quizzes that simulate real exam conditions",
                color: "from-green-500 to-emerald-500",
                bgGradient: "from-green-900/20 to-emerald-900/20",
              },
              {
                icon: Users,
                title: "Progress Tracking",
                description:
                  "Detailed analytics help you identify strengths and areas for improvement",
                color: "from-purple-500 to-violet-500",
                bgGradient: "from-purple-900/20 to-violet-900/20",
              },
              {
                icon: BookOpen,
                title: "Multiple Subjects",
                description:
                  "Comprehensive coverage across Math, Science, History, Literature, and more",
                color: "from-orange-500 to-red-500",
                bgGradient: "from-orange-900/20 to-red-900/20",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: 5,
                  z: 50,
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                className={`group text-center p-8 bg-gradient-to-br ${feature.bgGradient} backdrop-blur-sm rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 cursor-pointer`}
              >
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotateY: 180,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`p-4 bg-gradient-to-br ${feature.color} rounded-2xl w-fit mx-auto mb-6 shadow-lg`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <feature.icon className="h-8 w-8 text-white" />
                </motion.div>
                <motion.h3
                  whileHover={{ scale: 1.05 }}
                  className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors"
                >
                  {feature.title}
                </motion.h3>
                <motion.p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </motion.p>

                {/* 3D Floating Elements */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5,
                  }}
                  className="absolute top-2 right-2 opacity-20 group-hover:opacity-40 transition-opacity"
                >
                  <Sparkles className="h-6 w-6 text-purple-400" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
