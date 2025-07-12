import { Skeleton } from "./ui/skeleton";

const CardSkeleton = () => {
  return (
    <div className="w-full max-w-sm rounded-xl bg-gray-800 p-6 shadow-lg">
      {/* Top section: Icon and Hard tag */}
      <div className="mb-6 flex items-start justify-between">
        <Skeleton className="h-12 w-12 rounded-lg" />{" "}
        {/* Brain icon placeholder */}
        <Skeleton className="h-6 w-16 rounded-full" />{" "}
        {/* HARD tag placeholder */}
      </div>
      {/* Title */}
      <Skeleton className="mb-3 h-8 w-3/4 rounded-md" />{" "}
      {/* Title placeholder */}
      {/* Description */}
      <Skeleton className="mb-6 h-5 w-11/12 rounded-md" />{" "}
      {/* Description line 1 */}
      <Skeleton className="mb-6 h-5 w-10/12 rounded-md" />{" "}
      {/* Description line 2 */}
      {/* Stats */}
      <div className="mb-6 flex flex-wrap gap-4">
        <Skeleton className="h-5 w-28 rounded-md" />{" "}
        {/* 5 Questions placeholder */}
        <Skeleton className="h-5 w-24 rounded-md" /> {/* 165 min placeholder */}
        <Skeleton className="h-5 w-28 rounded-md" />{" "}
        {/* 23+ taken placeholder */}
      </div>
      {/* Tags */}
      <div className="mb-8 flex flex-wrap gap-2">
        <Skeleton className="h-7 w-20 rounded-full" />{" "}
        {/* biology tag placeholder */}
        <Skeleton className="h-7 w-20 rounded-full" />{" "}
        {/* science tag placeholder */}
        <Skeleton className="h-7 w-20 rounded-full" />{" "}
        {/* anatomy tag placeholder */}
      </div>
      {/* Button */}
      <Skeleton className="h-14 w-full rounded-xl" />{" "}
      {/* Start Quiz button placeholder */}
    </div>
  );
};

export default CardSkeleton;
