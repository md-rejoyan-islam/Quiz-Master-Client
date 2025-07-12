"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QUIZ_SET, QUIZ_SET_LABEL, QUIZ_SET_STATUS } from "@/lib/types";
import { motion } from "framer-motion";

import CardSkeleton from "@/components/card-skeleton";
import { Filter, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuizGrid from "./quiz-grid";

const QuizzesBody = ({
  quizzes,
  error,
  page,
  category,
  categories,
  label,
  sortBy: sort,
  sortOrder,
  search,
  pagination,
  userId,
}: {
  quizzes: QUIZ_SET[];
  error: string | null;
  page?: string;
  category?: string;
  categories: string[];
  label?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  userId?: string | null;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}) => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(search || "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    category || "All"
  );
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>(
    label || "all"
  );

  const [sortBy, setSortBy] = useState<string>(
    (sort || "") + (sortOrder || "") || "none"
  );
  const [currentPage, setCurrentPage] = useState<number>(
    page ? parseInt(page) : 1
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  const difficulties = ["easy", "medium", "hard"];

  // handle search
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const params = new URLSearchParams(window.location.search);
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    // debouce the search
    setTimeout(() => {
      router.push(`/quizzes?${params.toString()}`);
    }, 500);
  };

  // handle category change
  const handleCategoryChange = (value: string) => {
    setLoading(true);
    setSelectedCategory(value);
    const params = new URLSearchParams(window.location.search);
    if (value !== "All") {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    setTimeout(() => {
      router.push(`/quizzes?${params.toString()}`);
      setLoading(false);
    }, 500);
  };

  // handle difficulty change
  const handleDifficultyChange = (value: string) => {
    setLoading(true);
    setSelectedDifficulty(value);
    const params = new URLSearchParams(window.location.search);
    if (value !== "all") {
      params.set("label", value.toLowerCase());
    } else {
      params.delete("label");
    }
    setTimeout(() => {
      router.push(`/quizzes?${params.toString()}`);
      setLoading(false);
    }, 500);
  };

  // handle sort change
  const handleSortChange = (value: string) => {
    setLoading(true);
    setSortBy(value);
    const params = new URLSearchParams(window.location.search);
    if (value === "createdAtdesc") {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "desc");
    } else if (value === "createdAtasc") {
      params.set("sortBy", "createdAt");
      params.set("sortOrder", "asc");
    } else if (value === "attemptsdesc") {
      params.set("sortBy", "attempts");
      params.set("sortOrder", "desc");
    } else {
      params.delete("sortBy");
      params.delete("sortOrder");
    }
    setTimeout(() => {
      router.push(`/quizzes?${params.toString()}`);
      setLoading(false);
    }, 500);
  };

  // handle pagination
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    router.push(`/quizzes?${params.toString()}`);
  };

  useEffect(() => {
    if (!searchParams.has("page")) {
      router.push(`/quizzes?page=1&limit=12`);
    }
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="text-red-500 text-center py-8 mt-10">
        <p>Error loading quizzes: {error}</p>
      </div>
    );
  }

  return (
    <>
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
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <Select
              value={selectedCategory}
              onValueChange={(value) => handleCategoryChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {categories.map((category, index) => (
                  <SelectItem
                    value={category}
                    key={index}
                    className="capitalize"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDifficulty}
              onValueChange={(value) => handleDifficultyChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Difficulties</SelectItem>
                {difficulties.map((difficulty, index) => (
                  <SelectItem
                    value={difficulty}
                    key={index}
                    className="capitalize"
                  >
                    {difficulty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={sortBy}
              onValueChange={(value) => handleSortChange(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a sort option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sort By</SelectItem>
                <SelectItem value="createdAtdesc">Newest First</SelectItem>
                <SelectItem value="createdAtasc">Oldest First</SelectItem>
                <SelectItem value="attemptsdesc">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
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
              {quizzes?.length}
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
      <QuizGrid
        quizzes={quizzes?.map((quiz) => ({
          ...quiz,
          status: quiz.status as QUIZ_SET_STATUS,
          label: quiz.label as QUIZ_SET_LABEL,
          isAttempted: quiz?.attempts.some(
            (attempt) => attempt.userId === userId
          ),
        }))}
      />

      {loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* No Results */}
      {quizzes?.length === 0 && (
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
              We couldn&apos;t find any quizzes matching your current filters.
              Try adjusting your search criteria.
            </p>
          </div>
        </motion.div>
      )}

      {/* Pagination  with previous and next buttons */}
      <div className="flex items-center justify-between mt-16 max-w-sm mx-auto">
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200  disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {pagination?.totalPages || 1}
        </span>
        <button
          className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50"
          disabled={currentPage >= (pagination?.totalPages || 1)}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default QuizzesBody;
