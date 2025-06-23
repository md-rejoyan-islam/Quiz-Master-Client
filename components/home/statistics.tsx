"use client";
import { motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Clock,
  Globe,
  Star,
  TrendingUp,
  Trophy,
  Users,
} from "lucide-react";
import React from "react";
import BadgeBtn from "../button/badge-btn";

const Statistics: React.FC = () => {
  const stats = [
    {
      id: 1,
      number: "50,000+",
      label: "Active Students",
      description: "Learning and growing every day",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-900/20 to-cyan-900/20",
      growth: "+15% this month",
    },
    {
      id: 2,
      number: "1,200+",
      label: "Quiz Categories",
      description: "Across multiple subjects",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-900/20 to-emerald-900/20",
      growth: "+50 new this week",
    },
    {
      id: 3,
      number: "2.5M+",
      label: "Quizzes Completed",
      description: "Knowledge tests taken",
      icon: Trophy,
      color: "from-purple-500 to-violet-500",
      bgColor: "from-purple-900/20 to-violet-900/20",
      growth: "+25K daily",
    },
    {
      id: 4,
      number: "94%",
      label: "Success Rate",
      description: "Students improve their scores",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
      bgColor: "from-orange-900/20 to-red-900/20",
      growth: "Consistently high",
    },
  ];

  const achievements = [
    { icon: Globe, text: "Available in 25+ countries", color: "text-blue-400" },
    { icon: Star, text: "4.9/5 average rating", color: "text-yellow-400" },
    { icon: Clock, text: "24/7 learning support", color: "text-green-400" },
    {
      icon: Award,
      text: "Certified by education boards",
      color: "text-purple-400",
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
    <section className="py-20 bg-gradient-to-br from-purple-900/50 via-slate-900 to-purple-900/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
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
          className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
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
          className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <BadgeBtn
            text=" Growing Community"
            icon={<TrendingUp className="h-4 w-4 mr-2" />}
          />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Thousands of
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Successful Learners
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our platform has helped students worldwide achieve their academic
            goals through interactive learning
          </p>
        </motion.div>

        {/* Main Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.id}
                variants={itemVariants}
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
                className={`bg-gradient-to-br ${stat.bgColor} rounded-3xl p-8 text-center hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-purple-500/20 backdrop-blur-sm group relative overflow-hidden`}
              >
                {/* Background Decoration */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 360, 0],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -translate-y-12 translate-x-12"
                />

                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.2,
                    rotateY: 180,
                  }}
                  transition={{ duration: 0.6 }}
                  className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <IconComponent className="h-8 w-8 text-white" />
                </motion.div>

                {/* Number */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="text-4xl md:text-5xl font-bold text-white mb-2"
                >
                  {stat.number}
                </motion.div>

                {/* Label */}
                <h3 className="text-xl font-semibold text-gray-200 mb-2 group-hover:text-white transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-gray-400 mb-4 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">
                  {stat.description}
                </p>

                {/* Growth Indicator */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-flex items-center px-3 py-1 bg-slate-800/50 rounded-full text-xs font-medium text-green-400 border border-green-500/30"
                >
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {stat.growth}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Achievements Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-purple-500/20"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold text-white mb-4">
              Why Students Choose Us
            </h3>
            <p className="text-gray-300 text-lg">
              Trusted by educators and loved by students worldwide
            </p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                  }}
                  className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-slate-700/30 transition-all duration-300 group"
                >
                  <motion.div
                    whileHover={{
                      scale: 1.2,
                      rotate: 360,
                    }}
                    transition={{ duration: 0.6 }}
                    className="p-4 rounded-2xl bg-slate-700/50 group-hover:bg-slate-600/50 transition-colors mb-4"
                  >
                    <IconComponent className={`h-8 w-8 ${achievement.color}`} />
                  </motion.div>
                  <p className="font-semibold text-gray-300 group-hover:text-white transition-colors">
                    {achievement.text}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="inline-flex flex-col items-center">
            <p className="text-gray-300 mb-4 text-lg">
              Ready to join our learning community?
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center space-x-2 group"
            >
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Users className="h-5 w-5" />
              </motion.div>
              <span>Start Learning Today</span>
              <motion.div
                whileHover={{ rotate: 12 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <TrendingUp className="h-5 w-5" />
              </motion.div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;
