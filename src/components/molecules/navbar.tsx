"use client"
import React, { useState } from "react"
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import Button from "../atoms/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropdownModal from "../atoms/dropDownModal";
import { CiSearch } from "react-icons/ci";



export default function Navbar() {
  const router = useRouter()
  const [showDropDown, setShowDropDown] = useState<Boolean>(false)

  const dropDownList = [
    {
      label: "Login",
      function: () => {
        router.push('/login')
        setShowDropDown(prev => !prev)
      }
    },
    {
      label: "Signup",
      function: () => {
        router.push('/signup')
        setShowDropDown(prev => !prev)
      }
    }
  ]

  const handleLogin = () => {
    router.push("/login")
  }

  const handleSignup = () => {
    router.push('/signup')
  }
  function handleGoToCart() {
    router.push('/cart')
  }

  function handleCloseModal(): void {
    throw new Error("Function not implemented.");
  }

  function handleOpenDP() {
    setShowDropDown((prev) => !prev)
  }

  return (
    <div className=" flex gap-4 justify-between py-3 shadow-lg w-full md:px-[80px] px-[20px] ">
      <div className="flex">
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
      </div>
      <div className="input flex bg-[#f1f1f1] w-[70%] items-center py-1 px-2 gap-2 rounded-full">
        <CiSearch size={20} />
        <input
          type="text"
          placeholder="search..."
          className="w-full  outline-none bg-transparent"
        />
      </div>

      <div className="flex gap-4 my-auto">
        {/* <BsSearch
          className="md:hidden my-auto"
          size="20"
        /> */}
        <GiShoppingCart
          size="25"
          className="my-auto hover:cursor-pointer"
          onClick={handleGoToCart}
        />
        <div
          onClick={handleOpenDP}
          className="md:hidden my-auto "
        >
          <IoMdContact
            size="25"
          />
        </div>
        {showDropDown && (
          <div className="absolute z-40 top-10 right-0">
            <DropdownModal onClose={handleCloseModal}>
              <ul className="py-2 w-full flex flex-col gap-2">
                {dropDownList.map((item, index) => (
                  <li
                    className="px-5 py-2 hover:bg-gray-200 hover:cursor-pointer text-sm "
                    key={index}
                    onClick={item.function}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            </DropdownModal>
          </div>
        )}
      </div>
      <div className="md:flex hidden my-auto gap-2">
        <Button
          label="Login"
          color="bg-white"
          text="text-black"
          borderColor="border-black"
          onClick={() => handleLogin()}
        />
        <Button
          label="Signup"
          color="bg-[#f94d1c]"
          text="text-white"
          onClick={() => handleSignup()}
        />
      </div>
    </div>
  )
}

