import { StreamClient } from 'getstream'

export type Meeting = {
  meeting_title: string
  meeting_time: string
  meeting_date: string
}

export const getUpcomingMeeting = async (
  userId: string,
  token: string
): Promise<Meeting | null> => {
  try {
    const client = new StreamClient(
      process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      token
    )

    const feed = client.feed('user', userId, token)

    const { results } = await feed.get({ limit: 20 })

    const now = new Date()

    const validMeetings = (results as any[]).filter((activity): activity is { object: Meeting } => {
      return (
        activity &&
        typeof activity === 'object' &&
        'object' in activity &&
        typeof activity.object?.meeting_title === 'string' &&
        typeof activity.object?.meeting_time === 'string' &&
        typeof activity.object?.meeting_date === 'string'
      )
    })

    const futureMeetings = validMeetings
      .filter((activity) => new Date(activity.object.meeting_date) > now)
      .sort(
        (a, b) =>
          new Date(a.object.meeting_date).getTime() -
          new Date(b.object.meeting_date).getTime()
      )

    return futureMeetings.length > 0 ? futureMeetings[0].object : null
  } catch (error) {
    console.error('❌ Error fetching upcoming meeting:', error)
    return null
  }
}
