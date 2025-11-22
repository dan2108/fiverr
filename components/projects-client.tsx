'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function ProjectsClient({ initialProjects }: { initialProjects: any[] }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [filters, setFilters] = useState({
    type: '',
    search: '',
  })

  useEffect(() => {
    setFilters({
      type: searchParams.get('type') || '',
      search: searchParams.get('search') || '',
    })
  }, [searchParams])

  const updateFilters = (newFilters: typeof filters) => {
    setFilters(newFilters)
    const params = new URLSearchParams()
    if (newFilters.type) params.set('type', newFilters.type)
    if (newFilters.search) params.set('search', newFilters.search)
    router.push(`/projects?${params.toString()}`)
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium mb-2 block">Type</label>
            <Select
              value={filters.type}
              onValueChange={(value) => updateFilters({ ...filters, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="All types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All types</SelectItem>
                <SelectItem value="SOCIAL_CONTENT">Social Content</SelectItem>
                <SelectItem value="TIKTOK_SCRIPTS">TikTok Scripts</SelectItem>
                <SelectItem value="BRANDING_KIT">Branding Kit</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Search</label>
            <Input
              placeholder="Search by client name or niche..."
              value={filters.search}
              onChange={(e) => updateFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

