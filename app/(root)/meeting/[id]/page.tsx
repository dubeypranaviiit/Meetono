"use client";
import React, { useState } from 'react';
import { useParams } from "next/navigation";
import { useUser } from '@clerk/nextjs';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import { useGetCallById } from '@/hooks/useGetCallById';
import { Spinner } from '@/components/Spinner';
const Meeting = () => {
    const params = useParams()
    const id = params.id;
    console.log(id);
    console.log(params.id);
    const {isLoaded} = useUser();
    const [isSetupComplete,setIsSetupComplete]=useState(false);
    const {call,isCallLoading} = useGetCallById(id);
    if(!isLoaded || isCallLoading) return <Spinner />
  return (
   <main className='h-screen w-full bg-white'>
        <StreamCall call={call}>
          <StreamTheme >
                       {
                        !isSetupComplete ?(
                           <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
                        ):(
                          <MeetingRoom />
                        )
                       }
          </StreamTheme>
        </StreamCall>
   </main>
  )
}

export default Meeting