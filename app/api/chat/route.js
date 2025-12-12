import { streamText } from 'ai'
//import { createOpenAICompatible } from '@ai-sdk/openai-compatible'
//import { openai } from '@ai-sdk/openai'
import { createOpenAI } from '@ai-sdk/openai'
//import requestIp from 'request-ip'
import { getClientIp } from '@/utils/functions'
import { saveDataToVitaminGPTDynamoDB } from '@/utils/functions'

// Enable edge runtime for better streaming performance
//export const runtime = 'edge'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY
const OPENROUTER_URL = 'https://openrouter.ai/api/v1'

const openai = createOpenAI({
  baseURL: OPENROUTER_URL,
  apiKey: OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://vitamin-gpt.vercel.app',
    'X-Title': 'Vitamin GPT'
  }
})

export async function POST (req) {
  try {
    //const clientIpAddress = requestIp.getClientIp(req) || 'Unknown'
    const clientIpAddress = getClientIp(req)
    const { messages } = await req.json()
    const messagesToSave = messages?.slice(-1) ?? []
    await saveDataToVitaminGPTDynamoDB(messagesToSave, clientIpAddress)
    /*const model = createOpenAICompatible({
      baseURL: OPENROUTER_URL,
      //name: 'qwen/qwq-32b:free:online',
      //name: 'google/gemini-2.5-pro-exp-03-25:free:online',
      apiKey: OPENROUTER_API_KEY
    }).chatModel('google/gemini-2.5-pro-exp-03-25:free:online')*/

    const result = streamText({
      model: openai.chat('tngtech/deepseek-r1t2-chimera:free:online'),
      system: 'You are a helpful assistant.',
      messages,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}
