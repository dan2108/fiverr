'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { generateSocialContent } from '@/app/actions/generate'
import { toast } from 'sonner'
import { Loader2, Copy, Download } from 'lucide-react'
import type { SocialPost } from '@/lib/prompts/social'

const PLATFORMS = ['Instagram', 'TikTok', 'Facebook', 'LinkedIn', 'Twitter/X', 'YouTube', 'Pinterest']
const TONE_OPTIONS = ['Professional', 'Casual', 'Humorous', 'Bold', 'Luxury', 'Friendly', 'Inspirational', 'Educational', 'Other']

export default function NewSocialContentPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ posts: SocialPost[] } | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    clientName: '',
    businessName: '',
    niche: '',
    platforms: [] as string[],
    targetAudience: '',
    toneOfVoice: '',
    customTone: '',
    numberOfPosts: 30,
    objectives: '',
    extraNotes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    try {
      const tone = formData.toneOfVoice === 'Other' ? formData.customTone : formData.toneOfVoice

      const result = await generateSocialContent({
        clientName: formData.clientName,
        businessName: formData.businessName || undefined,
        niche: formData.niche,
        platforms: formData.platforms,
        targetAudience: formData.targetAudience,
        toneOfVoice: tone,
        numberOfPosts: formData.numberOfPosts,
        objectives: formData.objectives,
        extraNotes: formData.extraNotes || undefined,
      })

      if (result.success && result.data) {
        setResults(result.data)
        setProjectId(result.projectId)
        toast.success('Social content generated successfully!')
      } else {
        toast.error(result.error || 'Failed to generate content')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyAllAsMarkdown = () => {
    if (!results) return
    const markdown = results.posts.map((post, idx) => 
      `## Post ${idx + 1}: ${post.concept}\n\n**Hook:** ${post.hook}\n\n**Caption:**\n${post.caption}\n\n**Hashtags:** ${post.suggested_hashtags.join(' ')}\n\n**CTA:** ${post.call_to_action}\n\n---\n`
    ).join('\n')
    navigator.clipboard.writeText(markdown)
    toast.success('Copied all posts as Markdown!')
  }

  const copyCaptionsOnly = () => {
    if (!results) return
    const captions = results.posts.map((post, idx) => 
      `Post ${idx + 1}:\n${post.caption}\n\n`
    ).join('\n')
    navigator.clipboard.writeText(captions)
    toast.success('Copied all captions!')
  }

  const downloadAsTxt = () => {
    if (!results) return
    const content = results.posts.map((post, idx) => 
      `POST ${idx + 1}: ${post.concept}\n\nHook: ${post.hook}\n\nCaption:\n${post.caption}\n\nHashtags: ${post.suggested_hashtags.join(' ')}\n\nCTA: ${post.call_to_action}\n\n${'='.repeat(50)}\n\n`
    ).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `social-content-${Date.now()}.txt`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded as .txt!')
  }

  const downloadAsJson = () => {
    if (!results) return
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `social-content-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded as .json!')
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New Social Media Content Pack</h1>
        <p className="text-muted-foreground">Generate engaging social media posts for your client</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Brief</CardTitle>
            <CardDescription>Fill in the details to generate content</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="businessName">Business Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="niche">Niche / Industry *</Label>
                <Input
                  id="niche"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Platforms *</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {PLATFORMS.map((platform) => (
                    <label key={platform} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.platforms.includes(platform)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, platforms: [...formData.platforms, platform] })
                          } else {
                            setFormData({ ...formData, platforms: formData.platforms.filter(p => p !== platform) })
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="targetAudience">Target Audience *</Label>
                <Textarea
                  id="targetAudience"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="toneOfVoice">Tone of Voice *</Label>
                <Select
                  value={formData.toneOfVoice}
                  onValueChange={(value) => setFormData({ ...formData, toneOfVoice: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map((tone) => (
                      <SelectItem key={tone} value={tone}>
                        {tone}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {formData.toneOfVoice === 'Other' && (
                  <Input
                    className="mt-2"
                    placeholder="Describe the tone"
                    value={formData.customTone}
                    onChange={(e) => setFormData({ ...formData, customTone: e.target.value })}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="numberOfPosts">Number of Posts</Label>
                <Input
                  id="numberOfPosts"
                  type="number"
                  min={1}
                  max={100}
                  value={formData.numberOfPosts}
                  onChange={(e) => setFormData({ ...formData, numberOfPosts: parseInt(e.target.value) || 30 })}
                />
              </div>

              <div>
                <Label htmlFor="objectives">Objectives *</Label>
                <Textarea
                  id="objectives"
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  required
                  rows={3}
                  placeholder="e.g., brand awareness, sales, bookings, followers"
                />
              </div>

              <div>
                <Label htmlFor="extraNotes">Extra Notes</Label>
                <Textarea
                  id="extraNotes"
                  value={formData.extraNotes}
                  onChange={(e) => setFormData({ ...formData, extraNotes: e.target.value })}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate Content'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Content</CardTitle>
                <CardDescription>{results.posts.length} posts generated</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={copyAllAsMarkdown}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All as Markdown
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyCaptionsOnly}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Captions Only
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadAsTxt}>
                    <Download className="mr-2 h-4 w-4" />
                    Download .txt
                  </Button>
                  <Button variant="outline" size="sm" onClick={downloadAsJson}>
                    <Download className="mr-2 h-4 w-4" />
                    Download .json
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-h-[600px] overflow-y-auto">
                  {results.posts.map((post, idx) => (
                    <Card key={idx} className="border">
                      <CardHeader>
                        <CardTitle className="text-lg">Post {idx + 1}: {post.concept}</CardTitle>
                        {post.post_type && (
                          <span className="text-xs text-muted-foreground">Type: {post.post_type}</span>
                        )}
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Hook:</p>
                          <p className="text-sm">{post.hook}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Caption:</p>
                          <p className="text-sm whitespace-pre-wrap">{post.caption}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Hashtags:</p>
                          <div className="flex flex-wrap gap-1">
                            {post.suggested_hashtags.map((tag, i) => (
                              <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">CTA:</p>
                          <p className="text-sm">{post.call_to_action}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                {projectId && (
                  <div className="mt-4 pt-4 border-t">
                    <Button
                      variant="outline"
                      onClick={() => router.push(`/projects/${projectId}`)}
                      className="w-full"
                    >
                      View Full Project
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

