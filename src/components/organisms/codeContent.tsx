"use client"
import React, { useEffect, useState } from "react";
import { Code } from "../../../types";
import { toast } from "react-toastify";
import Overlay from "../atoms/overlay";
import { IoMdClose } from "react-icons/io";
import CartPopup from "./cartPopup";
import { useRouter, useParams } from "next/navigation";
import CodeCard from "../molecules/codeSnippetCard";
import { SearchParamsContext } from "next/dist/shared/lib/hooks-client-context.shared-runtime";
import PaginationControler from "../molecules/pagination";
import { useAppContext } from "@/app/context/appContext";

type Props = {
  snippets: Code[]
}

export default function Codes({ snippets }: Props) {
  const { allCode, searchRes, setAllCode } = useAppContext()
  const router = useRouter()
  const searchParams = useParams()
  const [popupActive, setPopupActive] = useState<Boolean>(false)
  const [codeObject, setCodeObject] = useState<Code | null>();

  const [displayData, setDisplayData] = useState<Code[]>(allCode || searchRes || [])

  const cartSnippets: Code[] = []

  const page = searchParams['page'] ?? '1'

  const per_page = searchParams['per_page'] ?? '15'

  const start = (Number(page) - 1) * Number(per_page)

  const end = start + Number(per_page)

  const entries = displayData?.slice(start, end)

  const handleClick = (item: Code) => {
    cartSnippets.push(item)
    localStorage.setItem('codeArray', JSON.stringify(cartSnippets))
    toast.success("Added to cart", {
      position: "top-right",
      hideProgressBar: true,
      autoClose: 1000,
    });
  }

  const handleDetail = (id: string) => {
    router.push(`/details/${id}`)
    console.log(id)
  }

  useEffect(() => {
    if (searchRes.length > 0) setDisplayData(searchRes);
    else setDisplayData(allCode);
  }, [allCode, searchRes])

  return (
    <div className="pb-8">
      <div className="md:px-[80px] px-[20px] py-8 flex gap-6 flex-wrap">
        {entries?.map((item, index) => (
          <CodeCard
            key={index}
            title={item.title}
            author={item.user.name}
            rating={item.rating}
            price={item.price}
            onClick={() => handleClick(item)}
            handleDetail={() => handleDetail(item.id)}
          />
        ))}

        {popupActive && (
          <>
            <Overlay
              transparent={false}
              onClick={() => setPopupActive((prev) => !prev)}
            />
            <div className="fixed h-[50vh] z-[80] bg-white  flex gap-5 flex-col top-[15%] w-[95%] md:left-[33%] shadow-md p-4 md:w-[550px] m-auto mobile:max-sm:w-[90vw] mobile:max-sm:left-2 mobile:max-sm:right-2">
              <span
                className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit "
                onClick={() => setPopupActive((prev) => !prev)}
              >
                <IoMdClose />
              </span>
              <CartPopup
                title={codeObject?.title}
                name={codeObject?.user.name}
                rating={codeObject?.rating}
                price={codeObject?.price}
              />
            </div>
          </>
        )}
      </div>
      <PaginationControler hasNextPage={start >= 0} hasPrevPage={end < 100} snippets={displayData} />
    </div>
  )
}