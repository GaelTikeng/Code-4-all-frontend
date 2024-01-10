"use client"
import React, { useState } from "react"
import { BsSearch } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { IoMdContact } from "react-icons/io";
import Button from "../atoms/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DropdownModal from "../atoms/dropDownModal";
import { LOCAL_STORAGE } from "@/utiles/service/storage";
import Avatar from "react-avatar";
import { Code, User } from "../../../types";
import { CiSearch } from "react-icons/ci";


export default function Navbar2() {
  const router = useRouter()
  const [showDropDown, setShowDropDown] = useState<Boolean>(false)
  const [disconnect, setDisconnect] = useState<Boolean>(false)

  const [user, setUser] = useState<User | null>(
    (): User | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("userObject") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  )
  const [snippets, setSnippets] = React.useState<Code[] | undefined>(
    (): Code[] | undefined => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage = JSON.parse(localStorage.getItem("codeArray") as string) || [];
        if (fromLocalStorage) return fromLocalStorage;
      }
      return undefined;
    }
  )

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

  const list = [
    {
      label: "Dashboard",
      function: () => {
        router.push('/dashboard')
        setDisconnect(!disconnect)
      }
    },
    {
      label: "Disconnect",
      function: () => {
        setDisconnect(!disconnect)
        localStorage.clear()
        router.push('/')
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

  function handleDiscoonnect() {
    setDisconnect(prev => !prev)
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
        <div className="my-auto">
          {snippets?.length ?
            <div className="bg-red-500 text-center z-20 mt-[-10px] right-[65px] md:right-[124px] absolute  mb-2 h-5 text-[10px] w-5 p-1 rounded-full text-white">{snippets?.length}</div>
            : ""}
          <GiShoppingCart
            size="25"
            className="my-auto relative hover:cursor-pointer"
            onClick={handleGoToCart}
          />
        </div>
        <div
          onClick={handleOpenDP}
          className={user?.name ? " hidden md:hidden my-auto " : "md:hidden my-auto "}
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
        {user?.name ?
          <div onClick={() => handleDiscoonnect()} >
            <Avatar
              className="peer hover:cursor-pointer"
              name={user.name}
              color="#000"
              round={true}
              size="35"
            />
          </div>
          : <div className="md:flex hidden my-auto gap-2">
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
        }
      </div>
      {disconnect && (
        <div className="absolute z-40 top-12 shadow right-0">
          <DropdownModal onClose={handleCloseModal}>
            <ul className="py-2 w-full flex flex-col gap-2">
              {list.map((item, index) => (
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
  )
}

