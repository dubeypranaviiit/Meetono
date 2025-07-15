import stream from 'getstream'

export type Meeting = {
  meeting_title: string
  meeting_time: string
  meeting_date: string
}

type StreamActivity = {
  object: Meeting
}

// ✅ Type guard to validate activity object at runtime
function isStreamActivity(activity: unknown): activity is StreamActivity {
  return (
    typeof activity === 'object' &&
    activity !== null &&
    'object' in activity &&
    typeof (activity as any).object?.meeting_title === 'string' &&
    typeof (activity as any).object?.meeting_time === 'string' &&
    typeof (activity as any).object?.meeting_date === 'string'
  )
}

export const getUpcomingMeeting = async (
  userId: string
): Promise<Meeting | null> => {
  const client = stream.connect(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!,
    process.env.STREAM_APP_ID!
  )

  const feed = client.feed('user', userId)

  const { results } = await feed.get()

  const activities = (results as unknown[]).filter(isStreamActivity)

  const now = new Date()

  const futureMeetings = activities
    .filter((activity) => {
      const date = activity.object?.meeting_date
      return date && new Date(date) > now
    })
    .sort(
      (a, b) =>
        new Date(a.object.meeting_date).getTime() -
        new Date(b.object.meeting_date).getTime()
    )

  return futureMeetings.length > 0 ? futureMeetings[0].object : null
}
