import { DefaultGenerics, FlatActivity } from 'getstream'

export type Meeting = {
  meeting_title: string
  meeting_time: string
  meeting_date: string
}

interface StreamCustomGenerics extends DefaultGenerics {
  objectType: 'meeting'
  activityType: 'meeting_activity'
  object: Meeting
}
