import { Checkbox } from "@/components/ui/checkbox"; // Assuming this path is correct for shadcn/ui Checkbox
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";

const questionSchema = z
  .object({
    question: z
      .string({
        required_error: "Question text is required",
      })
      .min(1, "Question text is required"),
    options: z
      .array(z.string().min(1, "Option cannot be empty"))
      .min(2, "At least 2 options are required"), // Ensure at least 2 options and each is non-empty
    answerIndices: z
      .array(z.number())
      .min(1, "At least one correct answer must be selected"),
    mark: z
      .number()
      .min(1, "Mark must be between 1 and 100")
      .max(100, "Mark cannot exceed 100"),
    time: z.coerce
      .number()
      .min(5, "Time must be between 5 and 300 seconds")
      .max(300, "Time cannot exceed 300 seconds"),
    id: z.string().default(Date.now().toString()), // Unique ID for the question, default to current timestamp
    explanation: z.string().optional(), // Explanation is optional
  })
  .superRefine((data, ctx) => {
    // Custom validation: Ensure selected correct answers correspond to non-empty options
    const invalidCorrectAnswers = data.answerIndices.some(
      (index) => !data.options[index] || data.options[index].trim() === ""
    );
    if (invalidCorrectAnswers) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Selected correct answer(s) cannot be empty options",
        path: ["correctAnswer"], // Attach error to correctAnswer field
      });
    }
  });

// Infer the type from the schema
type QuestionFormData = z.infer<typeof questionSchema>;

const QuestionForm = ({
  children,
  setQuestions,
  currentQuestion,
  type = "create", // Type of form, can be "create" or "edit"
}: //   currentQuestion,
//   setCurrentQuestion,
{
  children: React.ReactNode;
  setQuestions: (
    questions:
      | QuestionFormData[]
      | ((prev: QuestionFormData[]) => QuestionFormData[])
  ) => void;
  currentQuestion?: QuestionFormData; // Optional prop to pre-fill the form with an existing question
  type?: "create" | "edit"; // Type of form, can be "create" or "edit"
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    resetField,
    formState: { errors },
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues:
      type === "edit"
        ? currentQuestion
        : {
            question: "",
            options: ["", "", "", ""],
            answerIndices: [],
            explanation: "",
            mark: 5, // Default mark for the question
            time: 30, // Default time in seconds for the question
            id: Date.now().toString(), // Unique ID for the question, default to current
          },
  });

  // Watch the options and correctAnswer fields to react to changes for the UI
  const options = watch("options");
  const correctAnswer = watch("answerIndices");

  const handleOptionChange = (value: string, index: number) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setValue(`options.${index}`, value, { shouldValidate: true }); // Update individual option
    // Re-validate the whole options array if needed, or rely on superRefine for cross-field validation
  };

  const handleCorrectAnswerChange = (checked: boolean, index: number) => {
    const newCorrectAnswers = checked
      ? [...correctAnswer, index]
      : correctAnswer.filter((i) => i !== index);
    setValue(
      "answerIndices",
      newCorrectAnswers.sort((a, b) => a - b),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: QuestionFormData) => {
    console.log("Question Form Data Submitted:", data);
    // Here you would typically send the data to your backend

    if (type === "edit") {
      console.log(data);

      // If editing, find the index of the question to update
      setQuestions((prev: QuestionFormData[]) =>
        prev.map((q) => (q.id === data.id ? data : q))
      );
    } else {
      setQuestions((prev: QuestionFormData[]) => [
        ...prev,
        {
          ...data,
          id: Date.now().toString(), // Ensure a unique ID for new questions
        },
      ]);
      resetField("question"); // Reset the question field
      resetField("options"); // Reset the options field
      resetField("answerIndices"); // Reset the correct answers field
      resetField("mark"); // Reset the mark field
      resetField("time"); // Reset the time field
      resetField("explanation"); // Reset the explanation field
      resetField("id"); // Reset the ID field
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Question Text */}
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Question *
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            id="question"
            {...register("question")} // Register the textarea
            rows={2}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
              errors.question ? "border-red-500" : "border-purple-500/30"
            }`}
            placeholder="Enter your question..."
          />
          {errors.question && (
            <p className="text-red-400 text-sm mt-1">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Answer Options *
          </label>
          <div className="space-y-3">
            {options.map((option: string, index: number) => (
              <div key={index}>
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={`correctAnswer-${index}`}
                    checked={correctAnswer.includes(index)}
                    onCheckedChange={(checked: boolean) =>
                      handleCorrectAnswerChange(checked, index)
                    }
                  />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id={`option-${index}`}
                    // Register each option dynamically
                    {...register(`options.${index}` as const)}
                    onChange={(e) => handleOptionChange(e.target.value, index)} // Use custom handler for immediate UI update
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                    placeholder={`Option ${index + 1}...`}
                  />
                </div>
                {errors.options?.[index] && (
                  <p
                    key={`option-error-${index}`}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.options[index]?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
          {/* Display general options errors (e.g., less than 2 options) */}
          {errors.options && (
            <p className="text-red-400 text-sm mt-1">
              {errors.options.message}
            </p>
          )}
          {errors.answerIndices && (
            <p className="text-red-400 text-sm mt-1">
              {errors.answerIndices.message}
            </p>
          )}
        </div>

        {/* Mark and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label
              htmlFor="mark"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Mark *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              id="mark"
              min="1"
              max="100"
              {...register("mark", { valueAsNumber: true })} // Register as number
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.mark ? "border-red-500" : "border-purple-500/30"
              }`}
            />
            {errors.mark && (
              <p className="text-red-400 text-sm mt-1">{errors.mark.message}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="time"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Time (seconds) *
            </label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="number"
              id="time"
              min="5"
              max="300"
              {...register("time", { valueAsNumber: true })} // Register as number
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.time ? "border-red-500" : "border-purple-500/30"
              }`}
            />
            {errors.time && (
              <p className="text-red-400 text-sm mt-1">{errors.time.message}</p>
            )}
          </div>
        </div>

        {/* Explanation */}
        <div className="mb-4">
          <label
            htmlFor="explanation"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Explanation (Optional)
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            id="explanation"
            {...register("explanation")} // Register the textarea
            rows={2}
            className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none"
            placeholder="Explain why this is the correct answer..."
          />
        </div>

        {/* Submit Button */}
        {children}
        {/* <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Save Question
        </motion.button> */}
      </form>
    </>
  );
};

export default QuestionForm;
