import StreamVideoProvider from '@/providers/StreamClientProvider'

import React,{ReactNode} from 'react'
export const metadata: Metadata = {
  title: 'Meetono',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};


const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
   <main className='relative'>
    <StreamVideoProvider>
      
      {
  children
  }
      

 </StreamVideoProvider>
   </main>
  )
}

export default Rootlayout