export interface BrandingInput {
  brandName?: string
  industry: string
  keywords: string
  targetAudience: string
  brandPersonality: string
  colorPreferences?: string
  avoidColors?: string
  wantNameIdeas: boolean
  extraNotes?: string
}

export interface Color {
  hex: string
  name: string
  description: string
}

export interface FontPairing {
  heading: string
  body: string
  description?: string
}

export interface BrandingOutput {
  brand_names: string[]
  taglines: string[]
  color_palette: Color[]
  font_pairing: FontPairing
  tone_of_voice: string
  moodboard_description: string
}

export function buildBrandingPrompt(input: BrandingInput): { system: string; user: string } {
  const systemPrompt = `You are an expert brand strategist and designer. You create comprehensive branding kits including names, taglines, color palettes, typography, and brand guidelines.

Your task is to generate a cohesive, professional branding kit that aligns with the client's industry, target audience, and brand personality.

Return ONLY valid JSON in this exact structure:
{
  "brand_names": ["Name 1", "Name 2", ...],
  "taglines": ["Tagline 1", "Tagline 2", ...],
  "color_palette": [
    {
      "hex": "#FFFFFF",
      "name": "Color Name",
      "description": "When and how to use this color"
    }
  ],
  "font_pairing": {
    "heading": "Font name for headings",
    "body": "Font name for body text",
    "description": "Why these fonts work together"
  },
  "tone_of_voice": "Detailed description of the brand's tone of voice and communication style",
  "moodboard_description": "Detailed text description of visual mood, imagery style, textures, and design elements that would appear in a moodboard"
}

Guidelines:
- Brand names should be memorable, available-sounding, and relevant
- Taglines should be catchy and communicate brand value
- Color palette should include 4-6 colors with clear purposes
- Font pairing should complement the brand personality
- Tone of voice should be specific and actionable
- Moodboard description should be detailed enough for a designer to create visuals`

  const userPrompt = `Create a comprehensive branding kit with the following specifications:

${input.brandName ? `Existing Brand Name: ${input.brandName}` : 'No existing brand name - generate name ideas'}
Industry/Niche: ${input.industry}
Keywords/Brand Feel: ${input.keywords}
Target Audience: ${input.targetAudience}
Brand Personality: ${input.brandPersonality}
${input.colorPreferences ? `Color Preferences: ${input.colorPreferences}` : ''}
${input.avoidColors ? `Avoid Colors: ${input.avoidColors}` : ''}
${input.wantNameIdeas ? 'Generate 8-10 brand name ideas' : 'Skip brand name ideas'}
${input.extraNotes ? `Additional Notes: ${input.extraNotes}` : ''}

Generate a cohesive, professional branding kit that will resonate with the target audience and reflect the brand personality.`

  return { system: systemPrompt, user: userPrompt }
}

