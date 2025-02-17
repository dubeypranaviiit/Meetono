"use client"
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
// import { useParams } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { useCallStateHooks } from '@stream-io/video-react-sdk';
// import { UseSearchParams } from '@stream-io/video-react-sdk/dist/src/components/Search/hooks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {LayoutList, Users} from "lucide-react"
import { CallControls, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk';
import React, { useState } from 'react'
// import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Spinner } from './Spinner';
 type CallLayoutType= 'grid' | 'speaker-left ' | 'speaker-right'
 const data =['grid' , 'speaker-left ' , 'speaker-right']
 import EndCallButton from './EndCallButton';
 import { CallingState } from '@stream-io/video-react-sdk';
const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');
  const [layout,setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParticipant,setShowParticipant] =useState(false)
  const CallLayout = ()=>{
         switch (layout) {
          case 'grid':
               return <PaginatedGridLayout />
          case 'speaker-right':
               return <SpeakerLayout 
               participantsBarPosition="left" />     
           case 'speaker-left':
              return <SpeakerLayout 
              participantsBarPosition="right" />   
         
          default:
            break;
         }
  }
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();
  if (callingState !== CallingState.JOINED) return <Spinner />;
  return (
   <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
                <div className=' relative flex size-full items-center justify-center '>
                   <div className='flex size-full max-w-[1000px] items-center'>
                               <CallLayout />
                   </div>
                   <div className= {cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipant})}>
                           <CallParticipantsList onClose={()=>setShowParticipant(false)}  />
                   </div>
                </div>
                   <div className='fixed bottom-0 flex flex-wrap w-full items-center justify-center gap-5'>
                    <CallControls  onLeave={() => router.push(`/`)} />
                    <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]  ">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
            {data.map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  onClick={() =>
                    setLayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="border-dark-1" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <CallStatsButton />
      <Button onClick={()=>setShowParticipant((prev)=>!prev)}>
        <div className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
          <Users size={20} className='text' />
        </div>

      </Button>
      {!isPersonalRoom && <EndCallButton />}
                   </div>
   </section>
  )
}

export default MeetingRoom