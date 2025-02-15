"use client";
import React from 'react';
import { useParams } from "next/navigation";
const Meeting = () => {
    const params = useParams()
    console.log(params);
   
  return (
    <div className='bg-white h-screen'>Meeting Room: {
      params.id || "No slug provided"
      }
      </div>
  )
}

export default Meeting