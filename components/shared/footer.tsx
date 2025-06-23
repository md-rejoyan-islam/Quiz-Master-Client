"use client";
import { motion } from "framer-motion";
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-purple-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2 mb-4"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="p-2 bg-purple-600 rounded-lg"
              >
                <GraduationCap className="h-6 w-6" />
              </motion.div>
              <span className="text-xl font-bold">QuizMaster</span>
            </motion.div>
            <p className="text-gray-400 mb-6 max-w-md">
              Empowering students worldwide with interactive quizzes and
              comprehensive learning tools. Test your knowledge, track your
              progress, and achieve your educational goals.
            </p>
            <div className="space-y-2">
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                <span>info@quizmaster.com</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </motion.div>
              <motion.div
                whileHover={{ x: 5 }}
                className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>123 Education St, Learning City, LC 12345</span>
              </motion.div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {["Home", "Quizzes", "About Us", "Contact", "Help Center"].map(
                (link, index) => (
                  <motion.li key={index}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 5, color: "#c084fc" }}
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-300">
              Categories
            </h3>
            <ul className="space-y-2">
              {[
                "Mathematics",
                "Science",
                "History",
                "Literature",
                "General Knowledge",
              ].map((category, index) => (
                <motion.li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-colors"
                  >
                    {category}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="border-t border-purple-500/20 mt-12 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 QuizMaster. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (policy, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.05, color: "#c084fc" }}
                    className="text-gray-400 hover:text-purple-400 transition-colors text-sm"
                  >
                    {policy}
                  </motion.a>
                )
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
