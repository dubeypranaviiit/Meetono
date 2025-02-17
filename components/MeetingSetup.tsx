"use client"
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const MeetingSetup = ({setIsSetupComplete}:{setIsSetupComplete:(value:boolean)=>void}) => {
    const [isMicCamOn,setIsMicCamOn] = useState(false);
    const call = useCall();
      // this call conatin camera and microphone access
    if(!call){
        throw new Error('use call must be used within stream call component')
    }
      useEffect(()=>{

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((stream) => {
          console.log("Camera & Mic Access Granted", stream);
        })
        .catch((err) => {
          console.error("Camera/Microphone access denied:", err);
        });
  
         if(isMicCamOn){
          call?.camera.disable();
          call?.microphone.disable();
         }else{
            call?.camera.enable();
            call?.microphone.enable();
         }
    },[isMicCamOn,call?.camera,call?.microphone])

  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-3 text-black'>
        <h1 className='text-2xl font-bold'>Setup</h1>
        <VideoPreview />
   <div className='flex h-16 items-center justify-center gap-3'>
     <label className='flex items-center justify-center gap-2 font-medium'>
        <input    
        type='checkbox'
        checked={isMicCamOn}
        onChange={(e)=>setIsMicCamOn(e.target.checked)}

        />
        Join with mic and camera off
     </label>

    <DeviceSettings />
   </div>
   <Button className='rounded-md bg-blue-700 hover:bg-green-600 px-4 py-2.5'
   onClick={()=>{
    call.join();
    setIsSetupComplete(true)
   }}
   >
   Join meeting
   </Button>
        
        </div>
  )
}

export default MeetingSetup