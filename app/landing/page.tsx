import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Video, Palette, Sparkles, Zap, TrendingUp, Users } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Content Studio</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              AI Fiverr Studio
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Generate professional social media content, TikTok scripts, and branding kits in minutes. 
              Deliver high-quality Fiverr services faster than ever.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/social/new">
                <Button size="lg" className="text-lg px-8">
                  <Zap className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link href="/portfolio">
                <Button size="lg" variant="outline" className="text-lg px-8">
                  View Portfolio
                </Button>
              </Link>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Social Media Content</CardTitle>
                <CardDescription>
                  Generate engaging posts with captions, hashtags, and CTAs for Instagram, TikTok, Facebook, and more.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
                  <Video className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle>TikTok Scripts</CardTitle>
                <CardDescription>
                  Create viral-worthy short-form video scripts with hooks, beats, and on-screen text suggestions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-pink-500/10 flex items-center justify-center mb-4">
                  <Palette className="h-6 w-6 text-pink-600" />
                </div>
                <CardTitle>Branding Kits</CardTitle>
                <CardDescription>
                  Design complete branding packages with names, taglines, color palettes, and moodboards.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-muted/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose AI Fiverr Studio?</h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to deliver professional Fiverr services at scale
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-muted-foreground">
                Generate complete content packs in seconds, not hours. Deliver orders faster and take on more clients.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
              <p className="text-muted-foreground">
                AI-powered content that matches your client's brand voice and objectives. Export-ready deliverables.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Organized & Tracked</h3>
              <p className="text-muted-foreground">
                Save all projects, track your work, and showcase your portfolio. Never lose a project again.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Fiverr Business?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Start generating professional content today and deliver exceptional results to your clients.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/social/new">
                  <Button size="lg" className="text-lg px-8">
                    <FileText className="mr-2 h-5 w-5" />
                    Create Social Content
                  </Button>
                </Link>
                <Link href="/scripts/new">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Video className="mr-2 h-5 w-5" />
                    Create Scripts
                  </Button>
                </Link>
                <Link href="/branding/new">
                  <Button size="lg" variant="outline" className="text-lg px-8">
                    <Palette className="mr-2 h-5 w-5" />
                    Create Branding Kit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}

