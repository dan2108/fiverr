'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function getProjectStats() {
  const [total, social, scripts, branding] = await Promise.all([
    prisma.project.count(),
    prisma.project.count({ where: { type: 'SOCIAL_CONTENT' } }),
    prisma.project.count({ where: { type: 'TIKTOK_SCRIPTS' } }),
    prisma.project.count({ where: { type: 'BRANDING_KIT' } }),
  ])

  return { total, social, scripts, branding }
}

export async function getRecentProjects(limit = 5) {
  return prisma.project.findMany({
    take: limit,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      type: true,
      clientName: true,
      niche: true,
      createdAt: true,
    },
  })
}

export async function getAllProjects(filters?: {
  type?: string
  search?: string
}) {
  const where: any = {}
  
  if (filters?.type) {
    where.type = filters.type
  }
  
  if (filters?.search) {
    // SQLite doesn't support case-insensitive mode, so we use contains
    where.OR = [
      { clientName: { contains: filters.search } },
      { niche: { contains: filters.search } },
    ]
  }

  return prisma.project.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
  })
}

export async function createProject(data: {
  type: string
  clientName: string
  clientBusinessName?: string
  niche: string
  platform?: string
  toneOfVoice?: string
  language: string
  brief: string
  inputsJson: string
  outputJson?: string
}) {
  const project = await prisma.project.create({
    data,
  })
  revalidatePath('/projects')
  revalidatePath('/')
  return project
}

export async function duplicateProject(id: string) {
  const project = await prisma.project.findUnique({
    where: { id },
  })

  if (!project) {
    throw new Error('Project not found')
  }

  const { id: _, createdAt, updatedAt, ...data } = project
  const newProject = await prisma.project.create({
    data: {
      ...data,
      clientName: `${data.clientName} (Copy)`,
    },
  })
  revalidatePath('/projects')
  return newProject
}

