import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import React,{ReactNode} from 'react'
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ZOOM',
  description: 'A workspace for your team, powered by Stream Chat and Clerk.',
};

// const Rootlayout = ({children}:{children:ReactNode}) => {
//   return (
//    <main className='fixed sm:w-full sm:min-h-screen sm:overflow-hidden'>
//   <Navbar  />
//  <div className='flex'>
//  <Sidebar />
//  <section className="flex w-full min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
//           <div className="w-full min-h-screen md:overflow-y-hidden sm:overflow-y-hidden">
//             {children}
//             </div>
//         </section>
//  </div>
//    </main>
//   )
// }

// export default Rootlayout;
// 
// const Rootlayout = ({ children }: { children: ReactNode }) => {
//   return (
//     <main className="h-screen w-full lg:fixed">
//       {/* ✅ Fixed Navbar */}
//       <div className="fixed top-0 left-0 w-full h-16 bg-gray-900 text-white shadow-md z-50" >
//       <Navbar />
//       </div>
      

//       {/* ✅ Layout for Small (`sm`) & Medium (`md`) Screens */}
//       <div className="flex h-screen w-full pt-16 sm:flex md:flex lg:hidden">
//         <div  className="fixed left-0 top-16 h-[calc(100vh-2rem)] w-[220px] bg-gray-800 text-white z-40 max-sm:hidden" >
//         <Sidebar/>
//         </div>
        
//         <section className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto px-6 pb-6 pt-4 sm:px-14 ml-[220px]  ">
//           {children}
//         </section>
//       </div>

//       {/* ✅ Layout for Large (`lg`) and above */}
//       <div className="hidden lg:flex lg:w-full lg:min-h-screen lg:overflow-hidden">
//         <Navbar />
//         <div className="flex">
//           <Sidebar />
//           <section className="flex w-full min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
//             <div className="w-full min-h-screen overflow-y-auto">{children}</div>
//           </section>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default Rootlayout;

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