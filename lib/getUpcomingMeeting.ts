import stream from 'getstream'

export type Meeting = {
  meeting_title: string
  meeting_time: string
  meeting_date: string
}

export const getUpcomingMeeting = async (userId: string): Promise<Meeting | null> => {
  const client = stream.connect(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!,
    process.env.STREAM_APP_ID!
  )

  const feed = client.feed('user', userId)

  const { results } = await feed.get({ limit: 15 }) // adjust if needed

  const now = new Date()

  const futureMeetings = results
    .filter((activity: any) => activity.meeting_date && new Date(activity.meeting_date) > now)
    .sort((a: any, b: any) =>
      new Date(a.meeting_date).getTime() - new Date(b.meeting_date).getTime()
    )

  if (futureMeetings.length === 0) return null

  const first = futureMeetings[0]

  return {
    meeting_title: first.meeting_title,
    meeting_time: first.meeting_time,
    meeting_date: first.meeting_date,
  }
}
