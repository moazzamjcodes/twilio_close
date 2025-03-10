"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/FormElements/switch";
import { Member } from "@/types/members";
import { useEffect, useState } from "react";
import { toast } from 'react-hot-toast';
import { toggleAIStatus } from "@/app/serverActions";

export function TeamMembersTable({members}: {members: Member[]}) {
	const [switchStatuses, setSwitchStatuses] = useState<boolean[]>([]);
	useEffect(() => {
		initializeSwitchStatuses()
	}, []);
	
	// intialize the switch statuses
	const initializeSwitchStatuses = () => {
		const aiStatuses: boolean[] = members.map(member => member.ai_enabled);
		setSwitchStatuses([...aiStatuses]);
	}

	const handleSwitchChange = async (id: number, index: number) => {
		const statuses = [...switchStatuses];
		statuses[index] = !statuses[index];
		setSwitchStatuses(statuses);
		try {
		  	await toggleAIStatus(id, statuses[index]);
			toast.success("AI status changed");
		} catch (error) {
			console.error("Error while making the API call:", error);
		}
	};
	return (
		<div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card sm:p-7.5">
			<Table>
			<TableHeader>
				<TableRow className="border-none bg-[#F7F9FC] dark:bg-dark-2 [&>th]:py-4 [&>th]:text-base [&>th]:text-dark [&>th]:dark:text-white">
				<TableHead className="min-w-[155px] xl:pl-7.5">Email</TableHead>
				<TableHead>Name</TableHead>
				<TableHead>AI Status</TableHead>
				</TableRow>
			</TableHeader>

			<TableBody>
				{members.map((item, index) => (
				<TableRow key={index} className="border-[#eee] dark:border-dark-3" row-id = {item.id}>
					<TableCell className="min-w-[155px] xl:pl-7.5">
					<h5 className="text-dark dark:text-white"> </h5>
					<p className="mt-[3px] text-body-sm font-medium" data-id={item.id}>
						{item.email}
					</p>
					</TableCell>

					<TableCell>
					<p className="text-dark dark:text-white">{item.first_name} {item.last_name} </p>
					</TableCell>

					<TableCell>
						<Switch background="dark" checked={switchStatuses[index]} onChange={() => handleSwitchChange(item.id, index)} />
					</TableCell>
				</TableRow>
				))}
			</TableBody>
			</Table>
		</div>
	);
}
