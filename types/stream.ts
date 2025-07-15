import type { DefaultGenerics } from 'getstream'

export type MyActivity = {
  actor: string,
  verb: string,
  object: string,
  meeting_title: string,
  meeting_time: string,
  meeting_date: string,
}

export type MyCustomGenerics = DefaultGenerics & {
  activity: MyActivity
}
