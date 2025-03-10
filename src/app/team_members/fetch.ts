import axios from "axios";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CLOSE_API_KEY = process.env.CLOSE_API_KEY;
export const getTeamMembers = async () => {
    try {
        const closeApi = axios.create({
            baseURL: "https://api.close.com/api/v1",
            headers: {
              Authorization: `Basic ${Buffer.from(`${CLOSE_API_KEY}:`).toString("base64")}`,
              "Content-Type": "application/json",
            },
        });

        const response = await closeApi.get("/user");
        // Check if the response is successful
        if (response.status !== 200) {
            throw new Error("Failed to fetch team members");
        }

        const teamMembers = await syncTeamMembers(response.data.data);
		return teamMembers;
    } catch (error) {
      console.error("Error fetching team members:", error);
      throw error;
    }
};

export const syncTeamMembers = async (teamMembers: any[]) => {
	try {
		const members = [];
		for (const member of teamMembers) {
			const response = await prisma.member.upsert({
				where: { close_id: member.id }, // Check if record exists
				update: {
					first_name: member.first_name,
					last_name: member.last_name,
					email: member.email,
				}, // Update existing record
				create: {
					close_id: member.id,
					first_name: member.first_name,
					last_name: member.last_name,
					email: member.email,
					ai_enabled: false
				},
			});

			members.push(response);
		}
		return members;
	} catch (error) {
    	console.error("Error syncing team members:", error);
		return [];
  	}
};

