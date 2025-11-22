'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { duplicateProject } from '@/app/actions/projects'
import { toast } from 'sonner'
import { RefreshCw } from 'lucide-react'

export function DuplicateProjectButton({ projectId }: { projectId: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleDuplicate = async () => {
    setLoading(true)
    try {
      const newProject = await duplicateProject(projectId)
      toast.success('Project duplicated!')
      router.push(`/projects/${newProject.id}`)
    } catch (error) {
      toast.error('Failed to duplicate project')
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      onClick={handleDuplicate}
      disabled={loading}
      className="w-full"
    >
      <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
      Duplicate & Regenerate
    </Button>
  )
}

