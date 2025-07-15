import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { UserButton } from '@clerk/nextjs'
// import { SignedIn, UserButton } from '@clerk/nextjs'
const Navbar = () => {
  return (
    <nav className='flex   justify-between items-center fixed z-50 w-full top-0 left-0 bg-dark-1 px-6 py-4 lg:px-10' >
        <Link
        href='/'
         className='flex items-center gap-1'
        >
         <Image
          src="/icons/meetono1.png"
          alt="logo-image"
          width={32}
          height={32}
          className='max-sm:size-10'
          />
         <p className='text-[26px] font-extrabold text-white max-sm:hidden'>Meetono</p>
        </Link>
        <div className=' fixed right-0 p-3'>
        <UserButton />
        </div>
         
        
        <div className=" block sm:block md:block lg:hidden mr-8">
          
          <MobileNav />
        </div>
       
    </nav>
  )
}

export default Navbar
