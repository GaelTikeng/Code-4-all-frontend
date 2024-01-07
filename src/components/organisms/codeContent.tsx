"use client"
import React, { useState } from "react";
import CodeCard from "../molecules/codeCard";
import Carousel from "react-multi-carousel";
import { Code, Test } from "../../../types";
import { getCodeById } from "@/utiles/service/queries";
import { toast } from "react-toastify";
import Pulsation from "../atoms/pulsation";

type Props = {
  snippets: Code[]
}

export default function Codes({ snippets }: Props) {

  const cartSnippets: Code[] = []

  const handleClick = async (id: string) => {
    await getCodeById(id)
      .then((data) => {
        localStorage.setItem('codeSnippet', JSON.stringify(data))
        cartSnippets.push(data)
        toast.success("Added to cart", {
          position: "top-right",
          hideProgressBar: true,
          autoClose: 1000,
        });
        localStorage.setItem('codeArray', JSON.stringify(cartSnippets))
        console.log('this is snippet', data)
      })
      .catch((err) => {
        console.log("could not get snippet", err)
      })
    console.log(cartSnippets)
  }

  const handleDetail = (id: string) => {
    console.log(id)
  }

  return (
    <div className="md:px-[80px] px-[20px] flex gap-6 flex-wrap">
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
    </div>
  )
}