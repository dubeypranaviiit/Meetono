import { NextResponse } from 'next/server'
import stream from 'getstream'

export async function GET() {
  try {
    const client = stream.connect(
      process.env.STREAM_API_KEY!,
      process.env.STREAM_API_SECRET!,
      process.env.STREAM_APP_ID!
    )

    const feed = client.feed('user', 'your-user-id')

    const { results } = await feed.get({ limit: 10 })

    const now = new Date()
    const upcoming = results
      .filter((a: any) => a.meeting_date && new Date(a.meeting_date) > now)
      .sort((a: any, b: any) => new Date(a.meeting_date).getTime() - new Date(b.meeting_date).getTime())

    if (upcoming.length === 0) {
      return NextResponse.json(null)
    }

    const first = upcoming[0]

    return NextResponse.json({
      meeting_title: first.meeting_title,
      meeting_time: first.meeting_time,
      meeting_date: first.meeting_date,
    })
  } catch (err) {
    console.error('Stream API error:', err)
    return NextResponse.json({ error: 'Failed to fetch meeting' }, { status: 500 })
  }
}
