import React from 'react'

export default function PageDetailSkeleton() {

  return (
    <div className='w-[500px] md:flex gap-5'>
      <div className='border skeleton shadow w-1/2 h-[250px]'></div>
      <div className='my-auto flex flex-col gap-1 leading-loose w-1/2'>
        <div className='skeleton h-6 my-1'></div>
        <div className='skeleton h-4 my-1 w-2/3'></div>
        <div className='pb-2 skeleton h-4 my-1 w-1/2'></div>
        <div className='skeleton h-4 w-[80%] pb-2 my-1'></div>
        <div className='skeleton h-4 my-1 '></div>
        <div className='skeleton h-4 w-2/3 my-1'></div>
        <div className='skeleton py-4 h-6 my-2'></div>
      </div>
    </div>
  )
}