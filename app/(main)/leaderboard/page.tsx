import { getCookie, loggedInUser } from "@/app/actions";
import LeaderboardClient from "@/components/main/leaderboard/leaderboard-client";
import { getAllQuizzes, leaderBoard } from "@/query/quizzes";

export const metadata = {
  title: "Leaderboard",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

const LeaderboardPage = async () => {
  const token = await getCookie("accessToken");

  const { data, error } = await leaderBoard(token);
  const { user } = await loggedInUser();
  const { data: quizzes } = await getAllQuizzes(
    `sortBy=attempts&sortOrder=asc&limit=5&page=1`
  );

  return (
    <LeaderboardClient
      data={data ?? []}
      error={error}
      userId={user?.id}
      quizzes={quizzes ?? []}
    />
  );
};

export default LeaderboardPage;
