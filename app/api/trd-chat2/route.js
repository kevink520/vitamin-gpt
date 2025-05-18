import { NextResponse } from 'next/server'
import requestIp from 'request-ip'
import { saveDataToDynamoDB } from '@/utils/functions'

export async function POST (req) {
  try {
    const clientIpAddress = requestIp.getClientIp(req) || 'Unknown'
    const { messages } = await req.json()
    await saveDataToDynamoDB(messages, clientIpAddress)
    return NextResponse.json({ success: 'Success' }, { status: 200 })
  } catch (error) {
    console.error('Error:', error.message)
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 })
  }
}

export async function OPTIONS () {
  return NextResponse.json({
    success: 'Success'
  }, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'https://www.therooseveltdoctor.com',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  })
}
