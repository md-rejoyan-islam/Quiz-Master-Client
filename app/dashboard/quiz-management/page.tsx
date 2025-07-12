import { getCookie, loggedInUser } from "@/app/actions";
import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import QuizManagementClient from "@/components/dashboard/quiz-management-client";
import { getAllAdminQuizzesByUserId } from "@/query/quizzes";

const QuizManagement = async () => {
  const token = await getCookie("accessToken");

  const { user } = await loggedInUser();

  const { data } = user?.id
    ? await getAllAdminQuizzesByUserId(user?.id, token)
    : { data: [] };

  return (
    <>
      <DashboardPageHeader
        label="Quiz Management"
        description="Create and manage quiz content"
      />
      <div className="px-8 py-6 space-y-4">
        <QuizManagementClient data={data} />
      </div>
    </>
  );
};

export default QuizManagement;
