// // "use client";
// // import React, { useState } from 'react';
// // import { useParams } from "next/navigation";
// // import { useUser } from '@clerk/nextjs';
// // import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
// // import MeetingSetup from '@/components/MeetingSetup';
// // import MeetingRoom from '@/components/MeetingRoom';
// // import { useGetCallById } from '@/hooks/useGetCallById';

// // const Meeting = () => {
// //     const params = useParams()
// //     const id = typeof params.id === "string" ? params.id : params.id?.[0] ?? "";
// //     console.log(id);
// //     console.log(params.id);
// //     const {isLoaded} = useUser();
// //     const [isSetupComplete,setIsSetupComplete]=useState(false);
   
// //     const { call, isCallLoading } = useGetCallById(id ?? ""); 
// //     if(!id || !isLoaded || isCallLoading) return  null;
// //   return (
// //    <main className='h-screen w-full bg-white'>
// //         <StreamCall call={call}>
// //           <StreamTheme >
// //                        {
// //                         !isSetupComplete ?(
// //                            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
// //                         ):(
// //                           <MeetingRoom />
// //                         )
// //                        }
// //           </StreamTheme>
// //         </StreamCall>
// //    </main>
// //   )
// // }

// // export default Meeting
// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import {
//   useStreamVideoClient,
//   StreamCall,
//   StreamTheme,
// } from '@stream-io/video-react-sdk'
// import type { Call } from '@stream-io/video-react-sdk';

// import MeetingSetup from '@/components/MeetingSetup'
// import MeetingRoom from '@/components/MeetingRoom'


// const MeetingPage = () => {
//   const { id } = useParams()
//   const client = useStreamVideoClient()
//   // const [call, setCall] = useState<any>(null)
//   const [call, setCall] = useState<Call | null>(null);
//   const [isSetupComplete, setIsSetupComplete] = useState(false)

//   useEffect(() => {
//     if (!client || !id) return

//     const initCall = async () => {
//       try {
//         const callInstance = client.call('default', id as string)
//         await callInstance.join() // or getOrCreate()
//         setCall(callInstance)
//       } catch (err) {
//         console.error('❌ Failed to join call:', err)
//       }
//     }

//     initCall()
//   }, [client, id])

//   if (!call) return <div className="h-screen w-full flex items-center justify-center text-white">Loading...</div>

//   return (
//     <main className="h-screen w-full bg-white">
//       <StreamCall call={call}>
//         <StreamTheme>
//           {!isSetupComplete ? (
//             <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
//           ) : (
//             <MeetingRoom />
//           )}
//         </StreamTheme>
//       </StreamCall>
//     </main>
//   )
// }

// export default MeetingPage
'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import {
  useStreamVideoClient,
  StreamCall,
  StreamTheme,
  type Call,
} from '@stream-io/video-react-sdk'

import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'

const MeetingPage = () => {
  const { id } = useParams()
  const client = useStreamVideoClient()
  const [call, setCall] = useState<Call | null>(null)
  const [isSetupComplete, setIsSetupComplete] = useState(false)

  useEffect(() => {
    if (!client || !id) return

    const initCall = async () => {
      try {
        const callInstance = client.call('default', id as string)
        await callInstance.join()
        setCall(callInstance)
      } catch (err) {
        console.error('❌ Failed to join call:', err)
      }
    }

    initCall()
  }, [client, id])

  if (!call)
    return (
      <div className="h-screen w-full flex items-center justify-center text-white">
        Loading...
      </div>
    )

  return (
    <main className="h-screen w-full bg-white">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default MeetingPage
