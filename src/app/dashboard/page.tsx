"use client"
import CodeCard from "@/components/molecules/codeSnippetCard";
import React from "react";
import Image from "next/image";

// React icons imports
import { IoMdClose } from "react-icons/io";
import Transactions from "@/components/organisms/Transactions";
import { Code, Purchase, User } from "../../../types";
import { getCodePerUser, getPurchasesPerBuyer } from "@/utiles/service/queries";
import UploadedCode from "@/components/organisms/uploadHistory";
import Link from "next/link";
import Button from "@/components/atoms/button";
import Overlay from "@/components/atoms/overlay";
import ReviewForm from "@/components/molecules/reviewForm";

const codeData = [
  {
    id: "1",
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
  {
    id: "2",
    title: "hero section",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
  {
    id: "3",
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
  {
    id: "4",
    title: "useDebounce",
    price: 3000,
    review: 40,
    image:
      "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg",
  },
];

export default function Dashboard() {
  const [id, setId] = React.useState<string>('')
  const [status, setStatus] = React.useState<string>('')
  const [popupActive, setPopupActive] = React.useState<Boolean>(false)
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
  const [snippets, setSnippets] = React.useState<Code[] | undefined>(
    (): Code[] | undefined => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage = JSON.parse(localStorage.getItem("codeArray") as string) || [];
        if (fromLocalStorage) return fromLocalStorage;
      }
      return undefined;
    }
  )

    const getStatusFromChild = (msg: string) => {
      setStatus(msg)
    }

  React.useEffect(() => {
    setLoading(true)
    setIsLoading(true)

    // get purchases per buyer
    getPurchasesPerBuyer(user?.id)
      .then((data) => {
        setTransactionData(data)
        setLoading(prev => !prev)
        // console.log('these are purchases', data)
      })
      .catch((error) => {
        console.log('Un able to fetch purchases', error)
      })

    // get code per user
    getCodePerUser(user?.id)
      .then((res) => {
        setUploads(res)
        setIsLoading(prev => !prev)
        // console.log('these are uploaded cources', res)
      })

  }, [user?.id])

  const handleReview = (id: string) => {
    setPopupActive(prev => !prev)
    setId(id)
    // console.log(id)
  }

  return (
    <div className="flex flex-col w-full gap-4 ">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">👋Hi, {user?.name}</h3>{" "}
      </div>
      <div className="md:flex gap-4 w-full">
        {snippets?.map((code, index) => (
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
              <h2 className="pt-2 font-semibold">{code.title}</h2>
              <div className="flex items-center justify-between">
                <span className="py-2">{code.price} FCFA</span>
                <span>{code.rating} stars</span>
              </div>
            </div>
            {status === "true" ? <p className="bg-yellow-200 text-[10px] w-fit">Reviewed</p> : ""}
            <Button
              label="Add a review"
              color="bg-[#f94d1c]"
              text="text-white"
              onClick={() => handleReview(code.id)}
            />
          </div>
        ))}
      </div>
      {popupActive && (
        <>
          <Overlay
            transparent={false}
            onClick={() => setPopupActive((prev) => !prev)}
          />
          <div className="fixed h-fit z-[80] bg-white  flex gap-5 flex-col top-[15%] w-[95%] md:left-[33%] shadow-md p-4 md:w-[550px] m-auto mobile:max-sm:w-[90vw] mobile:max-sm:left-2 mobile:max-sm:right-2">
            <span
              className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit "
              onClick={() => setPopupActive((prev) => !prev)}
            >
              <IoMdClose />
            </span>
            <ReviewForm giveStatus={getStatusFromChild} ID={id}/>

          </div>
        </>
      )}
      <div className="flex flex-col gap-4">
        <h3 className="font-semibold text-lg">Transaction History</h3>
        <div className="w-full">
          {(transactionData?.length)
            ?
            <Transactions transaction={transactionData} />
            :
            <p className="italic font-mono">No transaction done yet</p>}
        </div>
      </div>
      <div className=" w-full">
        <h3 className="font-semibold pb-4 text-lg">Upload History</h3>
        {(uploads?.length)
          ?
          <UploadedCode uploaded={uploads} />
          :
          <p className="italic font-mono">No upload has been done yet. <Link className="text-blue-500 hover:underline" href="/dashboard/upload">Upload Snippet</Link> </p>}
      </div>
    </div>
  );
}
