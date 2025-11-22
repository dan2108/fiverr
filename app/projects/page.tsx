import { Suspense } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { getAllProjects } from '@/app/actions/projects'
import { ProjectsClient } from '@/components/projects-client'

const getTypeLabel = (type: string) => {
  switch (type) {
    case 'SOCIAL_CONTENT':
      return 'Social Content'
    case 'TIKTOK_SCRIPTS':
      return 'TikTok Scripts'
    case 'BRANDING_KIT':
      return 'Branding Kit'
    default:
      return type
  }
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { type?: string; search?: string }
}) {
  const projects = await getAllProjects({
    type: searchParams.type,
    search: searchParams.search,
  })

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Projects</h1>
        <p className="text-muted-foreground">View and manage all your projects</p>
      </div>

      <Suspense fallback={<div>Loading filters...</div>}>
        <ProjectsClient initialProjects={projects} />
      </Suspense>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>All Projects</CardTitle>
          <CardDescription>{projects.length} project{projects.length !== 1 ? 's' : ''} found</CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No projects found. Create your first project to get started!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Niche</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.map((project: any) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">{project.clientName}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{getTypeLabel(project.type)}</Badge>
                      </TableCell>
                      <TableCell>{project.niche}</TableCell>
                      <TableCell>
                        {new Date(project.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Link href={`/projects/${project.id}`}>
                          <Button variant="outline" size="sm">View</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
