'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { generateScripts } from '@/app/actions/generate'
import { toast } from 'sonner'
import { Loader2, Copy, Download } from 'lucide-react'
import type { Script } from '@/lib/prompts/scripts'

const CONTENT_TYPES = ['Informational', 'Storytime', 'Skits', 'Reviews', 'Motivational', 'Faceless', 'Tutorial', 'Trending', 'Other']
const HOOK_STYLES = ['Curiosity', 'Shock', 'Relatable Struggle', 'Question', 'Controversial', 'Story Hook', 'Stat/Fact', 'Other']
const VIDEO_LENGTHS = ['15s', '30s', '60s', '90s', '2-3 minutes']
const CTA_OPTIONS = ['Follow', 'Comment', 'Bio Link', 'Booking', 'Save/Share', 'Visit Website', 'DM', 'Other']

export default function NewScriptsPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<{ scripts: Script[] } | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    clientName: '',
    niche: '',
    contentType: '',
    targetAudience: '',
    videoLength: '30s',
    numberOfScripts: 10,
    hookStyle: '',
    callToAction: '',
    extraNotes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    try {
      const result = await generateScripts(formData)

      if (result.success && result.data) {
        setResults(result.data)
        setProjectId(result.projectId)
        toast.success('Scripts generated successfully!')
      } else {
        toast.error(result.error || 'Failed to generate scripts')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyAllScripts = () => {
    if (!results) return
    const content = results.scripts.map((script, idx) => 
      `SCRIPT ${idx + 1}: ${script.title}\n\nHook: ${script.hook}\n\nScript:\n${script.script_body}\n\nOn-Screen Text:\n${script.on_screen_text?.join('\n') || 'N/A'}\n\nCTA: ${script.call_to_action}\n\nHashtags: ${script.hashtags.join(' ')}\n\n${'='.repeat(50)}\n\n`
    ).join('\n')
    navigator.clipboard.writeText(content)
    toast.success('Copied all scripts!')
  }

  const copyScript = (script: Script) => {
    const content = `Hook: ${script.hook}\n\nScript:\n${script.script_body}\n\nOn-Screen Text:\n${script.on_screen_text?.join('\n') || 'N/A'}\n\nCTA: ${script.call_to_action}\n\nHashtags: ${script.hashtags.join(' ')}`
    navigator.clipboard.writeText(content)
    toast.success('Script copied!')
  }

  const downloadAsTxt = () => {
    if (!results) return
    const content = results.scripts.map((script, idx) => 
      `SCRIPT ${idx + 1}: ${script.title}\n\nHook: ${script.hook}\n\nScript:\n${script.script_body}\n\nOn-Screen Text:\n${script.on_screen_text?.join('\n') || 'N/A'}\n\nCTA: ${script.call_to_action}\n\nHashtags: ${script.hashtags.join(' ')}\n\n${'='.repeat(50)}\n\n`
    ).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `tiktok-scripts-${Date.now()}.txt`
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
    a.download = `tiktok-scripts-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded as .json!')
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New TikTok / Short-Form Script Pack</h1>
        <p className="text-muted-foreground">Generate engaging short-form video scripts</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Brief</CardTitle>
            <CardDescription>Fill in the details to generate scripts</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="clientName">Client/Channel Name *</Label>
                <Input
                  id="clientName"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="niche">Niche *</Label>
                <Input
                  id="niche"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="contentType">Type of Content *</Label>
                <Select
                  value={formData.contentType}
                  onValueChange={(value) => setFormData({ ...formData, contentType: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select content type" />
                  </SelectTrigger>
                  <SelectContent>
                    {CONTENT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Label htmlFor="videoLength">Length of Videos *</Label>
                <Select
                  value={formData.videoLength}
                  onValueChange={(value) => setFormData({ ...formData, videoLength: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {VIDEO_LENGTHS.map((length) => (
                      <SelectItem key={length} value={length}>
                        {length}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="numberOfScripts">Number of Scripts</Label>
                <Input
                  id="numberOfScripts"
                  type="number"
                  min={1}
                  max={50}
                  value={formData.numberOfScripts}
                  onChange={(e) => setFormData({ ...formData, numberOfScripts: parseInt(e.target.value) || 10 })}
                />
              </div>

              <div>
                <Label htmlFor="hookStyle">Hook Style *</Label>
                <Select
                  value={formData.hookStyle}
                  onValueChange={(value) => setFormData({ ...formData, hookStyle: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hook style" />
                  </SelectTrigger>
                  <SelectContent>
                    {HOOK_STYLES.map((style) => (
                      <SelectItem key={style} value={style}>
                        {style}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="callToAction">Call-to-Action Preference *</Label>
                <Select
                  value={formData.callToAction}
                  onValueChange={(value) => setFormData({ ...formData, callToAction: value })}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select CTA" />
                  </SelectTrigger>
                  <SelectContent>
                    {CTA_OPTIONS.map((cta) => (
                      <SelectItem key={cta} value={cta}>
                        {cta}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                  'Generate Scripts'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Scripts</CardTitle>
                <CardDescription>{results.scripts.length} scripts generated</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={copyAllScripts}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy All Scripts
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
                <Accordion type="single" collapsible className="w-full">
                  {results.scripts.map((script, idx) => (
                    <AccordionItem key={idx} value={`script-${idx}`}>
                      <AccordionTrigger>
                        <div className="text-left">
                          <div className="font-medium">Script {idx + 1}: {script.title}</div>
                          <div className="text-sm text-muted-foreground">{script.hook}</div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Hook:</p>
                            <p className="text-sm font-semibold">{script.hook}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Script:</p>
                            <p className="text-sm whitespace-pre-wrap">{script.script_body}</p>
                          </div>
                          {script.beats && script.beats.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">Beats:</p>
                              <div className="space-y-1">
                                {script.beats.map((beat, i) => (
                                  <div key={i} className="text-sm">
                                    {beat.timestamp && <span className="font-medium">{beat.timestamp}: </span>}
                                    {beat.text}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                          {script.on_screen_text && script.on_screen_text.length > 0 && (
                            <div>
                              <p className="text-sm font-medium text-muted-foreground">On-Screen Text:</p>
                              <ul className="list-disc list-inside text-sm space-y-1">
                                {script.on_screen_text.map((text, i) => (
                                  <li key={i}>{text}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">CTA:</p>
                            <p className="text-sm">{script.call_to_action}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Hashtags:</p>
                            <div className="flex flex-wrap gap-1">
                              {script.hashtags.map((tag, i) => (
                                <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyScript(script)}
                            className="w-full"
                          >
                            <Copy className="mr-2 h-4 w-4" />
                            Copy This Script
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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

