import React from "react"
import { BsSearch } from "react-icons/bs";

export default function Navbar() {

  return (
    <div className="px-[80px] flex pt-5">
      <p className="text-2xl ">Code 4 all</p>
      <div className="w-full sm:w-[300px] md:w-[60%] relative">
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

    </div>
  )
}