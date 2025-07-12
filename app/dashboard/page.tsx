import DashboardOverview from "@/components/dashboard/dashboard-overview";
import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import { getAllUsers } from "@/query/users";
import { getCookie } from "../actions";

const DashboardOverviewPage = async () => {
  const token = await getCookie("accessToken");

  const { data } = await getAllUsers(undefined, token);

  const summary = {
    totalUsers: data?.pagination?.totalItems || 0,
    activeQuizzes: 0,
    completedQuizzes: 0,
    averageScore: 0,
  };

  return (
    <>
      <DashboardPageHeader
        label="Dashboard Overview"
        description="Monitor your platform performance"
      />
      <DashboardOverview summary={summary} />
    </>
  );
};

export default DashboardOverviewPage;
