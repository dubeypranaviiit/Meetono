import MeetingTypeList from '@/components/MeetingTypeList';
import React from 'react'
// import Mee
const Home = () => {
  const now = new Date();
  const formattedDate: string = new Date().toLocaleDateString('en-IN', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
  const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDay: string = days[new Date().getDay()];
  console.log(currentDay);
  
  const formattedTime: string = timeFormatter.format(now);

  console.log(`Date: ${formattedDate}, Time: ${formattedTime}`);
  
  return (
    <section className='flex min-h-screen w-full  flex-col gap-10 text-white overflow-y-auto lg:-ml-[10px] '>
     <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover' >
            <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                   <h2 className=' glassmorphism max-w-[270px] rounded py-2 text-center text-base font-normal'>Upcoming Meeting at :12:30 PM</h2>
                   <div className='flex flex-col gap-2'>
                    <div>
                    <h1 className='text-2xl font-extrabold lg:text-7xl'> {formattedTime} </h1>                   
                    </div>             
                  <p className='text-xl font-medium text-sky-1 lg:text-2xl'>{currentDay}, {formattedDate}</p>
                   </div>
            </div>
     </div>
     <MeetingTypeList />
    </section>
  )
}

export default Home