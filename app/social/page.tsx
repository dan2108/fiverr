import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Plus } from 'lucide-react'

export default function SocialContentPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Social Media Content</h1>
          <p className="text-muted-foreground">Generate social media content packs for your clients</p>
        </div>
        <Link href="/social/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Content Pack
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Social Media Content Packs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Create comprehensive social media content packs tailored to your client's brand, audience, and objectives.
          </p>
          <div>
            <h3 className="font-semibold mb-2">What you'll get:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Multiple post ideas with unique concepts</li>
              <li>Engaging captions optimized for each platform</li>
              <li>Attention-grabbing hooks</li>
              <li>Relevant hashtag suggestions</li>
              <li>Clear call-to-action statements</li>
              <li>Post type recommendations (carousel, reel, story, etc.)</li>
            </ul>
          </div>
          <Link href="/social/new">
            <Button className="w-full">
              <FileText className="mr-2 h-4 w-4" />
              Create Your First Social Content Pack
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

