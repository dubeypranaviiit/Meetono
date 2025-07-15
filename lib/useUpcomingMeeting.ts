'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamClient } from 'getstream'
import type { Meeting } from './getUpcominMeeting'
import { getStreamToken } from '@/lib/getStreamToken'

// Define the type for activity from Stream
type StreamActivity = {
  object: Meeting
}

// Type guard to validate activity shape
function isStreamActivity(activity: unknown): activity is StreamActivity {
  if (typeof activity === 'object' && activity !== null && 'object' in activity) {
    const act = activity as { object?: Record<string, unknown> }
    const obj = act.object

    return (
      typeof obj?.meeting_title === 'string' &&
      typeof obj?.meeting_time === 'string' &&
      typeof obj?.meeting_date === 'string'
    )
  }
  return false
}

// ✅ Custom hook to fetch the next upcoming meeting
export function useUpcomingMeeting() {
  const { user } = useUser()
  const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeeting = async () => {
      setLoading(true)

      if (!user?.id) {
        setLoading(false)
        return
      }

      try {
        const token = await getStreamToken(user.id)
        if (!token) throw new Error('Stream token not found')

        const client = new StreamClient(
          process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          token
        )

        const feed = client.feed('user', user.id, token)
        const response = await feed.get({ limit: 20 })

        const activities = (response.results ?? []).filter(isStreamActivity) as StreamActivity[]
        const now = new Date()

        const futureMeetings = activities
          .filter((activity) => new Date(activity.object.meeting_date) > now)
          .sort(
            (a, b) =>
              new Date(a.object.meeting_date).getTime() -
              new Date(b.object.meeting_date).getTime()
          )

        setNextMeeting(futureMeetings.length > 0 ? futureMeetings[0].object : null)
      } catch (err) {
        console.error('Failed to fetch meetings:', err)
        setNextMeeting(null)
      } finally {
        setLoading(false)
      }
    }

    fetchMeeting()
  }, [user?.id])

  return { nextMeeting, loading }
}
