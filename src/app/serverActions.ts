"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function toggleAIStatus(id: number, newStatus: boolean) {
    const response = await prisma.member.update({
        where: { id }, // Check if record exists
        data: {
            ai_enabled: newStatus
        }
    });
    return { success: true, ai_enabled: newStatus };
}