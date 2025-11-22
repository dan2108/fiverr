'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Save, Eye, EyeOff } from 'lucide-react'

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState('')
  const [showApiKey, setShowApiKey] = useState(false)
  const [autoSave, setAutoSave] = useState(true)

  useEffect(() => {
    // Load settings from localStorage
    const savedApiKey = localStorage.getItem('openai_api_key')
    const savedAutoSave = localStorage.getItem('auto_save_outputs')
    if (savedApiKey) {
      setApiKey(savedApiKey)
    }
    if (savedAutoSave !== null) {
      setAutoSave(savedAutoSave === 'true')
    }
  }, [])

  const handleSave = () => {
    if (apiKey) {
      localStorage.setItem('openai_api_key', apiKey)
      toast.success('Settings saved! (Note: API key is stored locally only)')
    } else {
      toast.error('Please enter an API key')
    }
    localStorage.setItem('auto_save_outputs', autoSave.toString())
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your application settings</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>OpenAI API Configuration</CardTitle>
            <CardDescription>
              Your API key is stored locally in your browser. For production, set OPENAI_API_KEY in your environment variables.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Key</Label>
              <div className="flex gap-2 mt-2">
                <div className="relative flex-1">
                  <Input
                    id="apiKey"
                    type={showApiKey ? 'text' : 'password'}
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="sk-..."
                  />
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Note: The app primarily uses OPENAI_API_KEY from environment variables. This local storage option is for testing only.
              </p>
            </div>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="autoSave">Auto-save AI Outputs</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically save generated outputs to the database
                </p>
              </div>
              <input
                type="checkbox"
                id="autoSave"
                checked={autoSave}
                onChange={(e) => setAutoSave(e.target.checked)}
                className="rounded"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Help & About</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Getting Started</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                <li>Set your OPENAI_API_KEY in the .env file or environment variables</li>
                <li>Navigate to any generator page (Social Content, TikTok Scripts, or Branding Kit)</li>
                <li>Fill in the client brief form</li>
                <li>Click generate and wait for AI to create your content</li>
                <li>Export or copy the results as needed</li>
              </ol>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Generate social media content packs with captions, hashtags, and CTAs</li>
                <li>Create TikTok and short-form video scripts with hooks and beats</li>
                <li>Design comprehensive branding kits with names, colors, fonts, and moodboards</li>
                <li>Save and manage all your projects in one place</li>
                <li>Export content in multiple formats (Markdown, TXT, JSON)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Tips</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                <li>Be specific in your briefs for better results</li>
                <li>Use the duplicate feature to regenerate content with variations</li>
                <li>All projects are saved automatically to your database</li>
                <li>You can filter and search projects from the Projects page</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

