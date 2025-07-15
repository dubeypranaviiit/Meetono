import { NextRequest, NextResponse } from 'next/server'
import stream from 'getstream'

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json()
    const { userId } = body

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid userId' }, { status: 400 })
    }

    const serverClient = stream.connect(
      process.env.STREAM_API_KEY!,
      process.env.STREAM_API_SECRET!,
      process.env.STREAM_APP_ID!
    )

    const token = serverClient.createUserToken(userId)

    return NextResponse.json({ token })
  } catch (error) {
    console.error('Stream token generation failed:', error)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
