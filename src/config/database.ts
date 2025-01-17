import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient()

export async function connectToDB() {
    try {
        await db.$connect();
        console.log("[database]: connected!")
    } catch(error) {
        console.log("[database]: conenction error " + error )
        await db.$disconnect();
    }
}