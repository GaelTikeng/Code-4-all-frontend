import React from "react";


export default function SkeletonCart() {

  return (
    <div className="md:px-[80px] px-[20px] bg-white py-8 flex gap-6 flex-wrap">
      {[...Array(15)].map((item, index) => (
        <div key={index} className="max-w-[170px] gap-3">
          <div className="w-full skeleton mb-2 border rounded h-[122px]"></div>
          <div className="skeleton my-1 h-2 rounded w-[70%] "></div>
          <div className="skeleton my-1 h-2 w-1/2"></div>
          <div className="flex my-2 gap-4 justify-center">
            <div className="skeleton h-2 w-[70px] "></div>
            <div className="skeleton h-2 pb-2 w-[80px]"></div>
          </div>
          <div className="skeleton anaimate-pulse bg-white h-6 w-full"></div>
        </div>
      ))}
    </div>
  )
}