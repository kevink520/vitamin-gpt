import AWS from 'aws-sdk'
import { v4 as uuidv4 } from 'uuid'
AWS.config.update({ region: 'us-east-1' })
const dynamoDB = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  accessKeyId: process.env.AWS_TRDOCTOR_ACCESS_KEY,
  secretAccessKey: process.env.AWS_TRDOCTOR_SECRET_ACCESS_KEY
})

const dynamoDB2 = new AWS.DynamoDB({
  apiVersion: '2012-08-10',
  accessKeyId: process.env.AWS_VITAMIN_GPT_ACCESS_KEY,
  secretAccessKey: process.env.AWS_VITAMIN_GPT_SECRET_ACCESS_KEY
})

export function getClientIpAddress (req) {
  let ip = req.headers['x-real-ip']
  const forwardedFor = req.headers['x-forwarded-for']
  if (!ip && forwardedFor) {
    ip = forwardedFor?.split(',').at(0) ?? 'Unknown'
  }

  return ip || 'Unknown'
}

export async function getInputEmbedding (input) {
  const res = await fetch({
    method: 'POST',
    url: 'https://api.openai.com/v1/embeddings',
    body: JSON.stringify({
      model: 'text-embedding-ada-002',
      input
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    }
  })

  const data = await res.json()
  const embedding = data.data[0].embedding
  return embedding
}

export async function getPointId (embedding) {
  const res = await fetch({
    method: 'POST',
    url: `${process.env.QDRANT_ENDPOINT_URL}/collections/therooseveltdoctor/points/search`,
    body: JSON.stringify({
      vector: embedding,
      top: 3
    }),
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.QDRANT_API_KEY
    }
  })

  const data = await res.json()
  const pointId = data.result[0].id
  return pointId
}

export async function getPointTextData (pointId) {
  const res = await fetch({
    method: 'GET',
    url: `${process.env.QDRANT_ENDPOINT_URL}/collections/therooseveltdoctor/points/${pointId}`,
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.QDRANT_API_KEY
    }
  })

  const data = await res.json()
  const textData = data.result.payload.text
  return textData
}

export async function saveDataToDynamoDB (messages = [], clientIpAddress = 'Unknown') {
  const qaId = uuidv4()
  const trdoctorChatMessages = []
  for (const message of messages) {
    trdoctorChatMessages.push({
      PutRequest: {
        Item: {
          id: {
            S: uuidv4()
          },
          chatModel: {
            S: 'gpt-4'
          },
          qaId: {
            S: qaId
          },
          messageRole: {
            S: message.role
          },
          messageText: {
            S: message.content
          },
          messageTime: {
            S: new Date().toISOString()
          },
          ipAddress: {
            S: clientIpAddress
          }
        }
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 2))
  }

  const params = { RequestItems: { trdoctorChatMessages } }
  return dynamoDB.batchWriteItem(params).promise()
}

export async function saveDataToVitaminGPTDynamoDB (messages = [], clientIpAddress = 'Unknown') {
  const vitaminGPTChatMessages = []
  for (const message of messages) {
    vitaminGPTChatMessages.push({
      PutRequest: {
        Item: {
          id: {
            S: uuidv4()
          },
          chatModel: {
            S: 'gpt-4'
          },
          messageRole: {
            S: message.role
          },
          messageText: {
            S: message.content
          },
          messageTime: {
            S: new Date().toISOString()
          },
          ipAddress: {
            S: clientIpAddress
          }
        }
      }
    })
    await new Promise((resolve) => setTimeout(resolve, 2))
  }

  const params = { RequestItems: { 'vitamin-gpt': vitaminGPTChatMessages } }
  return dynamoDB2.batchWriteItem(params).promise()
}
