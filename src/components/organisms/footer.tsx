import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaWhatsapp, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";


type Props = {}

export default function Footer({ }: Props) {

  return (
    <div className="bg-[#0a191c] py-6">
      <div className="text-[#f2f2f2] md:px-[80px] flex  px-[20px] md:flex gap-4">
        <div className="md:flex md:w-1/2 ">
          <div className="flex flex-col w-full leading-8">
            <Image
              src="/code4all-white.png"
              alt="logo"
              height={60}
              width={120}
              priority={false}
            />
            <Link href="#" className="hover:underline hover:text-[#f94d1c] pt-3">Privacy Policy</Link>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">Terms and Conditions</Link>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">Lorem ipsum dolor sit</Link>
          </div>
          <div className="flex flex-col w-full leading-8">
            <h2>
              INFORMATION
            </h2>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">About us</Link>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">check out</Link>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">Suggestions</Link>
          </div>
        </div>
        <div className="md:flex md:w-1/2 ">
          <div className="flex flex-col md:w-1/2 w-full leading-8">
            <h2>
              HELP
            </h2>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">My contact</Link>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">Cart</Link>
            <Link href="#" className="hover:underline hover:text-[#f94d1c]">Order status</Link>
          </div>
          <div className="flex flex-col md:w-1/2 w-full leading-8">
            <h2>
              SOCIAL MEDIA
            </h2>
            <div className="flex gap-4 pb-4">
              <FaWhatsapp size={20} className="hover:text-[#f94d1c] hover:cursor-pointer" />
              <FaLinkedin size={20} className="hover:text-[#f94d1c] hover:cursor-pointer" />
              <FaTwitter size={20} className="hover:text-[#f94d1c] hover:cursor-pointer" />
            </div>
            <div className="flex gap-4 align-baseline">
              <FaPhoneVolume size={15} className="hover:text-[#f94d1c] my-auto hover:cursor-pointer" />
              <p className="">(+237-672-028-854)</p>
            </div>
            <div className="flex gap-4 align-baseline">
              <MdEmail size={15} className="hover:text-[#f94d1c] my-auto hover:cursor-pointer" />
              <p className="">code4all@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4 w-[88%] mx-auto" />
      <div className="text-white md:px-[80px] px-[20px] flex justify-between ">
        <div>
          <h2 className="font-medium text-base">Category</h2>
          <div className="flex">
            <p className="text-xs"></p>
          </div>
        </div>
        <p className="text-[10px] my-auto">code4all 2024 | All Right Reserved</p>
      </div>
    </div>
  )
}