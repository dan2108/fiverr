import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Palette, Plus } from 'lucide-react'

export default function BrandingPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Branding Kits</h1>
          <p className="text-muted-foreground">Generate comprehensive branding assets for your clients</p>
        </div>
        <Link href="/branding/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Branding Kit
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About Branding Kits</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Create complete branding packages including names, taglines, color palettes, typography, and visual guidelines.
          </p>
          <div>
            <h3 className="font-semibold mb-2">What you'll get:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Multiple brand name ideas (if requested)</li>
              <li>Catchy tagline and slogan options</li>
              <li>Professional color palette with hex codes and usage guidelines</li>
              <li>Font pairing recommendations for headings and body text</li>
              <li>Detailed tone of voice guidelines</li>
              <li>Comprehensive moodboard description for visual design</li>
            </ul>
          </div>
          <Link href="/branding/new">
            <Button className="w-full">
              <Palette className="mr-2 h-4 w-4" />
              Create Your First Branding Kit
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

