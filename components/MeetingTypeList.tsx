"use client"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from "./MeetingModal"
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Call } from '@stream-io/video-react-sdk'
const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
  'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
>(undefined);
const [values,setValues] = useState({
  dateTime:new Date(),
  description:'',
  link:''
})
const router = useRouter();
  const {user} = useUser();
  const client = useStreamVideoClient();
  // const [callDetails,setCallDetails]= useState<Call>( )
  const [callDetails, setCallDetails] = useState<Call | null>(null);
  const { toast } = useToast()
const createMeeting =async()=>{
  if (!client) {
    console.log("Stream Video Client is not initialized");
    return;
  }
   if( !user) {
    return
    
   }
   try{
          // if(!values.dateTime){
          //   toast({
          //     title: "please select a date and time",
          //   })
          // }
       const id = crypto.randomUUID();
       const call = client.call('default',id);
       if(!call) throw new Error('Failed to create call')
      const  startsAt =values.dateTime.toISOString() || new Date(Date.now()).toISOString();
    const description = values.description || 'Instant meeting';
    await call.getOrCreate({
      data:{
        starts_at:startsAt,
        custom:{
          description
        }
      }
    })
    setCallDetails(call);
    if(!values.description){
      console.log(`call id :${call.id}`);
      router.push(`/meeting/${call.id}`)
    }
    // toast({
    //   title: "Meeting created",
    // })
   }catch(error){
    console.log('in creating meeting',error);
    toast({
      title: "failed to create meeting",
    })
  }
}
   
  return (
   <section className='grid  grid-cols-1 gap-5 mg:grid-cols-2 xl:grid-cols-4 w-full'>
          <HomeCard 
          img="/icons/add-meeting.svg"
          title="New Meeting"
          description="Start  an instant  meeting"
           handleClick={()=>setMeetingState('isInstantMeeting')}   
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

          <MeetingModal 
           isOpen ={meetingState==='isInstantMeeting'}
           onClose={()=>setMeetingState(undefined)}
           title="Start an Instant Meetiing"
           className="text-center"
           buttonText="Start Meeting"
           handleClick={createMeeting}

          />
   </section>
  )
}

export default MeetingTypeList