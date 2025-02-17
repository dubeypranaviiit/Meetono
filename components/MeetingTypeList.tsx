"use client"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from "./MeetingModal"
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { Call } from '@stream-io/video-react-sdk'
import { Spinner } from "./Spinner"
import DatePicker  from "react-datepicker";
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
    toast({
      title: "Meeting created",
    })
   }catch(error){
    console.log('in creating meeting',error);
    toast({
      title: "failed to create meeting",
    })
  }
}
if (!client || !user) return <Spinner />;
const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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

{!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a description
            </label>
            <Textarea
              className="border-none bg-dark-2 focus-visible:ring-0 focus-visible:ring-offset-0 text-xl"
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-2 p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: 'Link Copied' });
          }}
          image={'/icons/checked.svg'}
          buttonIcon="/icons/copy.svg"
          className="text-center"
          buttonText="Copy Meeting Link"
        />
      )}



<MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        
        <input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>

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