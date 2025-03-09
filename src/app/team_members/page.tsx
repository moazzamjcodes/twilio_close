import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TeamMembersTable } from "@/components/Tables/team-members";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tables",
};

const TablesPage = () => {
  return (
    <>
    	<Breadcrumb pageName="Tables" />
		<div className="space-y-10">
			<TeamMembersTable />
		</div>
    </>
  );
};

export default TablesPage;
