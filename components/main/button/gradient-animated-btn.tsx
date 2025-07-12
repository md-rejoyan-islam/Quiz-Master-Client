"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const GradientAnimatedBtn = ({
  leftIcon,
  rightIcon,
  text,
  href = "#",
}: {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  text: string;
  href?: string;
}) => {
  const router = useRouter();
  const handleClick = () => {
    if (href) {
      router.push(href);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      viewport={{ once: true }}
      className="text-center group"
      onClick={handleClick}
    >
      <motion.div
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        className="text-sm sm:text-base inline-flex items-center px-6  sm:px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl cursor-pointer group"
      >
        {leftIcon && <div className="mr-2">{leftIcon}</div>}
        <span>{text}</span>
        {rightIcon && (
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="ml-2 "
          >
            {rightIcon}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default GradientAnimatedBtn;
