import { getCookie } from "@/app/actions";
import DashboardPageHeader from "@/components/dashboard/header/dashboard-page-header";
import DashboardUserClient from "@/components/dashboard/users/users-client";
import { getAllUsers } from "@/query/users";

const DashboardUserPage = async () => {
  const token = await getCookie("accessToken");

  const { data } = await getAllUsers(`limit=100`, token);

  return (
    <>
      <DashboardPageHeader
        label="User Management"
        description="Manage user accounts"
      />
      <DashboardUserClient data={data} token={token} />
    </>
  );
};

export default DashboardUserPage;
