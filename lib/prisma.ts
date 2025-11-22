import type { PrismaClient } from '@prisma/client'
import { PrismaClient as PrismaClientConstructor } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? new PrismaClientConstructor()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

