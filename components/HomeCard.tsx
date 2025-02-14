"use client"
import React from 'react'
import { cn } from '@/lib/utils';
import Image from 'next/image'
// import MeetingData from "./meetingData"
interface HomeCardProps{
  className:string,
  img:string,
  title:string,
  description:string,
  handleClick:()=>void;
}
const HomeCard = ({className,img,title,description,handleClick}:HomeCardProps) => {
  return (
    <div className={cn(" bg-orange-1 px-3 py-3 flex flex-col justify-between w-full xl:max-[3500px] min-h-[300px] rounded-[14px] cursor-pointer",className)}
    onClick={handleClick}
    >
         {/* <div className='flex sm:flex-col md:flex-row'> */}
         <div className='flex-center glassmorphism size-12 rounded-[10px]'>
            <Image src={img} alt="meeting" width={27} height={27} />
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1> 
            <p className="text-lg font-normal">{description}</p> 
          </div>
         {/* </div> */}
        </div>

    // </div>
  );
};

export default HomeCard;

    //  <div className='bg-orange-1 px-4 py-6 flex flex-col justify-between w-full xl:max-[270px] min-h-[260px] rounded-[14px] cursor-pointer'
    //        onClick={()=>{}}
    //        >
    //         <div className='flex-center glassmorphism size-12 rounded-[10px]'>
    //         <Image src={'/icons/ass-meeting.svg'} 
    //         alt='meeting'
    //         width={27}
    //         height={27}
    //         />
    //         </div>
    //    <div className='flex flex-col gap-2'>
    //     <h1></h1>
    //    </div>