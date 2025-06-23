import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle,
  MousePointer,
  Play,
  Timer,
  Trophy,
} from "lucide-react";
import React from "react";
import AnimatedBackgroundPattern from "../animated-background-pattern";
import BadgeBtn from "../button/badge-btn";
import GradientAnimatedBtn from "../button/gradient-animated-btn";
import SectionSubtitle from "./section-subtitle";
import SectionTitle from "./section-title";

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: "Choose Your Subject",
      description:
        "Browse through our extensive collection of quiz categories and select the topic you want to master.",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/20 to-cyan-900/20",
      borderColor: "border-blue-500/30",
      details: [
        "Multiple categories available",
        "Difficulty levels for all skill sets",
        "Updated content regularly",
      ],
    },
    {
      id: 2,
      title: "Start the Challenge",
      description:
        "Click start and dive into carefully crafted questions designed to test and improve your knowledge.",
      icon: Play,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-900/20 to-emerald-900/20",
      borderColor: "border-green-500/30",
      details: [
        "Timed quiz sessions",
        "Interactive question format",
        "Progress tracking in real-time",
      ],
    },
    {
      id: 3,
      title: "Track Your Progress",
      description:
        "Monitor your performance with detailed analytics and see how you improve over time.",
      icon: BarChart3,
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-900/20 to-violet-900/20",
      borderColor: "border-purple-500/30",
      details: [
        "Detailed score breakdown",
        "Performance analytics",
        "Identify improvement areas",
      ],
    },
    {
      id: 4,
      title: "Achieve Excellence",
      description:
        "Celebrate your achievements and continue learning with personalized recommendations.",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-900/20 to-orange-900/20",
      borderColor: "border-yellow-500/30",
      details: [
        "Achievement badges",
        "Personalized learning path",
        "Continuous improvement",
      ],
    },
  ];

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
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-slate-900 to-purple-900/50 relative overflow-hidden">
      <AnimatedBackgroundPattern />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <BadgeBtn
            icon={<MousePointer className="h-4 w-4 mr-2" />}
            text="  Simple & Effective Process"
          />

          <SectionTitle firstLine="How to Take a" secondLine="Perfect Quiz" />
          <SectionSubtitle
            title="Follow our streamlined process to maximize your learning experience
            and achieve the best results"
          />
        </motion.div>

        {/* Steps Container */}
        <div className="relative">
          {/* Connection Line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500/50 via-green-500/50 via-purple-500/50 to-yellow-500/50 transform -translate-y-1/2 z-0 origin-left"
          />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 relative z-10"
          >
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Step Card */}
                  <motion.div
                    whileHover={{
                      scale: 1.05,
                      rotateY: 5,
                      rotateX: 5,
                      z: 50,
                    }}
                    style={{
                      transformStyle: "preserve-3d",
                      perspective: "1000px",
                    }}
                    className={`bg-gradient-to-br ${step.bgColor} ${step.borderColor} border-2 rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden backdrop-blur-sm`}
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
                      className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"
                    />
                    <motion.div
                      animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"
                    />

                    {/* Step Number */}
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="absolute -top-1 -left-1 w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-br-3xl shadow-lg flex items-center justify-center border-4 border-slate-800"
                    >
                      <span className=" text-sm font-bold text-white">
                        {step.id}
                      </span>
                    </motion.div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{
                        scale: 1.2,
                        rotateY: 180,
                      }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                      style={{ transformStyle: "preserve-3d" }}
                    >
                      <IconComponent className="h-10 w-10 text-white" />
                    </motion.div>

                    {/* Content */}
                    <motion.h3
                      whileHover={{ scale: 1.05 }}
                      className="text-2xl font-bold text-white mb-4 group-hover:text-purple-300 transition-colors"
                    >
                      {step.title}
                    </motion.h3>
                    <p className="text-gray-300 mb-6 leading-relaxed group-hover:text-gray-200 transition-colors">
                      {step.description}
                    </p>

                    {/* Details List */}
                    <ul className="space-y-2 mb-6">
                      {step.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <CheckCircle className="h-4 w-4 text-green-400 mr-2 flex-shrink-0" />
                          <span>{detail}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Effect */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      className="transition-opacity duration-300"
                    >
                      <div className="flex items-center justify-center text-purple-400 font-medium">
                        <span className="mr-2">Learn More</span>
                        <motion.div
                          whileHover={{ x: 5 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>

                  {/* Arrow for desktop */}
                  {index < steps.length - 1 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.2 }}
                      className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-20"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center border-2 border-slate-800"
                      >
                        <ArrowRight className="h-4 w-4 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <div className=" mt-12 sm:mt-16 md:mt-20">
          <GradientAnimatedBtn
            leftIcon={<Timer className="h-5 w-5" />}
            rightIcon={<ArrowRight className="h-5 w-5" />}
            text="Ready to Start? Take Your First Quiz!"
            href="/quizzes"
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
