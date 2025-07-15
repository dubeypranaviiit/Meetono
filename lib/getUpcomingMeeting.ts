import stream from 'getstream';

export type Meeting = {
  meeting_title: string;
  meeting_time: string;
  meeting_date: string;
};

export const getUpcomingMeeting = async (userId: string): Promise<Meeting | null> => {
  const client = stream.connect(
    process.env.STREAM_API_KEY!,
    process.env.STREAM_API_SECRET!,
    process.env.STREAM_APP_ID!
  );

  const feed = client.feed('user', userId);

  const { results } = await feed.get({ limit: 15 });

  const now = new Date();

  const futureMeetings = results
    .filter((activity) => {
      const meeting = activity?.object as Partial<Meeting>;
      return meeting.meeting_date && new Date(meeting.meeting_date) > now;
    })
    .sort((a, b) => {
      const aDate = new Date((a?.object as Partial<Meeting>).meeting_date || '');
      const bDate = new Date((b?.object as Partial<Meeting>).meeting_date || '');
      return aDate.getTime() - bDate.getTime();
    });

  if (futureMeetings.length === 0) return null;

  const first = futureMeetings[0].object as Meeting;

  return {
    meeting_title: first.meeting_title,
    meeting_time: first.meeting_time,
    meeting_date: first.meeting_date,
  };
};
