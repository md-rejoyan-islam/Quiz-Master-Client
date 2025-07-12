import { loggedInUser } from "@/app/actions";
import AnimatedBackground from "@/components/animated-background";
import QuizzesBody from "@/components/main/quizzes/quizzes-body";
import QuizzesHeader from "@/components/main/quizzes/quizzes-header";
import { getAllCategories, getAllQuizzes } from "@/query/quizzes";

export const metadata = {
  title: "Quizzes",
  description:
    "Explore a wide range of quizzes across various subjects and difficulty levels.",
};

const Quizzes = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    category?: string;
    label?: string;
    sortBy?: string;
    sortOrder?: string;
    search?: string;
  }>;
}) => {
  const { page, limit, category, label, sortBy, sortOrder, search } =
    await searchParams;

  const query = [
    `page=${page || 1}&limit=${limit || 12}&status=published`,
    category && `&category=${category}`,
    label && `&label=${label}`,
    sortBy && `&sortBy=${sortBy}`,
    sortOrder && `&sortOrder=${sortOrder}`,
    search && `&search=${search}`,
  ]
    .filter(Boolean)
    .join("");

  const { error, data, pagination } = await getAllQuizzes(query);
  const { data: categories } = await getAllCategories();
  const { user } = await loggedInUser();

  return (
    <section className="py-8 relative md:py-12  bg-gradient-to-b from-transparent via-transparent  to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedBackground
          scale={[1, 1.2, 1]}
          rotate={[0, 180, 360]}
          duration={20}
          className="bottom-20 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
        />
        <QuizzesHeader />

        <QuizzesBody
          quizzes={data || []}
          error={error}
          page={page}
          category={category}
          categories={categories || []}
          label={label}
          sortBy={sortBy}
          sortOrder={sortOrder}
          search={search}
          pagination={pagination}
          userId={user?.id || null}
        />
      </div>
    </section>
  );
};

export default Quizzes;
