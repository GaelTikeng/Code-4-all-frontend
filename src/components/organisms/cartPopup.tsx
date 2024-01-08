"use client"
import React from "react"
import Button from "../atoms/button"
import { useRouter } from "next/navigation";
import PaidCourse from "../molecules/paidCode";


interface Props {
  title: string | undefined,
  name?: string | undefined,
  rating: number | undefined,
  price: number | undefined
}

export default function CartPopup({ title, name, rating, price }: Props) {
  const router = useRouter()

  const handleClick = () => {
    router.push('/cart')
  }

  return (
    <div className="">
      <PaidCourse
        title={title}
        price={price}
        author={name}
        rating={rating}
      />
      <Button
        label="Go to cart"
        color="bg-[#f94d1c]"
        text="text-white"
        onClick={() => handleClick()}
      />
    </div>
  )
} 