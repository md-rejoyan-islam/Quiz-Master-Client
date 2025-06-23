// "use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Atom,
  BookOpen,
  Calculator,
  Clock,
  Globe,
  Target,
  Users,
} from "lucide-react";
import Link from "next/link";
import AnimatedBackgroundPattern from "../animated-background-pattern";
import BadgeBtn from "../button/badge-btn";
import GradientAnimatedBtn from "../button/gradient-animated-btn";
import SectionSubtitle from "./section-subtitle";
import SectionTitle from "./section-title";

export const quizData = [
  {
    id: "math-algebra",
    title: "Algebra Fundamentals",
    category: "Mathematics",
    description:
      "Test your understanding of basic algebraic concepts including equations, inequalities, and functions.",
    timeLimit: 15,
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        question: "What is the value of x in the equation 2x + 5 = 13?",
        options: ["x = 4", "x = 6", "x = 8", "x = 9"],
        correctAnswer: 0,
        explanation: "Solving: 2x + 5 = 13 → 2x = 8 → x = 4",
      },
      {
        id: "q2",
        question: "Which of the following is equivalent to (x + 3)²?",
        options: ["x² + 6", "x² + 6x + 9", "x² + 9", "x² + 3x + 9"],
        correctAnswer: 1,
        explanation: "(x + 3)² = x² + 2(x)(3) + 3² = x² + 6x + 9",
      },
      {
        id: "q3",
        question: "If f(x) = 2x - 1, what is f(5)?",
        options: ["9", "10", "11", "12"],
        correctAnswer: 0,
        explanation: "f(5) = 2(5) - 1 = 10 - 1 = 9",
      },
      {
        id: "q4",
        question:
          "What is the slope of the line passing through points (2, 3) and (4, 7)?",
        options: ["1", "2", "3", "4"],
        correctAnswer: 1,
        explanation: "Slope = (y₂ - y₁)/(x₂ - x₁) = (7 - 3)/(4 - 2) = 4/2 = 2",
      },
      {
        id: "q5",
        question: "Solve for x: 3x - 7 = 2x + 5",
        options: ["x = 10", "x = 11", "x = 12", "x = 13"],
        correctAnswer: 2,
        explanation: "3x - 7 = 2x + 5 → 3x - 2x = 5 + 7 → x = 12",
      },
    ],
  },
  {
    id: "science-biology",
    title: "Cell Biology Basics",
    category: "Science",
    description:
      "Explore the fundamental concepts of cell structure, function, and processes in living organisms.",
    timeLimit: 20,
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        question: 'Which organelle is known as the "powerhouse of the cell"?',
        options: [
          "Nucleus",
          "Mitochondria",
          "Ribosomes",
          "Endoplasmic Reticulum",
        ],
        correctAnswer: 1,
        explanation:
          "Mitochondria produce ATP through cellular respiration, providing energy for cellular processes.",
      },
      {
        id: "q2",
        question: "What is the main function of the cell membrane?",
        options: [
          "Protein synthesis",
          "DNA storage",
          "Controlling what enters and exits the cell",
          "Energy production",
        ],
        correctAnswer: 2,
        explanation:
          "The cell membrane is selectively permeable and regulates the movement of substances in and out of the cell.",
      },
      {
        id: "q3",
        question:
          "During which phase of mitosis do chromosomes align at the cell's equator?",
        options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
        correctAnswer: 1,
        explanation:
          "During metaphase, chromosomes align at the metaphase plate (cell's equator) before separating.",
      },
      {
        id: "q4",
        question: "What type of cell lacks a membrane-bound nucleus?",
        options: ["Eukaryotic", "Prokaryotic", "Plant cell", "Animal cell"],
        correctAnswer: 1,
        explanation:
          "Prokaryotic cells (bacteria and archaea) do not have a membrane-bound nucleus.",
      },
      {
        id: "q5",
        question: "Which process converts glucose into ATP without oxygen?",
        options: [
          "Aerobic respiration",
          "Photosynthesis",
          "Fermentation",
          "Glycolysis",
        ],
        correctAnswer: 2,
        explanation:
          "Fermentation is an anaerobic process that converts glucose to ATP without requiring oxygen.",
      },
    ],
  },
  {
    id: "history-world-war",
    title: "World War II Timeline",
    category: "History",
    description:
      "Test your knowledge of major events, dates, and figures from World War II.",
    timeLimit: 25,
    difficulty: "Hard",
    questions: [
      {
        id: "q1",
        question: "When did World War II officially begin?",
        options: [
          "September 1, 1939",
          "December 7, 1941",
          "June 22, 1941",
          "May 8, 1945",
        ],
        correctAnswer: 0,
        explanation:
          "World War II began on September 1, 1939, when Germany invaded Poland.",
      },
      {
        id: "q2",
        question:
          "Which battle is considered the turning point of the war in the Pacific?",
        options: [
          "Pearl Harbor",
          "Battle of Midway",
          "Battle of Guadalcanal",
          "Battle of Iwo Jima",
        ],
        correctAnswer: 1,
        explanation:
          "The Battle of Midway (June 4-7, 1942) marked the turning point in the Pacific War.",
      },
      {
        id: "q3",
        question: "What was the code name for the D-Day invasion?",
        options: [
          "Operation Barbarossa",
          "Operation Overlord",
          "Operation Market Garden",
          "Operation Torch",
        ],
        correctAnswer: 1,
        explanation:
          "Operation Overlord was the code name for the Allied invasion of Normandy on June 6, 1944.",
      },
      {
        id: "q4",
        question: "Which country was NOT part of the Axis Powers?",
        options: ["Germany", "Italy", "Japan", "Soviet Union"],
        correctAnswer: 3,
        explanation:
          "The Soviet Union was part of the Allied Powers, not the Axis Powers.",
      },
      {
        id: "q5",
        question: "When did World War II end in Europe?",
        options: [
          "May 8, 1945",
          "August 15, 1945",
          "September 2, 1945",
          "April 30, 1945",
        ],
        correctAnswer: 0,
        explanation:
          "VE Day (Victory in Europe) was May 8, 1945, when Germany officially surrendered.",
      },
    ],
  },
  {
    id: "literature-shakespeare",
    title: "Shakespeare's Greatest Works",
    category: "Literature",
    description:
      "Dive into the world of William Shakespeare and test your knowledge of his famous plays and characters.",
    timeLimit: 18,
    difficulty: "Medium",
    questions: [
      {
        id: "q1",
        question: "In which play does the character Hamlet appear?",
        options: ["Macbeth", "Romeo and Juliet", "Hamlet", "Othello"],
        correctAnswer: 2,
        explanation:
          'Prince Hamlet is the protagonist of Shakespeare\'s tragedy "Hamlet".',
      },
      {
        id: "q2",
        question:
          'Complete this famous quote: "To be or not to be, that is the..."',
        options: ["question", "answer", "problem", "solution"],
        correctAnswer: 0,
        explanation:
          'This is from Hamlet\'s soliloquy: "To be or not to be, that is the question."',
      },
      {
        id: "q3",
        question: "Which play features the characters Romeo and Juliet?",
        options: [
          "A Midsummer Night's Dream",
          "Romeo and Juliet",
          "Much Ado About Nothing",
          "As You Like It",
        ],
        correctAnswer: 1,
        explanation:
          "Romeo and Juliet are the titular characters of Shakespeare's famous tragedy.",
      },
      {
        id: "q4",
        question: "In Macbeth, who tells Macbeth he will become king?",
        options: ["Lady Macbeth", "Banquo", "The Three Witches", "Duncan"],
        correctAnswer: 2,
        explanation:
          "The Three Witches prophesy that Macbeth will become king of Scotland.",
      },
      {
        id: "q5",
        question: "Which play is set in the Forest of Arden?",
        options: [
          "As You Like It",
          "The Tempest",
          "King Lear",
          "Twelfth Night",
        ],
        correctAnswer: 0,
        explanation:
          'The Forest of Arden is the primary setting for Shakespeare\'s comedy "As You Like It".',
      },
    ],
  },
  {
    id: "math-geometry",
    title: "Geometry Essentials",
    category: "Mathematics",
    description:
      "Master the fundamentals of geometry including shapes, angles, area, and volume calculations.",
    timeLimit: 20,
    difficulty: "Easy",
    questions: [
      {
        id: "q1",
        question: "What is the sum of angles in a triangle?",
        options: ["90°", "180°", "270°", "360°"],
        correctAnswer: 1,
        explanation:
          "The sum of all interior angles in any triangle is always 180°.",
      },
      {
        id: "q2",
        question: "What is the area of a rectangle with length 8 and width 5?",
        options: ["13", "26", "40", "80"],
        correctAnswer: 2,
        explanation:
          "Area of rectangle = length × width = 8 × 5 = 40 square units.",
      },
      {
        id: "q3",
        question: "How many sides does a hexagon have?",
        options: ["5", "6", "7", "8"],
        correctAnswer: 1,
        explanation: "A hexagon is a polygon with 6 sides and 6 angles.",
      },
      {
        id: "q4",
        question:
          "What is the circumference of a circle with radius 3? (Use π ≈ 3.14)",
        options: ["9.42", "18.84", "28.26", "37.68"],
        correctAnswer: 1,
        explanation: "Circumference = 2πr = 2 × 3.14 × 3 = 18.84 units.",
      },
      {
        id: "q5",
        question: "Which type of angle measures exactly 90°?",
        options: ["Acute", "Right", "Obtuse", "Straight"],
        correctAnswer: 1,
        explanation: "A right angle measures exactly 90°.",
      },
    ],
  },
  {
    id: "science-chemistry",
    title: "Chemical Reactions & Elements",
    category: "Science",
    description:
      "Test your understanding of chemical elements, compounds, and reaction types.",
    timeLimit: 22,
    difficulty: "Hard",
    questions: [
      {
        id: "q1",
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2,
        explanation:
          'Gold\'s chemical symbol is Au, from the Latin word "aurum".',
      },
      {
        id: "q2",
        question: "How many protons does a carbon atom have?",
        options: ["4", "6", "8", "12"],
        correctAnswer: 1,
        explanation:
          "Carbon has an atomic number of 6, meaning it has 6 protons.",
      },
      {
        id: "q3",
        question:
          "What type of bond forms when electrons are shared between atoms?",
        options: ["Ionic", "Covalent", "Metallic", "Hydrogen"],
        correctAnswer: 1,
        explanation:
          "Covalent bonds form when atoms share electrons to achieve stability.",
      },
      {
        id: "q4",
        question: "What is the pH of pure water at 25°C?",
        options: ["0", "7", "14", "1"],
        correctAnswer: 1,
        explanation:
          "Pure water has a neutral pH of 7 at 25°C (room temperature).",
      },
      {
        id: "q5",
        question: "Which gas makes up about 78% of Earth's atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
        correctAnswer: 2,
        explanation:
          "Nitrogen (N₂) makes up approximately 78% of Earth's atmosphere.",
      },
    ],
  },
];

