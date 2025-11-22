import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { getProjectById } from '@/app/actions/projects'
import { DuplicateProjectButton } from '@/components/duplicate-project-button'
import { ProjectActions } from '@/components/project-actions'

export default async function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id)

  if (!project) {
    notFound()
  }

  const output = project.outputJson ? JSON.parse(project.outputJson) : null
  const inputs = JSON.parse(project.inputsJson)

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


  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <Link href="/projects">
          <Button variant="ghost" className="mb-4">← Back to Projects</Button>
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.clientName}</h1>
            <div className="flex items-center gap-2">
              <Badge>{getTypeLabel(project.type)}</Badge>
              <span className="text-sm text-muted-foreground">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <ProjectActions output={output} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
            <CardDescription>Input information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Client Name</p>
              <p>{project.clientName}</p>
            </div>
            {project.clientBusinessName && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Business Name</p>
                <p>{project.clientBusinessName}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Niche</p>
              <p>{project.niche}</p>
            </div>
            {project.platform && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Platform</p>
                <p>{project.platform}</p>
              </div>
            )}
            {project.toneOfVoice && (
              <div>
                <p className="text-sm font-medium text-muted-foreground">Tone of Voice</p>
                <p>{project.toneOfVoice}</p>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-muted-foreground">Brief</p>
              <p className="whitespace-pre-wrap">{project.brief}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-2">All Inputs</p>
              <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-64">
                {JSON.stringify(inputs, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Generated Output</CardTitle>
            <CardDescription>AI-generated content</CardDescription>
          </CardHeader>
          <CardContent>
            {output ? (
              <div className="space-y-4">
                <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-[600px]">
                  {JSON.stringify(output, null, 2)}
                </pre>
                <DuplicateProjectButton projectId={project.id} />
              </div>
            ) : (
              <p className="text-muted-foreground">No output generated yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

