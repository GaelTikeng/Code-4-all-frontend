import Image from "next/image";
import { title } from "process";
import React from "react";
import Button from "../atoms/button";

type Props = {
  title: string,
  author?: string,
  rating?: number
  price: number,
  onClick?: ()=> void
}

export default function CodeCard({ onClick, title, author, rating, price }: Props) {

  return (
    <div className=" max-w-[170px] ">
      <div onClick={onClick}>
        <Image
          src="https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"
          alt="code photo"
          className="border shadow hover:cursor-pointer"
          width={170}
          height={122}
          loading="lazy"
        />
      </div>
      <h2 className="text-lg  font-medium">{title}</h2>
      <p className="text-xs ">{author}</p>
      <p className="text-sm font-medium">{rating} stars</p>
      <h3 className="text-sm font-extrabold pb-2">{price} FCFA</h3>
      <Button
        label="Add to cart"
        color="bg-[#f94d1c]"
        text="text-white"
      />
    </div>
  )
}