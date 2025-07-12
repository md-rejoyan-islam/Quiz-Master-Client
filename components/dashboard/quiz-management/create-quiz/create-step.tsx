import { BookOpen } from "lucide-react";

const CreateStep = ({
  currentStep,
}: {
  currentStep: "basic" | "questions" | "review";
}) => {
  return (
    <div className="flex items-center justify-between p-6">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-purple-600 rounded-xl">
          <BookOpen className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Create New Quiz</h2>
          <p className="text-gray-400">
            {currentStep === "basic" && "Set up basic quiz information"}
            {currentStep === "questions" && "Add questions to your quiz"}
            {currentStep === "review" && "Review and save your quiz"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateStep;
