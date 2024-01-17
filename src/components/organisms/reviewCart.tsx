import React from "react";
import Avatar from "react-avatar";
import { MdOutlineThumbDownOffAlt, MdOutlineThumbUp } from "react-icons/md";

interface Props {
  name: string,
  rating?: string,
  createdAt: string,
  review: string | undefined
}

export default function ReviewCart({ name, review, createdAt, rating }: Props) {

  return (
    <div className="w-full md:max-w-[900px]">
      <hr></hr>
      <div className="flex gap-5 py-4 ">
        <Avatar
          className="peer hover:cursor-pointer"
          name={name}
          color="#000"
          round={true}
          size="40"
        />
        <div className="">
          <h2 className="font-semibold text-lg ">{name}</h2>
          <div className="flex gap-4 align-baseline">
            <p className="text-[12px] ">{rating} <span className="text-gray-400">stars</span></p>
            <p className="font-semibold text-xs text-gray-400 ">{createdAt.slice(0, 10)}</p>
          </div>
        </div>
      </div>
      <p className="pb-10">{review}</p>
      <div className="flex gap-5">
        <p className="text-xs text-gray-400">Helpfull?</p>
        <MdOutlineThumbUp className="hover:cursor-pointer" />
        <MdOutlineThumbDownOffAlt className="hover:cursor-pointer" />
      </div>
    </div>
  )
}