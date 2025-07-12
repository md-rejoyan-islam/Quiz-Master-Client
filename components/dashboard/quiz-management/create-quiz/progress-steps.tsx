import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, FileText, HelpCircle } from "lucide-react";

const steps = [
  { id: "basic", label: "Basic Info", icon: FileText },
  { id: "questions", label: "Questions", icon: HelpCircle },
  { id: "review", label: "Review", icon: CheckCircle },
];

const ProgressSteps = ({
  currentStep,
}: {
  currentStep: "basic" | "questions" | "review";
}) => {
  return (
    <div className="bg-slate-900/70 backdrop-blur-sm rounded-2xl px-6 py-4 border border-purple-500/20  shadow-2xl w-full">
      <div className="flex items-center flex-wrap gap-6 justify-center ">
        {steps.map((step, index) => {
          const IconComponent = step.icon;
          const isActive = currentStep === step.id;
          const isCompleted =
            (step.id === "basic" &&
              (currentStep === "questions" || currentStep === "review")) ||
            (step.id === "questions" && currentStep === "review");

          return (
            <div key={step.id} className="flex items-center ">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-purple-600 text-white"
                    : isCompleted
                    ? "bg-green-600 text-white"
                    : "bg-slate-700 text-gray-400"
                }`}
              >
                <IconComponent className="h-4 w-4" />
                <span className="font-medium truncate">{step.label}</span>
              </motion.div>
              {index < 2 && (
                <ArrowRight className="h-4 w-4 text-gray-600 mx-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
