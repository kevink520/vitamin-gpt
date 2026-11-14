import { streamText, createDataStreamResponse } from 'ai'
import { after } from 'next/server'
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
const MODEL = 'anthropic/claude-opus-5.5:online'

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
    const { id: chatId, messages } = await req.json()
    const messagesToSave = messages?.slice(-1) ?? []
    const saveOptions = { chatId, chatModel: MODEL }
    await saveDataToVitaminGPTDynamoDB(messagesToSave, clientIpAddress, saveOptions)
      .catch((error) => console.error('Error saving user message:', error))
    /*const model = createOpenAICompatible({
      baseURL: OPENROUTER_URL,
      //name: 'qwen/qwq-32b:free:online',
      //name: 'google/gemini-2.5-pro-exp-03-25:free:online',
      apiKey: OPENROUTER_API_KEY
    }).chatModel('google/gemini-2.5-pro-exp-03-25:free:online')*/

    let resolveSaved
    const assistantSaved = new Promise((resolve) => { resolveSaved = resolve })

    const result = streamText({
      //model: openai.chat('tngtech/deepseek-r1t2-chimera:free:online'),
      //model: openai.chat('z-ai/glm-5.3:online'),
      model: openai.chat(MODEL, { reasoningEffort: 'high' }),
      system: 'You are a helpful assistant.',
      messages,
      onFinish: async ({ text }) => {
        try {
          if (!text) {
            console.warn('Assistant response was empty; nothing saved', { chatId })
            return
          }
          console.log('Saving assistant message', { chatId, length: text.length })
          const saved = await saveDataToVitaminGPTDynamoDB([{ role: 'assistant', content: text }], clientIpAddress, saveOptions)
          if (saved) console.log('Saved assistant message', { chatId })
        } catch (error) {
          console.error('Error saving assistant message:', error)
        } finally {
          resolveSaved()
        }
      },
      onError: ({ error }) => {
        console.error('Stream error:', error)
        resolveSaved()
      }
    })

    // Keep generating even if the client disconnects
    result.consumeStream()
    // Backup: keep the function alive if the client disconnects mid-stream
    after(() => assistantSaved)

    // Hold the response open until the assistant message is saved, so the
    // function can't be frozen between the last chunk and the DynamoDB write
    return createDataStreamResponse({
      execute: async (dataStream) => {
        result.mergeIntoDataStream(dataStream)
        await assistantSaved
      },
      onError: (error) => {
        console.error('Data stream error:', error)
        return 'An error occurred.'
      }
    })
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
