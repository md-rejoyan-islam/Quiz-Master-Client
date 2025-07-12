import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import CreateQuizClient from "@/components/dashboard/quiz-management/create-quiz/create-quiz-client";

const CreateQuizPage = () => {
  return (
    <>
      <DashboardPageHeader
        label="Create new quiz set"
        description="Create and manage quiz content"
      />
      <CreateQuizClient />
    </>
  );
};

export default CreateQuizPage;
