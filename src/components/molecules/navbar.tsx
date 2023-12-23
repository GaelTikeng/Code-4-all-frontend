import React from "react"
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";



export default function Navbar() {

  return (
    <div className="md:px-[80px] flex gap-4 pt-4 justify-between px-[20px] md:pt-5">
      <p className="text-2xl ">Code 4 all</p>
      <div className="w-full sm:w-[300px] md:w-[60%] relative h-fit hidden md:flex bg-red-500">
        <BsSearch
          className="absolute left-0 top-0 ml-3 mt-3 text-gray-400 font-meduim"
          size={17}
        />
        <input
          className="border-black border p-2 px-4 rounded-full w-full
            placeholder:text-gray-400 font-normal placeholder:px-10 py-2 outline-none"
          type="text"
          placeholder="To search"
        />

      </div>
      <div className="flex gap-4 ">
        <GiShoppingCart
          size="30"
          className="my-auto"
        />
        <div className="md:hidden my-auto ">
          <IoMdContact size="30"/>
        </div>
      </div>

    </div>
  )
}