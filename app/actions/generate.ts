'use server'

import { callOpenAI } from '@/lib/aiClient'
import { buildSocialContentPrompt, type SocialContentInput } from '@/lib/prompts/social'
import { buildScriptsPrompt, type ScriptInput } from '@/lib/prompts/scripts'
import { buildBrandingPrompt, type BrandingInput } from '@/lib/prompts/branding'
import { createProject } from './projects'

export async function generateSocialContent(input: SocialContentInput) {
  try {
    const { system, user } = buildSocialContentPrompt(input)
    const response = await callOpenAI([
      { role: 'system', content: system },
      { role: 'user', content: user },
    ])

    // Parse JSON response
    const output = JSON.parse(response)

    // Save to database
    const project = await createProject({
      type: 'SOCIAL_CONTENT',
      clientName: input.clientName,
      clientBusinessName: input.businessName,
      niche: input.niche,
      platform: input.platforms.join(', '),
      toneOfVoice: input.toneOfVoice,
      language: 'en',
      brief: input.objectives,
      inputsJson: JSON.stringify(input),
      outputJson: JSON.stringify(output),
    })

    return { success: true, data: output, projectId: project.id }
  } catch (error) {
    console.error('Error generating social content:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate content',
    }
  }
}

export async function generateScripts(input: ScriptInput) {
  try {
    const { system, user } = buildScriptsPrompt(input)
    const response = await callOpenAI([
      { role: 'system', content: system },
      { role: 'user', content: user },
    ])

    const output = JSON.parse(response)

    const project = await createProject({
      type: 'TIKTOK_SCRIPTS',
      clientName: input.clientName,
      niche: input.niche,
      platform: input.contentType,
      toneOfVoice: input.hookStyle,
      language: 'en',
      brief: input.targetAudience,
      inputsJson: JSON.stringify(input),
      outputJson: JSON.stringify(output),
    })

    return { success: true, data: output, projectId: project.id }
  } catch (error) {
    console.error('Error generating scripts:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate scripts',
    }
  }
}

export async function generateBranding(input: BrandingInput) {
  try {
    const { system, user } = buildBrandingPrompt(input)
    const response = await callOpenAI([
      { role: 'system', content: system },
      { role: 'user', content: user },
    ])

    const output = JSON.parse(response)

    const project = await createProject({
      type: 'BRANDING_KIT',
      clientName: input.brandName || 'New Brand',
      niche: input.industry,
      toneOfVoice: input.brandPersonality,
      language: 'en',
      brief: input.keywords,
      inputsJson: JSON.stringify(input),
      outputJson: JSON.stringify(output),
    })

    return { success: true, data: output, projectId: project.id }
  } catch (error) {
    console.error('Error generating branding:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate branding',
    }
  }
}

