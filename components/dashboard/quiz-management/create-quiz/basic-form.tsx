import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for form validation
const quizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().min(1, "Please select a category"),
  label: z.enum(["Easy", "Medium", "Hard"], {
    errorMap: () => ({ message: "Please select a label" }),
  }),
  // Tags are now required and must have at least one element
  tags: z.array(z.string()).min(1, "Please add at least one tag"),
});

// Infer the type from the schema
type QuizFormData = z.infer<typeof quizSchema>;

const stepVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -50 },
};

const BasicForm = ({
  setQuizData,
  quizData,
  nextStep,
}: {
  setQuizData: (data: QuizFormData) => void;
  quizData?: QuizFormData;
  nextStep: () => void;
}) => {
  const categories = ["General Knowledge", "Science", "History", "Literature"];
  const labels = ["Easy", "Medium", "Hard"];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<QuizFormData>({
    resolver: zodResolver(quizSchema),
    defaultValues: quizData,
  });

  // Watch the tags field to react to changes for the UI
  const tags = watch("tags") || [];
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      // Use setValue to update the tags array in react-hook-form
      setValue("tags", [...tags, tagInput.trim()], { shouldValidate: true });
      setQuizData({
        ...quizData!,
        tags: [...tags, tagInput.trim()],
      });
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    // Use setValue to update the tags array in react-hook-form
    setValue(
      "tags",
      tags.filter((t) => t !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const onSubmit = (data: QuizFormData) => {
    setQuizData(data);
    nextStep(); // Move to the next step after submission
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value } = target;
    setQuizData({
      ...quizData!,
      [name]: value,
    });
  };

  const selectFieldChange = (e: React.FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setQuizData({
      ...quizData!,
      [name]: value,
    });
  };

  const handleTextAreaChange = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const { name, value } = target;
    setQuizData({
      ...quizData!,
      [name]: value,
    });
  };

  return (
    <motion.div
      key="basic"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="space-y-6  rounded-xl shadow-lg" // Added padding and background
    >
      <h2 className="text-2xl font-bold text-white mb-6">Create New Quiz</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Quiz Title *
          </label>
          <motion.input
            whileFocus={{ scale: 1.02 }}
            type="text"
            id="title"
            onInput={(e) => handleChange(e)} // Handle input change
            {...register("title")} // Register the input with react-hook-form
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
              errors.title ? "border-red-500" : "border-purple-500/30"
            }`}
            placeholder="Enter quiz title..."
          />
          {errors.title && (
            <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Description *
          </label>
          <motion.textarea
            whileFocus={{ scale: 1.02 }}
            id="description"
            onInput={(e) => handleTextAreaChange(e)} // Handle textarea change
            {...register("description")} // Register the textarea
            rows={3}
            className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
              errors.description ? "border-red-500" : "border-purple-500/30"
            }`}
            placeholder="Describe what this quiz covers..."
          />
          {errors.description && (
            <p className="text-red-400 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Category and Label */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Category *
            </label>
            <select
              id="category"
              onInput={(e) => selectFieldChange(e)} // Handle select change
              {...register("category")} // Register the select
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.category ? "border-red-500" : "border-purple-500/30"
              }`}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-400 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="label"
              className="block text-sm font-medium text-gray-300 mb-2"
            >
              Label *
            </label>
            <select
              id="label"
              {...register("label")} // Register the select
              onInput={(e) => selectFieldChange(e)} // Handle select change
              className={`w-full px-4 py-3 bg-slate-700/50 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                errors.label ? "border-red-500" : "border-purple-500/30"
              }`}
            >
              <option value="">Select Label</option>
              {labels.map((label) => (
                <option key={label} value={label}>
                  {label}
                </option>
              ))}
            </select>
            {errors.label && (
              <p className="text-red-400 text-sm mt-1">
                {errors.label.message}
              </p>
            )}
          </div>
        </div>

        {/* Tags */}
        <div>
          <label
            htmlFor="tagInput"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Tags *
          </label>
          <div className="flex space-x-2 mb-3">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              id="tagInput"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              placeholder="Add a tag..."
            />
            <motion.button
              type="button" // Important: set type="button" to prevent form submission
              onClick={handleAddTag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-colors flex items-center justify-center"
            >
              <Plus className="h-4 w-4" />
            </motion.button>
          </div>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm flex items-center space-x-2 border border-purple-500/30"
                >
                  <span>{tag}</span>
                  <motion.button
                    type="button" // Important: set type="button"
                    onClick={() => handleRemoveTag(tag)}
                    whileHover={{ scale: 1.2 }}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <X className="h-3 w-3" />
                  </motion.button>
                </motion.span>
              ))}
            </div>
          )}
          {errors.tags && (
            <p className="text-red-400 text-sm mt-1">{errors.tags.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-xl shadow-lg hover:from-purple-700 hover:to-indigo-700 transition-all"
        >
          Create Quiz
        </motion.button>
      </form>
    </motion.div>
  );
};

export default BasicForm;
