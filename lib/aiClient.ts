interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

interface ChatCompletionResponse {
  choices: Array<{
    message: {
      content: string
    }
  }>
}

export async function callOpenAI(
  messages: ChatMessage[],
  options?: {
    model?: string
    temperature?: number
    maxTokens?: number
  }
): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY is not set in environment variables')
  }

  const model = options?.model || process.env.OPENAI_MODEL || 'gpt-4o-mini'
  const apiUrl = process.env.OPENAI_API_URL || 'https://api.openai.com/v1/chat/completions'

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: options?.temperature ?? 0.7,
      max_tokens: options?.maxTokens ?? 2000,
      response_format: { type: 'json_object' },
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`OpenAI API error: ${response.status} ${error}`)
  }

  const data: ChatCompletionResponse = await response.json()
  return data.choices[0]?.message?.content || ''
}

