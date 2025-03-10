import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { TeamMembersTable } from "@/components/Tables/team-members";
import { getTeamMembers } from "./fetch";
import { Member } from "@/types/members"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Members",
};

const TablesPage = async () => {
	const members =  await getTeamMembers() as Member[];
	return (
		<>
			<Breadcrumb pageName="Tables" />
			<div className="space-y-10">
				<TeamMembersTable members = {members}/>
			</div>
		</>
	);
};

export default TablesPage;
