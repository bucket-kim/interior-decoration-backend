import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient()

export const connectToDB = async () => {
  try {
    await db.$connect()
    console.log(`[database]: connected!`)
  } catch (error) {
    console.log(`[database]: connection error ${error}`)
    await db.$disconnect()
  }
}
