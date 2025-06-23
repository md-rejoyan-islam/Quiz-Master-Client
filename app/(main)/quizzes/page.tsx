"use client";
import { motion } from "framer-motion";
import {
  Atom,
  Award,
  BookOpen,
  Calculator,
  ChevronDown,
  Clock,
  Filter,
  Globe,
  Search,
  SlidersHorizontal,
  Star,
  TrendingUp,
  Users,
  X,
} from "lucide-react";
import React, { useMemo, useState } from "react";

export const quizData = [
  {
    id: "math-algebra",
    title: "Algebra Fundamentals",
    category: "Mathematics",
    description:
      "Test your understanding of basic algebraic concepts including equations, inequalities, and functions.",
    timeLimit: 15,
    difficulty: "Medium",
    tags: ["algebra", "equations", "functions"],
    rating: 4.8,
    completions: 1250,
    createdAt: "2024-01-15",
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
    tags: ["biology", "cells", "organelles"],
    rating: 4.6,
    completions: 980,
    createdAt: "2024-01-20",
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
    tags: ["history", "world war", "timeline"],
    rating: 4.9,
    completions: 750,
    createdAt: "2024-01-10",
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
    tags: ["literature", "shakespeare", "plays"],
    rating: 4.7,
    completions: 1100,
    createdAt: "2024-01-25",
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
    tags: ["geometry", "shapes", "angles"],
    rating: 4.5,
    completions: 1500,
    createdAt: "2024-02-01",
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
    tags: ["chemistry", "elements", "reactions"],
    rating: 4.4,
    completions: 650,
    createdAt: "2024-01-30",
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
  {
    id: "history-ancient-civilizations",
    title: "Ancient Civilizations",
    category: "History",
    description:
      "Explore the rise and fall of ancient civilizations including Egypt, Greece, and Rome.",
    timeLimit: 30,
    difficulty: "Medium",
    tags: ["ancient history", "civilizations", "egypt"],
    rating: 4.6,
    completions: 890,
    createdAt: "2024-02-05",
    questions: [
      {
        id: "q1",
        question:
          "Which ancient wonder of the world was located in Alexandria?",
        options: [
          "Colossus of Rhodes",
          "Lighthouse of Alexandria",
          "Hanging Gardens",
          "Temple of Artemis",
        ],
        correctAnswer: 1,
        explanation:
          "The Lighthouse of Alexandria (Pharos) was one of the Seven Wonders of the Ancient World.",
      },
      {
        id: "q2",
        question: "Who was the first emperor of Rome?",
        options: ["Julius Caesar", "Augustus", "Nero", "Trajan"],
        correctAnswer: 1,
        explanation:
          "Augustus (originally Octavian) became the first Roman Emperor in 27 BCE.",
      },
      {
        id: "q3",
        question: "Which river was crucial to ancient Egyptian civilization?",
        options: ["Euphrates", "Tigris", "Nile", "Indus"],
        correctAnswer: 2,
        explanation:
          "The Nile River was the lifeline of ancient Egyptian civilization, providing water and fertile soil.",
      },
      {
        id: "q4",
        question: "What was the primary writing system of ancient Mesopotamia?",
        options: ["Hieroglyphics", "Cuneiform", "Linear A", "Phoenician"],
        correctAnswer: 1,
        explanation:
          "Cuneiform was the writing system used in ancient Mesopotamia, written on clay tablets.",
      },
      {
        id: "q5",
        question: "Which Greek philosopher taught Alexander the Great?",
        options: ["Socrates", "Plato", "Aristotle", "Pythagoras"],
        correctAnswer: 2,
        explanation:
          "Aristotle was the tutor of Alexander the Great from 343 to 336 BCE.",
      },
    ],
  },
  {
    id: "literature-modern-classics",
    title: "Modern Literary Classics",
    category: "Literature",
    description:
      "Test your knowledge of 20th century literary masterpieces and their authors.",
    timeLimit: 25,
    difficulty: "Hard",
    tags: ["modern literature", "classics", "20th century"],
    rating: 4.8,
    completions: 420,
    createdAt: "2024-02-10",
    questions: [
      {
        id: "q1",
        question: 'Who wrote "To Kill a Mockingbird"?',
        options: [
          "Harper Lee",
          "Toni Morrison",
          "Maya Angelou",
          "Flannery O'Connor",
        ],
        correctAnswer: 0,
        explanation:
          'Harper Lee wrote "To Kill a Mockingbird," published in 1960.',
      },
      {
        id: "q2",
        question: "In which novel does the character Winston Smith appear?",
        options: ["Brave New World", "1984", "Animal Farm", "Fahrenheit 451"],
        correctAnswer: 1,
        explanation:
          'Winston Smith is the protagonist of George Orwell\'s dystopian novel "1984".',
      },
      {
        id: "q3",
        question: 'What is the opening line of "The Catcher in the Rye"?',
        options: [
          "Call me Ishmael",
          "It was the best of times",
          "If you really want to hear about it",
          "In a hole in the ground",
        ],
        correctAnswer: 2,
        explanation:
          'J.D. Salinger\'s "The Catcher in the Rye" begins with "If you really want to hear about it..."',
      },
      {
        id: "q4",
        question: 'Who wrote "One Hundred Years of Solitude"?',
        options: [
          "Jorge Luis Borges",
          "Gabriel García Márquez",
          "Mario Vargas Llosa",
          "Pablo Neruda",
        ],
        correctAnswer: 1,
        explanation:
          'Gabriel García Márquez wrote "One Hundred Years of Solitude," a masterpiece of magical realism.',
      },
      {
        id: "q5",
        question: "Which novel features the character Jay Gatsby?",
        options: [
          "The Sun Also Rises",
          "The Great Gatsby",
          "This Side of Paradise",
          "Tender Is the Night",
        ],
        correctAnswer: 1,
        explanation:
          'Jay Gatsby is the titular character of F. Scott Fitzgerald\'s "The Great Gatsby".',
      },
    ],
  },
];

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface Quiz {
  id: string;
  title: string;
  category: string;
  description: string;
  questions: Question[];
  timeLimit: number; // in minutes
  difficulty: "Easy" | "Medium" | "Hard";
  tags?: string[];
  rating?: number;
  completions?: number;
  createdAt?: string;
}

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

const QuizzesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [minDuration, setMinDuration] = useState<number>(0);
  const [maxDuration, setMaxDuration] = useState<number>(60);

  const categories = [
    "All",
    ...Array.from(new Set(quizData.map((quiz) => quiz.category))),
  ];
  const difficulties = ["All", "Easy", "Medium", "Hard"];

  const filteredAndSortedQuizzes = useMemo(() => {
    const filtered = quizData.filter((quiz) => {
      const matchesSearch =
        quiz.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quiz.category.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || quiz.category === selectedCategory;
      const matchesDifficulty =
        selectedDifficulty === "All" || quiz.difficulty === selectedDifficulty;
      const matchesDuration =
        quiz.timeLimit >= minDuration && quiz.timeLimit <= maxDuration;

      return (
        matchesSearch && matchesCategory && matchesDifficulty && matchesDuration
      );
    });

    // Sort quizzes
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt || "2024-01-01").getTime() -
            new Date(a.createdAt || "2024-01-01").getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt || "2024-01-01").getTime() -
            new Date(b.createdAt || "2024-01-01").getTime()
          );
        case "difficulty":
          const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case "duration":
          return a.timeLimit - b.timeLimit;
        case "popular":
          return (b.completions || 0) - (a.completions || 0);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchTerm,
    selectedCategory,
    selectedDifficulty,
    sortBy,
    minDuration,
    maxDuration,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setSelectedDifficulty("All");
    setSortBy("newest");
    setMinDuration(0);
    setMaxDuration(60);
  };

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
    <section className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-full text-purple-300 text-sm font-medium mb-6 border border-purple-500/30"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Explore All Quizzes
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              Learning Challenge
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Browse through our comprehensive collection of quizzes across
            multiple subjects and difficulty levels
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-purple-500/20"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full lg:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search quizzes, topics, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                {difficulties.map((difficulty) => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="difficulty">By Difficulty</option>
                <option value="duration">By Duration</option>
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-medium transition-colors flex items-center space-x-2"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </motion.button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-purple-500/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Duration Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    Duration Range (minutes)
                  </label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={minDuration}
                      onChange={(e) => setMinDuration(Number(e.target.value))}
                      className="w-20 px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                    <span className="text-gray-400">to</span>
                    <input
                      type="number"
                      min="0"
                      max="120"
                      value={maxDuration}
                      onChange={(e) => setMaxDuration(Number(e.target.value))}
                      className="w-20 px-3 py-2 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearFilters}
                    className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <X className="h-4 w-4" />
                    <span>Clear All</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Results Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <span className="text-gray-300">
              Showing{" "}
              <span className="text-purple-400 font-semibold">
                {filteredAndSortedQuizzes.length}
              </span>{" "}
              quizzes
            </span>
            {(searchTerm ||
              selectedCategory !== "All" ||
              selectedDifficulty !== "All") && (
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-purple-300">Filters applied</span>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quiz Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredAndSortedQuizzes.map((quiz) => {
            const IconComponent =
              categoryIcons[quiz.category as keyof typeof categoryIcons];

            return (
              <motion.div
                key={quiz.id}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                  rotateX: 5,
                  z: 50,
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                }}
                className="bg-slate-800/50 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 border border-purple-500/20 hover:border-purple-400/40 group cursor-pointer overflow-hidden backdrop-blur-sm relative"
                onClick={() => onStartQuiz(quiz)}
              >
                {/* Background Decoration */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -translate-y-10 translate-x-10"
                />

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className="p-3 bg-purple-900/50 rounded-lg group-hover:bg-purple-800/50 transition-colors"
                    >
                      <IconComponent className="h-6 w-6 text-purple-400" />
                    </motion.div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${
                          difficultyColors[quiz.difficulty]
                        }`}
                      >
                        {quiz.difficulty}
                      </span>
                      {quiz.rating && (
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-300">
                            {quiz.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {quiz.title}
                  </h3>

                  <p className="text-gray-300 mb-4 line-clamp-3 group-hover:text-gray-200 transition-colors">
                    {quiz.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{quiz.questions.length} Questions</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{quiz.timeLimit} min</span>
                      </div>
                    </div>
                    {quiz.completions && (
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="h-4 w-4" />
                        <span>{quiz.completions}+ taken</span>
                      </div>
                    )}
                  </div>

                  {/* Tags */}
                  {quiz.tags && quiz.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {quiz.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-slate-700/50 text-xs text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 group-hover:shadow-lg flex items-center justify-center space-x-2"
                  >
                    <span>Start Quiz</span>
                    <Award className="h-4 w-4" />
                  </motion.button>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Results */}
        {filteredAndSortedQuizzes.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="bg-slate-800/50 rounded-2xl p-12 border border-purple-500/20 backdrop-blur-sm">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">
                No Quizzes Found
              </h3>
              <p className="text-gray-300 mb-6 max-w-md mx-auto">
                We couldn't find any quizzes matching your current filters. Try
                adjusting your search criteria.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearFilters}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-semibold transition-colors"
              >
                Clear All Filters
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default QuizzesPage;
