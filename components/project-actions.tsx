'use client'

import { Button } from '@/components/ui/button'
import { Copy, Download } from 'lucide-react'
import { toast } from 'sonner'

export function ProjectActions({ output }: { output: any }) {
  const copyOutput = () => {
    if (!output) return
    navigator.clipboard.writeText(JSON.stringify(output, null, 2))
    toast.success('Output copied to clipboard!')
  }

  const downloadAsJson = () => {
    if (!output) return
    const blob = new Blob([JSON.stringify(output, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `project-output-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
    toast.success('Downloaded as JSON!')
  }

  if (!output) return null

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={copyOutput}>
        <Copy className="mr-2 h-4 w-4" />
        Copy Output
      </Button>
      <Button variant="outline" onClick={downloadAsJson}>
        <Download className="mr-2 h-4 w-4" />
        Download JSON
      </Button>
    </div>
  )
}

