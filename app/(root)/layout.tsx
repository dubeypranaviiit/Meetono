import React,{ReactNode} from 'react'

const Rootlayout = ({children}:{children:ReactNode}) => {
  return (
   <main className='relative'>
 {
  children
 }
   </main>
  )
}

export default Rootlayout