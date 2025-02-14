"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
  'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
>(undefined);
const router = useRouter();

  return (
   <section className='grid  grid-cols-1 gap-5 mg:grid-cols-2 xl:grid-cols-4 w-full'>
          <HomeCard 
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start  an instant  meeting"
           handleClick={()=>setMeetingState('isJoiningMeeting')}   
           className="bg-orange-600"       
          />
            <HomeCard 
          img="/icons/schedule.svg"
          title="Schedule Meeting"
          description="Plan your meeting"
           handleClick={() => setMeetingState('isScheduleMeeting' )}
         className="bg-blue-1"
          />
            <HomeCard 
          img="/icons/recordings.svg"
          title="View Recordings"
          description="Check out your recordings"
           handleClick={() => router.push('/recordings')}
           className="bg-purple-600"
          />
            <HomeCard 
          img="/icons/join-meeting.svg"
          title="Join Meeting"
          description="via invitation link"
          handleClick={() => router.push('/meet')}
          className="bg-yellow-500" 

          />
   </section>
  )
}

export default MeetingTypeList