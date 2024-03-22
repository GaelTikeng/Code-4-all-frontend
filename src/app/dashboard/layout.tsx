"use client"
import Image from "next/image";
import Link from "next/link";

// React icons import
import { MdDashboard } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { User } from "../../../types";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FaFileUpload } from "react-icons/fa";
import DropdownModal from "@/components/atoms/dropDownModal";
import { AiOutlineMenu } from "react-icons/ai";
import { FaChevronRight } from "react-icons/fa6";
import MenuItem from "@/components/molecules/menuItem";


const links = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdDashboard className='text-[#f94d1c]' size='20' />,
  },
  {
    name: "Upload Snippet",
    path: "/dashboard/upload",
    icon: <FaFileUpload className='text-[#f94d1c]' size='20' />,
  },
];

const Layout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const paramName = pathname.split("/").slice(-1)[0];
  const router = useRouter()
  const [active, setActive] = useState<Boolean>(false)
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

  const list = [
    {
      label: "Dashboard",
      function: () => {
        setDisconnect(!disconnect)
        router.push('/dashboard')
      }
    },
    {
      label: "Disconnect",
      function: () => {
        setDisconnect(!disconnect)
        localStorage.removeItem('userObject')
        router.push('/')
      }
    }
  ]

  const handleLockOut = () => {
    localStorage.removeItem('userObject')
    router.push('/')
  }

  function handleCloseModal(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="w-full h-sccreen flex">
      <div className="sideNav md:bg-[#f1f1f1] h-screen w-[20vw] hidden md:flex flex-col justify-between">
        <div
          onClick={() => router.push('/')}
          className="hidden md:flex w-full justify-center hover:cursor-pointer mt-5 items-center p-2">
          <Image
            src={"/code4all.png"}
            alt={"code4all logo"}
            width={150}
            height={70}
          />
        </div>

        <div className="hidden md:flex flex-col justify-between py-2 h-[100vh]">
          <div className="flex flex-col gap-2">
            {links.map((link, index) => (
              <Link
                key={index}
                href={link.path}
                className={`px-9 py-4 flex items-center gap-2 hover:bg-white ${link.path === paramName ? " bg-white border-l-2 border-[#F94D1D]" : ""} hover:border-l-2 duration-5 border-[#F94D1D]`}
              >
                <p className="flex-1 flex gap-2">
                  {link.icon}
                  {link.name}
                </p>
                <FaChevronRight className="text-[#F94D1D]" />
              </Link>
            ))}
          </div>

          <button
            onClick={() => handleLockOut()}
            className="flex items-center justify-center hover:bg-white text-[#F94D1D]  gap-2 px-6">
            <CiLogout /> Logout
          </button>
        </div>
      </div>
      <div className="flex w-full md:w-[80vw] h-screen p-5">
        <div className=" w-full">
          <div className="topNav top-0 items-baseline flex justify-between w-full md:w-[100%]">
            <AiOutlineMenu
              size="25"
              className="md:hidden"
              onClick={() => {
                setActive((prev) => !prev);
                // setTimeout(() => {
                //   setActive((prev) => !prev);
                // }, 10000);
              }}
            />
            <div
              onClick={() => router.push('/')}
              className="md:hidden flex w-[100px] justify-center hover:cursor-pointer mt-5 items-center p-2">
              <Image
                src={"/code4all.png"}
                alt={"code4all logo"}
                width={100}
                height={50}
              />
            </div>
            <div className="input hidden md:flex bg-[#f1f1f1] w-[80%] items-center py-1 px-2 gap-2 rounded-full">
              <CiSearch size={20} />
              <input
                type="text"
                placeholder="search..."
                className="w-full  outline-none bg-transparent"
              />
            </div>
            <div className="" onClick={() => setDisconnect(prev => !prev)}>
              <Avatar
                className="peer hover:cursor-pointer"
                name={user?.name}
                color="#000"
                round={true}
                size="30"
              />
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
          <MenuItem className={`${active
            ? "z-20 top-0 md:hidden ml-[-4] mt-20 absolute w-full transition-transform 1s ease-in-out"
            : "hidden"
            }`} />
          <div className="py-4 md:w-[100%] h-[calc(100vh-56px)] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
