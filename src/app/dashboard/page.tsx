"use client"
import CodeCard from "@/components/molecules/codeCard";
import React from "react";
import Image from "next/image";

// React icons imports
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoIosArrowRoundForward } from "react-icons/io";
import Transactions from "@/components/organisms/Transactions";
import { Code, Purchase, User } from "../../../types";
import { getCodeById, getPurchasesPerBuyer } from "@/utiles/service/queries";
import UploadedCode from "@/components/organisms/uploadHistory";
import Link from "next/link";

const codeData = [
  {
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
  {
    title: "hero section",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
  {
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
  {
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
];

export default function Dashboard() {
  const [loading, setLoading] = React.useState<Boolean>(false)
  const [isLoading, setIsLoading] = React.useState<Boolean>(false)
  const [transactionData, setTransactionData] = React.useState<Purchase[]>([])
  const [uploads, setUploads] = React.useState<Code[]>([])
  const [user, setUser] = React.useState<User | null>(
    (): User | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("userObject") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  )

  React.useEffect(() => {
    setLoading(true)
    setIsLoading(true)
    getPurchasesPerBuyer(user?.id)
      .then((data) => {
        setTransactionData(data)
        setLoading(prev => !prev)
        console.log('these are purchases', data)
      })
      .catch((error) => {
        console.log('Un able to fetch purchases', error)
      })

    getCodeById(user?.id)
      .then((res) => {
        setUploads(res)
        setIsLoading(prev => !prev)
        console.log('these are uploaded cources', res)
      })

  }, [])

  return (
    <div className="flex flex-col w-full gap-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">👋Hi, {user?.name}</h3>{" "}
      </div>
      <div className="md:flex gap-4 w-full">
        {codeData.map((code, index) => (
          // <CodeCard
          //   key={index}
          //   title={item.title}
          //   author={item.user.name}
          //   rating={item.rating}
          //   price={item.price}
          //   onClick={() => handleClick(item.id)}
          //   handleDetail={() => handleDetail(item.id)}
          // />
          <div key={index} className="bg-[#f1f1f1] border shadow w-[200px]">
            <div
            >
              <Image
                src="https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"
                alt="zip file image"
                className="border shadow hover:cursor-pointer"
                width={200}
                height={122}
                loading="lazy"
              />
            </div>
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
        <h3 className="font-semibold text-lg">Transaction History</h3>
        <div className="w-full">
          {(loading && transactionData)
            ?
            <Transactions transaction={transactionData} />
            :
            <p className="italic font-mono">No transaction done yet</p>}
        </div>
      </div>
      <div className=" w-full">
        <h3 className="font-semibold pb-4 text-lg">Upload History</h3>
        {(isLoading && transactionData)
            ?
            <UploadedCode uploaded={uploads} />
            :
            <p className="italic font-mono">No upload has been done yet. <Link className="text-blue-500 hover:underline" href="/dashboard/upload">Upload Snippet</Link> </p>}
      </div>
    </div>
  );
}
