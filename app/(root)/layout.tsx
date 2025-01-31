import React,{ReactNode} from 'react'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
   <main className='relative'>
 hi:{
  children
 }
   </main>
  )
}

export default Rootlayout