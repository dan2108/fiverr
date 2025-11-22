import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Video, Palette, FolderOpen, Briefcase } from 'lucide-react'
import { getProjectStats, getRecentProjects } from '@/app/actions/projects'
import { Badge } from '@/components/ui/badge'

export default async function Dashboard() {
  const stats = await getProjectStats()
  const recentProjects = await getRecentProjects()

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'SOCIAL_CONTENT':
        return 'bg-blue-500'
      case 'TIKTOK_SCRIPTS':
        return 'bg-purple-500'
      case 'BRANDING_KIT':
        return 'bg-pink-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to AI Fiverr Studio</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Social Content</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.social}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">TikTok Scripts</CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scripts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Branding Kits</CardTitle>
            <Palette className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.branding}</div>
          </CardContent>
        </Card>
      </div>

      {/* Portfolio CTA */}
      <Card className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold mb-1">Showcase Your Work</h2>
              <p className="text-muted-foreground">View your portfolio of generated content and projects</p>
            </div>
            <Link href="/portfolio">
              <Button size="lg">
                <Briefcase className="mr-2 h-4 w-4" />
                View Portfolio
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>New Social Content Pack</CardTitle>
            <CardDescription>Generate social media posts for your client</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/social/new">
              <Button className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Create Social Content
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New TikTok Scripts</CardTitle>
            <CardDescription>Create short-form video scripts</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/scripts/new">
              <Button className="w-full">
                <Video className="mr-2 h-4 w-4" />
                Create Scripts
              </Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>New Branding Kit</CardTitle>
            <CardDescription>Generate brand names, colors, and guidelines</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/branding/new">
              <Button className="w-full">
                <Palette className="mr-2 h-4 w-4" />
                Create Branding Kit
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Projects</CardTitle>
          <CardDescription>Your last 5 projects</CardDescription>
        </CardHeader>
        <CardContent>
          {recentProjects.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No projects yet. Create your first project to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {recentProjects.map((project: any) => (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(project.type)}`} />
                    <div>
                      <div className="font-medium">{project.clientName}</div>
                      <div className="text-sm text-muted-foreground">{project.niche}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{getTypeLabel(project.type)}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
