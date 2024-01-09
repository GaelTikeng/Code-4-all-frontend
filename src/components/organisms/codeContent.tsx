"use client"
import React, { useState } from "react";
import { Code, Test } from "../../../types";
import { getCodeById } from "@/utiles/service/queries";
import { toast } from "react-toastify";
import Overlay from "../atoms/overlay";
import { IoMdClose } from "react-icons/io";
import CartPopup from "./cartPopup";
import { useRouter } from "next/navigation";
import CodeCard from "../molecules/codeSnippetCard";

type Props = {
  snippets: Code[]
}

export default function Codes({ snippets }: Props) {
  const router = useRouter()
  const [popupActive, setPopupActive] = useState<Boolean>(false)
  const [codeObject, setCodeObject] = useState<Code | null>()


  const cartSnippets: Code[] = []

  const handleClick = async (id: string) => {
    await getCodeById(id)
      .then((data) => {
        cartSnippets.push(data)
        localStorage.setItem('codeSnippet', JSON.stringify(data))
        // setPopupActive(prev => !prev)
        
        toast.success("Added to cart", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 1000,
        });
        localStorage.setItem('codeArray', JSON.stringify(cartSnippets))
        console.log('this is snippet', data)
        // setCodeObject(data)
      })
      .catch((err) => {
        console.log("could not get snippet", err)
      })
    
    console.log(cartSnippets)
  }

  const handleDetail = (id: string) => {
    router.push(`/details/${id}`)
    console.log(id)
  }

  return (
    <div className="md:px-[80px] px-[20px] py-8 flex gap-6 flex-wrap">
      {snippets?.map((item, index) => (
        <CodeCard
          key={index}
          title={item.title}
          author={item.user.name}
          rating={item.rating}
          price={item.price}
          onClick={() => handleClick(item.id)}
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
  )
}