"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className={` h-full flex items-center justify-center`}>
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Background 404 */}
        <div className="absolute inset-0  flex items-center justify-center opacity-10 dark:opacity-20 overflow-hidden h-full">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className=" text-[50vw] md:text-[40vw] font-bold text-gray-900 dark:text-gray-100"
          >
            404
          </motion.div>
        </div>

        {/* Content */}
        <div className="min-h-screen flex items-center justify-center py-10">
          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4"
            >
              Oops! Page not found
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-gray-600 dark:text-gray-400 mb-8"
            >
              The page you are looking for doesn&apos;t exist or has been moved.
            </motion.p>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Go back home
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Animated shapes */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-full opacity-20 dark:opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 25,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute top-3/4 right-1/4 w-24 h-24 bg-green-500 rounded-lg opacity-20 dark:opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            ease: "linear",
            repeat: Infinity,
          }}
          className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-yellow-500 rounded-full opacity-20 dark:opacity-30"
        />
      </div>
    </div>
  );
};

export default NotFound;
