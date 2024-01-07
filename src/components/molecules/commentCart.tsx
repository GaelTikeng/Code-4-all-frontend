import Image from "next/image";
import React from "react";

type Props = {
  onClick?: () => void,
  name?: string,
  createdAt?: string,
  comment: string
}

export default function CommentCart({ onClick, createdAt, comment, name }: Props) {
  return (
    <div className="bg-white py-5 max-w-[300px] leading-loose m-4 shadow">
      <div className="flex justify-center py-4">
        <Image
          src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
          alt="user photo"
          height={80}
          width={80}
          className="rounded-full m-auto w-[80px] object-fill border border-[#f94d1c] h-[80px]"
        />
      </div>
      <p className="bg-[#f94d1c] text-white w-full text-center">{name}</p>
      <p className="text-center">number of starts</p>
      <p className="text-center">{createdAt}</p>
      <p className="text-center">{comment}</p>
    </div>
  )
} 