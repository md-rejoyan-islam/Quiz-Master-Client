import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, Sparkles } from "lucide-react";

const CreateQuizFooter = ({
  prevStep,
  currentStep,
  nextStep,
  handleSaveQuiz,
}: {
  prevStep: () => void;
  currentStep: "basic" | "questions" | "review";
  nextStep: () => void;
  handleSaveQuiz: (isPublished: boolean) => void;
}) => {
  return (
    <div className="flex items-center justify-between p-6 border-t border-purple-500/20">
      <motion.button
        onClick={prevStep}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        disabled={currentStep === "basic"}
        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Previous</span>
      </motion.button>

      <div className="flex items-center space-x-3">
        {currentStep !== "review" ? (
          <motion.button
            onClick={nextStep}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        ) : (
          <>
            <motion.button
              onClick={() => handleSaveQuiz(false)} // Save as Draft
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors flex items-center space-x-2 shadow-lg"
            >
              <Save className="h-4 w-4" />
              <span>Save as Draft</span>
            </motion.button>
            <motion.button
              onClick={() => handleSaveQuiz(true)} // Save as Published
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 flex items-center space-x-2 shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              <span>Publish Quiz</span>
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateQuizFooter;
