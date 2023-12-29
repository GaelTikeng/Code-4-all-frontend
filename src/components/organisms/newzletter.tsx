'use client'
import Image from "next/image";
import React from "react";
import Button from "../atoms/button";
type Props = {}

export default function Discount({ }: Props) {
  function handleChange(): React.ChangeEventHandler<HTMLInputElement> | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-[#f5f7fa] md:flex gap-[100px] md:px-[80px] px-[20px]">
      <Image
        src="/woman.jpg"
        alt="black woman"
        height={300}
        width={500}
        className="h-[350px]"
      />
      <div className="my-10 md:my-auto leading-loose">
        <p className="text-xs pb-4">20 % discount</p>
        <h2 className="font-semibold pb-4 text-2xl">Suscribe & Get 20% Discount Code</h2>
        <p className="text-xs pb-4">Looking for a discount code for your suprise ?</p>
        <div className="flex gap-4">
          <input
            className="bg-white md:w-[300px] px-4"
            placeholder="Email Address"
            type="text"
            onChange={() => handleChange}
          />
          <div className="w-[100px]">
          <Button label="Suscribe" color="bg-[#f94d1c]" text="text-white" />
          </div>
        </div>
      </div>

    </div>
  )
}