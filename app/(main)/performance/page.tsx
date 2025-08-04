import { getCookie, loggedInUser } from "@/app/actions";
import UserPerformance from "@/components/main/performance/user-performance";
import { getAllUserAttemptById } from "@/query/users";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Performance",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const Page = async () => {
  const token = await getCookie("accessToken");

  const { user, error } = await loggedInUser();

  const { data } = user
    ? await getAllUserAttemptById(user?.id, token)
    : { data: [] };
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-transparent via-transparent to-slate-900 px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-red-500">Error</h1>
          <p className="text-lg text-gray-300 mt-4">{error}</p>
        </div>
      </div>
    );
  }

  return <UserPerformance data={data?.slice(0, 4) ?? []} />;
};

export default Page;
