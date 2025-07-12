import Hero from "@/components/main/home/hero";
import HowItWorks from "@/components/main/home/how-it-work";
import Quizzes from "@/components/main/home/quizzes";
import Statistics from "@/components/main/home/statistics";
import { getAllQuizzes } from "@/query/quizzes";
import { loggedInUser } from "../actions";

export const metadata = {
  title: "Home | Quiz Master",
  description: "A fun and interactive quiz platform for all knowledge levels",
};

export default async function Home() {
  const { user } = await loggedInUser();
  const { error, data } = await getAllQuizzes(
    "page=1&limit=10&status=published"
  );

  return (
    <>
      <Hero />
      <HowItWorks />
      <Statistics />
      <Quizzes quizzes={data} error={error} userId={user?.id || null} />
    </>
  );
}