const categoryIcons = {
  Mathematics: Calculator,
  Science: Atom,
  History: Globe,
  Literature: BookOpen,
};

const difficultyColors = {
  Easy: "bg-green-900/50 text-green-300 border-green-500/30",
  Medium: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
  Hard: "bg-red-900/50 text-red-300 border-red-500/30",
};

const Quizzes = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section
      id="how-to"
      className="py-20 px-4 bg-gradient-to-b from-purple-900/50 to-slate-900 text-white relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-[.15] bg-contain bg-center bg-no-repeat"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: "url(/brain.svg)",
        }}
      ></motion.div>
      <AnimatedBackgroundPattern />

      <div className=" max-w-7xl mx-auto  relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <BadgeBtn
            text="Challenges"
            icon={<Target className="h-4 w-4 mr-2" />}
          />

          <SectionTitle firstLine="Choose Your" secondLine="Challenge" />
          <SectionSubtitle title="Select from our wide range of quiz categories and test your knowledge" />
          <div className="py-4">
            <GradientAnimatedBtn
              rightIcon={<ArrowRight className="ml-2 h-5 w-5" />}
              text="All Quizzes"
              href="/quizzes"
            />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {quizData.slice(0, 4).map((quiz, index) => {
            const IconComponent =
              categoryIcons[quiz.category as keyof typeof categoryIcons];

            return (
              <motion.div
                key={quiz.id}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                //   onClick={() => onStartQuiz(quiz)}
              >
                <Link
                  href={`/quiz/${quiz.id}`}
                  className="bg-white/10 backdrop-blur-sm block rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors"
                    >
                      <IconComponent className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        difficultyColors[
                          quiz.difficulty as keyof typeof difficultyColors
                        ]
                      }`}
                    >
                      {quiz.difficulty}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 truncate transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{quiz.questions.length} Questions</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{quiz.timeLimit} min</span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 group-hover:shadow-lg"
                  >
                    Start Quiz
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Quizzes;
