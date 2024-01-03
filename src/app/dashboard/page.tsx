import CodeCard from "@/components/molecules/codeCard";
import React from "react";
import Image from "next/image";

// React icons imports
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Transactions from "@/components/organisms/Transactions";

const codeData = [
  {
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://i.pinimg.com/236x/b4/1a/8a/b41a8acccf85813efcddf1d93061ecc6.jpg",
  },
  {
    title: "hero section",
    price: 3000,
    review: 40,
    image:
      "https://i.pinimg.com/236x/b4/1a/8a/b41a8acccf85813efcddf1d93061ecc6.jpg",
  },
  {
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://i.pinimg.com/236x/b4/1a/8a/b41a8acccf85813efcddf1d93061ecc6.jpg",
  },
  {
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://i.pinimg.com/236x/b4/1a/8a/b41a8acccf85813efcddf1d93061ecc6.jpg",
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3>👋Hi, Tikeng</h3>{" "}
        <div className="flex items-center text-[#F94D1D] gap-2">
          <button className="bg-[#f1f1f1] p-1">
            <IoIosArrowRoundBack size={20} />
          </button>{" "}
          <button className="bg-[#f1f1f1] p-1">
            {" "}
            <IoIosArrowRoundForward size={20} />{" "}
          </button>
        </div>
      </div>
      <div className="flex  gap-4 w-full">
        {codeData.map((code, index) => (
          <div key={index} className="bg-[#f1f1f1] w-[600px]">
            <div
              style={{
                backgroundImage: `url(${code.image})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
              }}
              className="w-full h-[200px]"
            ></div>
            <div className="flex flex-col px-2">
              <h2>{code.title}</h2>
              <div className="flex items-center justify-between">
                <span>{code.price}</span>
                <span>{code.review}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <h3>Transaction History</h3>
        <div>
          <Transactions />
        </div>
      </div>
    </div>
  );
}
