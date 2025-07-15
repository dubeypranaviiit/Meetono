// // "use client";

// // import { useEffect, useState } from "react";
// // import { useUser } from "@clerk/nextjs";
// // import { StreamClient } from "getstream";
// // import MeetingTypeList from "@/components/MeetingTypeList";

// // type Meeting = {
// //   meeting_title: string;
// //   meeting_time: string;
// //   meeting_date: string;
// // };

// // const Home = () => {
// //   const { user } = useUser();
// //   const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null);

// //   const now = new Date();
// //   const formattedDate = now.toLocaleDateString("en-IN", {
// //     month: "long",
// //     day: "numeric",
// //     year: "numeric",
// //   });

// //   const timeFormatter = new Intl.DateTimeFormat("en-US", {
// //     hour: "2-digit",
// //     minute: "2-digit",
// //     second: "2-digit",
// //     hour12: false,
// //   });

// //   const formattedTime = timeFormatter.format(now);
// //   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// //   const currentDay = days[now.getDay()];

// //   useEffect(() => {
// //     const fetchLatestUpcomingMeeting = async () => {
// //       if (!user) return;

// //       try {
// //         const client = new StreamClient(
// //           process.env.NEXT_PUBLIC_STREAM_API_KEY!,
// //           undefined
// //         );

// //         const feed = client.feed(
// //           "user",
// //           user.id,
// //           "YOUR_FRONTEND_SAFE_USER_TOKEN" 
// //         );

// //         const { results } = await feed.get({ limit: 20 });

// //         const now = new Date();
// //         const futureMeetings = results
// //           .filter((activity: any) => {
// //             const date = activity?.object?.meeting_date;
// //             return date && new Date(date) > now;
// //           })
// //           .sort(
// //             (a: any, b: any) =>
// //               new Date(a.object.meeting_date).getTime() -
// //               new Date(b.object.meeting_date).getTime()
// //           );

// //         if (futureMeetings.length > 0) {
// //           const first = futureMeetings[0].object;
// //           setNextMeeting({
// //             meeting_title: first.meeting_title,
// //             meeting_time: first.meeting_time,
// //             meeting_date: first.meeting_date,
// //           });
// //         } else {
// //           setNextMeeting(null);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch meetings:", err);
// //         setNextMeeting(null);
// //       }
// //     };

// //     fetchLatestUpcomingMeeting();
// //   }, [user]);

// //   return (
// //     <section className="flex min-h-screen w-full flex-col gap-10 text-white overflow-y-auto lg:-ml-[10px]">
// //       <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
// //         <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
// //           <h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal">
// //             {nextMeeting
// //               ? `Upcoming: ${nextMeeting.meeting_title} at ${nextMeeting.meeting_time}`
// //               : " No upcoming meetings found"}
// //           </h2>
// //           <div className="flex flex-col gap-2">
// //             <h1 className="text-2xl font-extrabold lg:text-7xl">{formattedTime}</h1>
// //             <p className="text-xl font-medium text-sky-1 lg:text-2xl">
// //               {currentDay}, {formattedDate}
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <MeetingTypeList />
// //     </section>
// //   );
// // };

// // export default Home;
// "use client";

// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/nextjs";
// import { StreamClient, FeedAPIResponse, StreamFeed } from "getstream";
// import MeetingTypeList from "@/components/MeetingTypeList";
// import type { Meeting } from "@/lib/getUpcomingMeeting";

// const Home = () => {
//   const { user } = useUser();
//   const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null);

//   const now = new Date();
//   const formattedDate = now.toLocaleDateString("en-IN", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });

//   const timeFormatter = new Intl.DateTimeFormat("en-US", {
//     hour: "2-digit",
//     minute: "2-digit",
//     second: "2-digit",
//     hour12: false,
//   });

//   const formattedTime = timeFormatter.format(now);
//   const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//   const currentDay = days[now.getDay()];

//   // useEffect(() => {
//   //   const fetchLatestUpcomingMeeting = async () => {
//   //     if (!user) return;

//   //     try {
//   //       const client = new StreamClient(
//   //         process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//   //         undefined
//   //       );

//   //       const feed = client.feed(
//   //         "user",
//   //         user.id,
//   //         "YOUR_FRONTEND_SAFE_USER_TOKEN"
//   //       );

//   //       const { results } = await feed.get({ limit: 20 });

//   //       const now = new Date();
//   //       const futureMeetings = results
//   //         .filter((activity) => {
//   //           const meeting = activity?.object as Partial<Meeting>;
//   //           return meeting.meeting_date && new Date(meeting.meeting_date) > now;
//   //         })
//   //         .sort(
//   //           (a, b) =>
//   //             new Date((a.object as Partial<Meeting>).meeting_date || '').getTime() -
//   //             new Date((b.object as Partial<Meeting>).meeting_date || '').getTime()
//   //         );

