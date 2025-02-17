import StreamVideoProvider from '@/providers/StreamClientProvider'
import { StreamTheme } from '@stream-io/video-react-sdk'
import React,{ReactNode} from 'react'
// import '@stream-io/video-react-sdk/style.css';

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