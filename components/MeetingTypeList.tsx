"use client"
import Image from 'next/image'
import React from 'react'
import HomeCard from './HomeCard'

const MeetingTypeList = () => {
  return (
   <section className='grid  grid-cols-1 gap-5 mg:grid-cols-2 xl:grid-cols-4'>
    <HomeCard />
   </section>
  )
}

export default MeetingTypeList