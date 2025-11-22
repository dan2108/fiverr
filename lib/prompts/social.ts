export interface SocialContentInput {
  clientName: string
  businessName?: string
  niche: string
  platforms: string[]
  targetAudience: string
  toneOfVoice: string
  numberOfPosts: number
  objectives: string
  extraNotes?: string
}

export interface SocialPost {
  id: number
  concept: string
  caption: string
  hook: string
  suggested_hashtags: string[]
  call_to_action: string
  post_type?: string
}

export interface SocialContentOutput {
  posts: SocialPost[]
}

export function buildSocialContentPrompt(input: SocialContentInput): { system: string; user: string } {
  const systemPrompt = `You are an expert social media strategist and content creator. You generate structured JSON content plans for social media platforms.

Your task is to create engaging, platform-optimized social media posts that align with the client's brand, target audience, and objectives.

Return ONLY valid JSON in this exact structure:
{
  "posts": [
    {
      "id": 1,
      "concept": "Brief concept/title for this post",
      "caption": "Full caption text optimized for the platform(s)",
      "hook": "Attention-grabbing opening line",
      "suggested_hashtags": ["hashtag1", "hashtag2", ...],
      "call_to_action": "Clear CTA text",
      "post_type": "carousel/reel/story/single-image/video"
    }
  ]
}

Guidelines:
- Each post should be unique and valuable
- Captions should be engaging and match the tone of voice
- Include relevant hashtags (mix of popular and niche)
- CTAs should align with the objectives
- Vary post types for visual interest
- Ensure content is appropriate for the specified platforms`

  const userPrompt = `Create ${input.numberOfPosts} social media posts with the following specifications:

Client: ${input.clientName}
${input.businessName ? `Business: ${input.businessName}` : ''}
Niche/Industry: ${input.niche}
Platforms: ${input.platforms.join(', ')}
Target Audience: ${input.targetAudience}
Tone of Voice: ${input.toneOfVoice}
Objectives: ${input.objectives}
${input.extraNotes ? `Additional Notes: ${input.extraNotes}` : ''}

Generate diverse, engaging content that will resonate with the target audience and achieve the stated objectives.`

  return { system: systemPrompt, user: userPrompt }
}

