"use client";
import { motion } from "framer-motion";
import { BookOpen, Brain, Clock, Sparkles, Users } from "lucide-react";

const defaultFeatures = [
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
];

const DefaultFeatures = () => {
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
    <motion.div
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
    >
      {defaultFeatures.map((feature, index) => (
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
  );
};

export default DefaultFeatures;
