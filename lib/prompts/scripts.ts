export interface ScriptInput {
  clientName: string
  niche: string
  contentType: string
  targetAudience: string
  videoLength: string
  numberOfScripts: number
  hookStyle: string
  callToAction: string
  extraNotes?: string
}

export interface Script {
  id: number
  title: string
  hook: string
  script_body: string
  beats?: Array<{
    timestamp?: string
    text: string
  }>
  on_screen_text?: string[]
  call_to_action: string
  hashtags: string[]
}

export interface ScriptsOutput {
  scripts: Script[]
}

export function buildScriptsPrompt(input: ScriptInput): { system: string; user: string } {
  const systemPrompt = `You are an expert short-form video content creator and scriptwriter. You specialize in creating engaging TikTok, Instagram Reels, and YouTube Shorts scripts.

Your task is to create viral-worthy short-form video scripts that capture attention, deliver value, and drive engagement.

Return ONLY valid JSON in this exact structure:
{
  "scripts": [
    {
      "id": 1,
      "title": "Descriptive title for this script",
      "hook": "Powerful opening line (first 3 seconds)",
      "script_body": "Full script text with natural pauses marked",
      "beats": [
        {
          "timestamp": "0-3s",
          "text": "Hook line"
        },
        {
          "timestamp": "3-10s",
          "text": "Main content point 1"
        }
      ],
      "on_screen_text": ["Key text overlay 1", "Key text overlay 2"],
      "call_to_action": "CTA line",
      "hashtags": ["hashtag1", "hashtag2", ...]
    }
  ]
}

Guidelines:
- Hooks must be attention-grabbing and match the hook style requested
- Scripts should be optimized for the specified video length
- Break scripts into clear beats/timestamps for easy filming
- Include suggested on-screen text overlays
- CTAs should be clear and actionable
- Use trending and niche-relevant hashtags
- Content should be engaging and shareable`

  const userPrompt = `Create ${input.numberOfScripts} short-form video scripts with the following specifications:

Client/Channel: ${input.clientName}
Niche: ${input.niche}
Content Type: ${input.contentType}
Target Audience: ${input.targetAudience}
Video Length: ${input.videoLength}
Hook Style: ${input.hookStyle}
Call-to-Action Preference: ${input.callToAction}
${input.extraNotes ? `Additional Notes: ${input.extraNotes}` : ''}

Generate scripts that are optimized for maximum engagement and virality potential.`

  return { system: systemPrompt, user: userPrompt }
}