//   //       if (futureMeetings.length > 0) {
//   //         const first = futureMeetings[0].object as Meeting;
//   //         setNextMeeting({
//   //           meeting_title: first.meeting_title,
//   //           meeting_time: first.meeting_time,
//   //           meeting_date: first.meeting_date,
//   //         });
//   //       } else {
//   //         setNextMeeting(null);
//   //       }
//   //     } catch (err) {
//   //       console.error("Failed to fetch meetings:", err);
//   //       setNextMeeting(null);
//   //     }
//   //   };

//   //   fetchLatestUpcomingMeeting();
//   // }, [user]);
// useEffect(() => {
//   const fetchLatestUpcomingMeeting = async () => {
//     if (!user) return;

//     try {
//       const client = new StreamClient(
//         process.env.NEXT_PUBLIC_STREAM_API_KEY!,
//         undefined
//       );

//       const feed = client.feed("user", user.id, "YOUR_FRONTEND_SAFE_USER_TOKEN");

//       const response = await feed.get({ limit: 20 });

//       type StreamActivity = {
//         actor: string;
//         verb: string;
//         object: Meeting;
//         foreign_id: string;
//         time: string;
//         id: string;
//       };

//       const results = response.results as StreamActivity[];

//       const now = new Date();
//       const futureMeetings = results
//         .filter((activity) => {
//           return activity.object?.meeting_date && new Date(activity.object.meeting_date) > now;
//         })
//         .sort((a, b) =>
//           new Date(a.object.meeting_date).getTime() - new Date(b.object.meeting_date).getTime()
//         );

//       if (futureMeetings.length > 0) {
//         const first = futureMeetings[0].object;
//         setNextMeeting({
//           meeting_title: first.meeting_title,
//           meeting_time: first.meeting_time,
//           meeting_date: first.meeting_date,
//         });
//       } else {
//         setNextMeeting(null);
//       }
//     } catch (err) {
//       console.error("Failed to fetch meetings:", err);
//       setNextMeeting(null);
//     }
//   };

//   fetchLatestUpcomingMeeting();
// }, [user]);
//   return (
//     <section className="flex min-h-screen w-full flex-col gap-10 text-white overflow-y-auto lg:-ml-[10px]">
//       <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
//         <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
//           <h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal">
//             {nextMeeting
//               ? `Upcoming: ${nextMeeting.meeting_title} at ${nextMeeting.meeting_time}`
//               : " No upcoming meetings found"}
//           </h2>
//           <div className="flex flex-col gap-2">
//             <h1 className="text-2xl font-extrabold lg:text-7xl">{formattedTime}</h1>
//             <p className="text-xl font-medium text-sky-1 lg:text-2xl">
//               {currentDay}, {formattedDate}
//             </p>
//           </div>
//         </div>
//       </div>

//       <MeetingTypeList />
//     </section>
//   );
// };

// export default Home;
'use client'

import { useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamClient } from 'getstream'
import MeetingTypeList from '@/components/MeetingTypeList'
import type { Meeting } from '@/lib/getUpcomingMeeting'

type StreamActivity = {
  object: Meeting
}

const Home = () => {
  const { user } = useUser()
  const [nextMeeting, setNextMeeting] = useState<Meeting | null>(null)

  const now = new Date()
  const formattedDate = now.toLocaleDateString('en-IN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const timeFormatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  const formattedTime = timeFormatter.format(now)
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = days[now.getDay()]

  useEffect(() => {
    const fetchLatestUpcomingMeeting = async () => {
      if (!user) return

      try {
        const client = new StreamClient(process.env.NEXT_PUBLIC_STREAM_API_KEY!, undefined)
        const feed = client.feed('user', user.id, 'YOUR_FRONTEND_SAFE_USER_TOKEN')
        const { results } = await feed.get({ limit: 20 })

        const activities = results as StreamActivity[]
        const now = new Date()

        const futureMeetings = activities
          .filter((activity) => {
            return activity.object?.meeting_date && new Date(activity.object.meeting_date) > now
          })
          .sort(
            (a, b) =>
              new Date(a.object.meeting_date).getTime() -
              new Date(b.object.meeting_date).getTime()
          )

        if (futureMeetings.length > 0) {
          const first = futureMeetings[0].object
          setNextMeeting({
            meeting_title: first.meeting_title,
            meeting_time: first.meeting_time,
            meeting_date: first.meeting_date,
          })
        } else {
          setNextMeeting(null)
        }
      } catch (err) {
        console.error('Failed to fetch meetings:', err)
        setNextMeeting(null)
      }
    }

    fetchLatestUpcomingMeeting()
  }, [user])

  return (
    <section className="flex min-h-screen w-full flex-col gap-10 text-white overflow-y-auto lg:-ml-[10px]">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[300px] rounded py-2 text-center text-base font-normal">
            {nextMeeting
              ? `Upcoming: ${nextMeeting.meeting_title} at ${nextMeeting.meeting_time}`
              : ' No upcoming meetings found'}
          </h2>
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-extrabold lg:text-7xl">{formattedTime}</h1>
            <p className="text-xl font-medium text-sky-1 lg:text-2xl">
              {currentDay}, {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  )
}

export default Home
