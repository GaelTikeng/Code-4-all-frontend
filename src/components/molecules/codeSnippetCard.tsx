import Image from "next/image";
import React from "react";
import Button from "../atoms/button";

type Props = {
  title: string | undefined,
  author?: string | undefined,
  rating: number | undefined
  price: number | undefined,
  onClick?: () => void,
  handleDetail?: () => void
}

export default function CodeCard({ handleDetail, onClick, title, author, rating, price }: Props) {


  return (
    <div className=" max-w-[170px] ">
      <div onClick={handleDetail}>
        <Image
          src="https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"
          alt="zip file image"
          className="border shadow hover:cursor-pointer"
          width={170}
          height={122}
          loading="lazy"
        />
      </div>
      <h2 className="text-sm  font-medium">{title}</h2>
      <p className="text-xs text-gray-400">Author: {author}</p>
      {/* <Rating style={{maxWidth: 300}} className="font-sm" onChange={() => handleChange(rating)} value={state.rate} /> */}
      <div className="flex justify-between">
        {rating ? <p className="text-sm font-medium">{rating} ⭐</p> : ''}
        <h3 className="text-sm font-extrabold pb-2">{price} FCFA</h3>
      </div>
      <Button
        label="Add to cart"
        color="bg-[#f94d1c]"
        text="text-white"
        onClick={onClick}
      />
    </div>
  )
}