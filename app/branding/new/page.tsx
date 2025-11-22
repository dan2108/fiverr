'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { generateBranding } from '@/app/actions/generate'
import { toast } from 'sonner'
import { Loader2, Copy, Download } from 'lucide-react'
import type { BrandingOutput } from '@/lib/prompts/branding'

export default function NewBrandingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<BrandingOutput | null>(null)
  const [projectId, setProjectId] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    brandName: '',
    industry: '',
    keywords: '',
    targetAudience: '',
    brandPersonality: '',
    colorPreferences: '',
    avoidColors: '',
    wantNameIdeas: true,
    extraNotes: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setResults(null)

    try {
      const result = await generateBranding({
        brandName: formData.brandName || undefined,
        industry: formData.industry,
        keywords: formData.keywords,
        targetAudience: formData.targetAudience,
        brandPersonality: formData.brandPersonality,
        colorPreferences: formData.colorPreferences || undefined,
        avoidColors: formData.avoidColors || undefined,
        wantNameIdeas: formData.wantNameIdeas,
        extraNotes: formData.extraNotes || undefined,
      })

      if (result.success && result.data) {
        setResults(result.data)
        setProjectId(result.projectId)
        toast.success('Branding kit generated successfully!')
      } else {
        toast.error(result.error || 'Failed to generate branding kit')
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const copyBrandNames = () => {
    if (!results) return
    const names = results.brand_names.join('\n')
    navigator.clipboard.writeText(names)
    toast.success('Brand names copied!')
  }

  const copyFullKit = () => {
    if (!results) return
    const content = `BRAND NAMES:\n${results.brand_names.join('\n')}\n\nTAGLINES:\n${results.taglines.join('\n')}\n\nCOLOR PALETTE:\n${results.color_palette.map(c => `${c.name} (${c.hex}): ${c.description}`).join('\n')}\n\nFONT PAIRING:\nHeading: ${results.font_pairing.heading}\nBody: ${results.font_pairing.body}\n${results.font_pairing.description ? `\n${results.font_pairing.description}` : ''}\n\nTONE OF VOICE:\n${results.tone_of_voice}\n\nMOODBOARD DESCRIPTION:\n${results.moodboard_description}`
    navigator.clipboard.writeText(content)
    toast.success('Full branding kit copied!')
  }

  const downloadAsTxt = () => {
    if (!results) return
    const content = `BRANDING KIT\n${'='.repeat(50)}\n\nBRAND NAMES:\n${results.brand_names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nTAGLINES:\n${results.taglines.map((t, i) => `${i + 1}. ${t}`).join('\n')}\n\nCOLOR PALETTE:\n${results.color_palette.map(c => `\n${c.name} (${c.hex})\n${c.description}`).join('\n')}\n\nFONT PAIRING:\nHeading: ${results.font_pairing.heading}\nBody: ${results.font_pairing.body}\n${results.font_pairing.description ? `\n${results.font_pairing.description}` : ''}\n\nTONE OF VOICE:\n${results.tone_of_voice}\n\nMOODBOARD DESCRIPTION:\n${results.moodboard_description}`
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `branding-kit-${Date.now()}.txt`
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
    a.download = `branding-kit-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded as .json!')
  }

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">New Branding Kit</h1>
        <p className="text-muted-foreground">Generate comprehensive branding assets for your client</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Client Brief</CardTitle>
            <CardDescription>Fill in the details to generate branding kit</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="brandName">Brand/Business Name (Optional)</Label>
                <Input
                  id="brandName"
                  value={formData.brandName}
                  onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                  placeholder="Leave empty to generate name ideas"
                />
              </div>

              <div>
                <Label htmlFor="industry">Industry/Niche *</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="keywords">Keywords (Brand Feel) *</Label>
                <Textarea
                  id="keywords"
                  value={formData.keywords}
                  onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                  required
                  rows={3}
                  placeholder="e.g., modern, trustworthy, innovative, playful"
                />
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
                <Label htmlFor="brandPersonality">Brand Personality *</Label>
                <Textarea
                  id="brandPersonality"
                  value={formData.brandPersonality}
                  onChange={(e) => setFormData({ ...formData, brandPersonality: e.target.value })}
                  required
                  rows={3}
                  placeholder="e.g., serious/fun/minimal/luxury/professional"
                />
              </div>

              <div>
                <Label htmlFor="colorPreferences">Color Preferences</Label>
                <Input
                  id="colorPreferences"
                  value={formData.colorPreferences}
                  onChange={(e) => setFormData({ ...formData, colorPreferences: e.target.value })}
                  placeholder="e.g., blues and greens, warm tones"
                />
              </div>

              <div>
                <Label htmlFor="avoidColors">Avoid Colors</Label>
                <Input
                  id="avoidColors"
                  value={formData.avoidColors}
                  onChange={(e) => setFormData({ ...formData, avoidColors: e.target.value })}
                  placeholder="e.g., red, orange"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="wantNameIdeas"
                  checked={formData.wantNameIdeas}
                  onChange={(e) => setFormData({ ...formData, wantNameIdeas: e.target.checked })}
                  className="rounded"
                />
                <Label htmlFor="wantNameIdeas">Generate brand name ideas</Label>
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
                  'Generate Branding Kit'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div>
          {results && (
            <Card>
              <CardHeader>
                <CardTitle>Generated Branding Kit</CardTitle>
                <CardDescription>Complete branding assets</CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={copyBrandNames}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Brand Names
                  </Button>
                  <Button variant="outline" size="sm" onClick={copyFullKit}>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Full Kit
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
                  {results.brand_names && results.brand_names.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Brand Names</h3>
                      <ul className="space-y-1">
                        {results.brand_names.map((name, idx) => (
                          <li key={idx} className="text-sm">{idx + 1}. {name}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.taglines && results.taglines.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Taglines</h3>
                      <ul className="space-y-1">
                        {results.taglines.map((tagline, idx) => (
                          <li key={idx} className="text-sm">{idx + 1}. {tagline}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {results.color_palette && results.color_palette.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Color Palette</h3>
                      <div className="space-y-3">
                        {results.color_palette.map((color, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div
                              className="w-16 h-16 rounded border"
                              style={{ backgroundColor: color.hex }}
                            />
                            <div className="flex-1">
                              <div className="font-medium text-sm">{color.name}</div>
                              <div className="text-xs text-muted-foreground">{color.hex}</div>
                              <div className="text-sm mt-1">{color.description}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.font_pairing && (
                    <div>
                      <h3 className="font-semibold mb-2">Font Pairing</h3>
                      <div className="text-sm space-y-1">
                        <div><strong>Heading:</strong> {results.font_pairing.heading}</div>
                        <div><strong>Body:</strong> {results.font_pairing.body}</div>
                        {results.font_pairing.description && (
                          <div className="mt-2 text-muted-foreground">{results.font_pairing.description}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {results.tone_of_voice && (
                    <div>
                      <h3 className="font-semibold mb-2">Tone of Voice</h3>
                      <p className="text-sm whitespace-pre-wrap">{results.tone_of_voice}</p>
                    </div>
                  )}

                  {results.moodboard_description && (
                    <div>
                      <h3 className="font-semibold mb-2">Moodboard Description</h3>
                      <p className="text-sm whitespace-pre-wrap">{results.moodboard_description}</p>
                    </div>
                  )}
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

