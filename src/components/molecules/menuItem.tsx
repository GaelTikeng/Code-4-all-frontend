import Link from "next/link";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";


type Props = {
  className: string
}

export default function MenuItem({ className }: Props) {
  const [close, setClose] = React.useState<Boolean>(false)

  const handleClick = () => {
    setClose(prev => !prev)
    
  }

  return (
    <div className={className}>
      <div className={`${close ? "translate-x-full" : "flex  gap-4 bg-opacity-80 bg-black h-full"}`}>
        <div className="flex py-7 flex-col gap-6 bg-white h-[100vh] w-[70%]">
          <p onClick={() => setClose(prev => !prev)}><Link href={"/dashboard"}>Dashboard</Link></p>
          <p onClick={() => setClose(prev => !prev)}><Link href={"/dashboard/upload"}>Upload Snippet</Link></p>
        </div>
        <IoCloseCircleOutline
          onClick={handleClick}
          className="mt-5 text-white"
          size="35"
        />
      </div>
    </div>
  )
}