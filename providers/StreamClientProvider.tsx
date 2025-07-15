"use client"
import { tokenProvider } from "@/action/stream.action";

import { useUser } from "@clerk/nextjs";
import {
    StreamVideo,
    StreamVideoClient,
    // User,
  } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
  
  const apiKey =process.env.NEXT_PUBLIC_STREAM_API_KEY?.trim();;

  const StreamVideoProvider = ({children}:{children:ReactNode}) => {
    const [videoClient,setVideoClient] =useState<StreamVideoClient>();
    const {user,isLoaded}= useUser()
    useEffect(()=>{
if(!isLoaded || !user){
return;
}

if(!apiKey){
throw new Error('Stream ApI key Missing')
}
const client = new StreamVideoClient({ 
    apiKey,
     user:{
        id:user?.id,
        name:user?.username ||user?.id,
        image:user?.imageUrl,
     },
      tokenProvider:async () => {
        return await tokenProvider();
    },
    
    });
    setVideoClient(client)
    },[user,isLoaded])
    if(!videoClient) return null;
 
    return (
      <StreamVideo client={videoClient}>
        {
            children
        }
       
      </StreamVideo>
    );
  };

   
  export default StreamVideoProvider