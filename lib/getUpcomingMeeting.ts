import stream from 'getstream'

export type Meeting = {
  meeting_title: string
  meeting_time: string
  meeting_date: string
}

type StreamActivity = {
  object: Meeting
}

export const getUpcomingMeeting = async (userId: string): Promise<Meeting | null> => {
  const client = stream.connect(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!,
    process.env.STREAM_APP_ID!
  )

  const feed = client.feed('user', userId)

  const { results } = await feed.get()

  const activities = results as StreamActivity[]
  const now = new Date()

  const futureMeetings = activities
    .filter((activity) => {
      const date = activity.object?.meeting_date
      return date && new Date(date) > now
    })
    .sort((a, b) =>
      new Date(a.object.meeting_date).getTime() - new Date(b.object.meeting_date).getTime()
    )

  if (futureMeetings.length > 0) {
    return futureMeetings[0].object
  }

  return null
}
