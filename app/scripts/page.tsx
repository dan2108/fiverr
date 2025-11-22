import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Video, Plus } from 'lucide-react'

export default function ScriptsPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">TikTok / Short-Form Scripts</h1>
          <p className="text-muted-foreground">Generate viral-worthy short-form video scripts</p>
        </div>
        <Link href="/scripts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Script Pack
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About TikTok Script Packs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Create engaging short-form video scripts optimized for TikTok, Instagram Reels, and YouTube Shorts.
          </p>
          <div>
            <h3 className="font-semibold mb-2">What you'll get:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Multiple script ideas with viral potential</li>
              <li>Powerful hooks designed to capture attention in the first 3 seconds</li>
              <li>Complete scripts broken into beats/timestamps</li>
              <li>Suggested on-screen text overlays</li>
              <li>Clear call-to-action statements</li>
              <li>Trending and niche-relevant hashtags</li>
            </ul>
          </div>
          <Link href="/scripts/new">
            <Button className="w-full">
              <Video className="mr-2 h-4 w-4" />
              Create Your First Script Pack
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

