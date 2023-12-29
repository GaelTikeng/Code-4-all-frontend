"use client"
import React from "react"
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import Button from "../atoms/button";
import Image from "next/image";
import { useRouter } from "next/navigation";



export default function Navbar() {
  const router = useRouter()
  return (
    <div className=" flex gap-4 justify-between py-3 shadow-lg w-full md:px-[80px] px-[20px] ">
      <div
        onClick={() => {
          router.push("/")
        }}
        className="text-2xl hover:cursor-pointer my-auto">
        <Image
          src="/code4all.png"
          alt="logo"
          height={75}
          width={150}
          priority={false}
        />
      </div>
      <div className="w-full sm:w-[300px] md:w-[60%] relative h-fit hidden md:flex my-auto">
        <BsSearch
          className="absolute left-0 top-0 ml-3 mt-3 text-gray-400 font-meduim"
          size={17}
        />
        <input
          className="border-black border px-4 rounded-full w-full
            placeholder:text-gray-400 font-normal placeholder:px-10 py-1 outline-none my-auto"
          type="text"
          placeholder="To search"
        />

      </div>

      <div className="flex gap-4 my-auto">
        <BsSearch
          className="md:hidden my-auto"
          size="20"
        />
        <GiShoppingCart
          size="25"
          className="my-auto"
        />
        <div className="md:hidden my-auto ">
          <IoMdContact size="25" />
        </div>
      </div>
      <div className="md:flex hidden my-auto gap-2">
        <Button label="Login" color="bg-white" text="text-black" borderColor="border-black" />
        <Button label="Signup" color="bg-[#f94d1c]" text="text-white" />
      </div>
    </div>
  )
}