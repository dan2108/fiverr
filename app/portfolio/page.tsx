import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllProjects } from '@/app/actions/projects'
import { FileText, Video, Palette, ExternalLink, Sparkles } from 'lucide-react'

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

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'SOCIAL_CONTENT':
      return <FileText className="h-5 w-5" />
    case 'TIKTOK_SCRIPTS':
      return <Video className="h-5 w-5" />
    case 'BRANDING_KIT':
      return <Palette className="h-5 w-5" />
    default:
      return <FileText className="h-5 w-5" />
  }
}

const getTypeColor = (type: string) => {
  switch (type) {
    case 'SOCIAL_CONTENT':
      return 'bg-blue-500/10 text-blue-700 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800'
    case 'TIKTOK_SCRIPTS':
      return 'bg-purple-500/10 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-400 dark:border-purple-800'
    case 'BRANDING_KIT':
      return 'bg-pink-500/10 text-pink-700 border-pink-200 dark:bg-pink-500/20 dark:text-pink-400 dark:border-pink-800'
    default:
      return 'bg-gray-500/10 text-gray-700 border-gray-200'
  }
}

export default async function PortfolioPage() {
  const allProjects = await getAllProjects()
  
  // Group projects by type
  const socialProjects = allProjects.filter(p => p.type === 'SOCIAL_CONTENT')
  const scriptProjects = allProjects.filter(p => p.type === 'TIKTOK_SCRIPTS')
  const brandingProjects = allProjects.filter(p => p.type === 'BRANDING_KIT')

  const renderProjectCard = (project: any) => {
    const output = project.outputJson ? JSON.parse(project.outputJson) : null
    
    return (
      <Card key={project.id} className="group hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${getTypeColor(project.type)}`}>
                  {getTypeIcon(project.type)}
                </div>
                <Badge variant="outline" className={getTypeColor(project.type)}>
                  {getTypeLabel(project.type)}
                </Badge>
              </div>
              <CardTitle className="text-xl mb-1">{project.clientName}</CardTitle>
              {project.clientBusinessName && (
                <p className="text-sm text-muted-foreground mb-2">{project.clientBusinessName}</p>
              )}
              <CardDescription className="mt-2">{project.niche}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {output && (
            <div className="space-y-4">
              {project.type === 'SOCIAL_CONTENT' && output.posts && (
                <div>
                  <p className="text-sm font-medium mb-2">Generated Content:</p>
                  <div className="space-y-2">
                    {output.posts.slice(0, 3).map((post: any, idx: number) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">{post.concept}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{post.caption}</p>
                      </div>
                    ))}
                    {output.posts.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{output.posts.length - 3} more posts</p>
                    )}
                  </div>
                </div>
              )}
              
              {project.type === 'TIKTOK_SCRIPTS' && output.scripts && (
                <div>
                  <p className="text-sm font-medium mb-2">Generated Scripts:</p>
                  <div className="space-y-2">
                    {output.scripts.slice(0, 3).map((script: any, idx: number) => (
                      <div key={idx} className="p-3 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">{script.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{script.hook}</p>
                      </div>
                    ))}
                    {output.scripts.length > 3 && (
                      <p className="text-xs text-muted-foreground">+{output.scripts.length - 3} more scripts</p>
                    )}
                  </div>
                </div>
              )}
              
              {project.type === 'BRANDING_KIT' && output && (
                <div>
                  <p className="text-sm font-medium mb-2">Branding Elements:</p>
                  <div className="space-y-2">
                    {output.brand_names && output.brand_names.length > 0 && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs font-medium mb-1">Brand Names:</p>
                        <p className="text-sm">{output.brand_names.slice(0, 3).join(', ')}</p>
                      </div>
                    )}
                    {output.taglines && output.taglines.length > 0 && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs font-medium mb-1">Taglines:</p>
                        <p className="text-sm">{output.taglines[0]}</p>
                      </div>
                    )}
                    {output.color_palette && output.color_palette.length > 0 && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-xs font-medium mb-2">Color Palette:</p>
                        <div className="flex gap-2">
                          {output.color_palette.slice(0, 5).map((color: any, idx: number) => (
                            <div
                              key={idx}
                              className="w-8 h-8 rounded border"
                              style={{ backgroundColor: color.hex }}
                              title={color.name}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(project.createdAt).toLocaleDateString()}
            </span>
            <Link href={`/projects/${project.id}`}>
              <Button variant="ghost" size="sm" className="group-hover:text-primary">
                View Details
                <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">AI-Powered Content Studio</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Portfolio & Showcase</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of AI-generated content, scripts, and branding kits created for clients across various industries.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{allProjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Social Content Packs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{socialProjects.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Branding Kits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{brandingProjects.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Projects by Category */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="all">All Projects</TabsTrigger>
          <TabsTrigger value="social">Social Content</TabsTrigger>
          <TabsTrigger value="scripts">TikTok Scripts</TabsTrigger>
          <TabsTrigger value="branding">Branding Kits</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {allProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No projects to showcase yet. Create your first project to get started!</p>
                <Link href="/social/new" className="mt-4 inline-block">
                  <Button>Create Your First Project</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {allProjects.map(renderProjectCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="social" className="space-y-6">
          {socialProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No social content projects yet.</p>
                <Link href="/social/new" className="mt-4 inline-block">
                  <Button>Create Social Content</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {socialProjects.map(renderProjectCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="scripts" className="space-y-6">
          {scriptProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No TikTok script projects yet.</p>
                <Link href="/scripts/new" className="mt-4 inline-block">
                  <Button>Create Scripts</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {scriptProjects.map(renderProjectCard)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="branding" className="space-y-6">
          {brandingProjects.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No branding kit projects yet.</p>
                <Link href="/branding/new" className="mt-4 inline-block">
                  <Button>Create Branding Kit</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {brandingProjects.map(renderProjectCard)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* CTA Section */}
      <Card className="mt-12 bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Create Your Content?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Start generating professional social media content, TikTok scripts, or branding kits in minutes.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/social/new">
              <Button size="lg">
                <FileText className="mr-2 h-4 w-4" />
                Create Social Content
              </Button>
            </Link>
            <Link href="/scripts/new">
              <Button size="lg" variant="outline">
                <Video className="mr-2 h-4 w-4" />
                Create Scripts
              </Button>
            </Link>
            <Link href="/branding/new">
              <Button size="lg" variant="outline">
                <Palette className="mr-2 h-4 w-4" />
                Create Branding Kit
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

