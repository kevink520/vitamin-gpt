/*import { NextResponse } from 'next/server'
import {
  Configuration,
  OpenAIApi
} from 'openai-edge'
import {
  OpenAIStream,
  StreamingTextResponse
} from 'ai'
import requestIp from 'request-ip'
import {
  getInputEmbedding,
  getPointId,
  getPointTextData,
  saveDataToDynamoDB
} from '@/utils/functions'

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(config)

export async function POST (req) {
  try {
    const clientIpAddress = requestIp.getClientIp(req) || 'Unknown'
    const { messages } = await req.json()
    const messagesToSave = messages?.slice(1) ?? []
    const input = messages[messages.length - 1].content
    const textDataPromise = new Promise(async (resolve) => {
      const embedding = await getInputEmbedding(input)
      const pointId = await getPointId(embedding)
      const textData = await getPointTextData(pointId)
      resolve(textData)
    })
    const promise2 = saveDataToDynamoDB(messagesToSave, clientIpAddress)
    const [textData] = await Promise.all([textDataPromise, promise2])
    messages.unshift({
      role: 'system',
      content: `You're a helpful AI assistant to Dr. Jack Resnick's medical office. Only answer if you're 100% certain. Otherwise, reply "Sorry, I'm not sure what the answer is." ${textData}`
    })

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      stream: true,
      messages
    })

    const stream = new OpenAIStream(response)
    return new StreamingTextResponse(stream)
  } catch (error) {
    console.error('Error:', error.message)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}
*/