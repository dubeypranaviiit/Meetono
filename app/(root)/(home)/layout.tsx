import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React,{ReactNode} from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Meetono',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
  icons: {
    icon: '/icons/meetono1.png', // ✅ favicon path in /public
  },
};

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
   <main className="h-screen w-full ">
    <div className=''>
    <Navbar  />
    </div>
 
 <div className='flex'>
  <div className='md:w-1/4 top-0 left-0 '>
  <Sidebar />
  </div>

 <section className="flex w-full min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full min-h-screen md:overflow-y-hidden sm:overflow-y-hidden">
            {children}
            </div>
        </section>
 </div>
   </main>
  )
}

export default Rootlayout;