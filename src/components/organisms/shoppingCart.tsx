"use client"
import React, { useState } from "react";
import ShopCodeCart from "../molecules/shopCodeCart";
import { allCode } from "./codeContent";
import { Code, Test } from "../../../types";
import { totalPrice } from "@/utiles/function";
import Button from "../atoms/button";
import Link from "next/link";
import Overlay from "../atoms/overlay";
import SignupForm from "../molecules/signupComponent";
import { IoMdClose } from "react-icons/io";



type Props = {
  codeCart: Test[]
}

export default function ShoppingCart({ codeCart }: Props) {
  const [openPopup, setOpenPopup] = useState<Boolean>(false)

  const handleRemove = (id: string) => { }

  const handleCheckOut = () => {
    setOpenPopup((prev) => !prev)

  }

  return (
    <div className="md:w-2/3 full px-5 mx-auto py-8">
      <h1 className="text-3xl font-bold ">Shopping Cart</h1>
      <p className="font-medium pt-4 ">{codeCart.length} Code snippet(s) in cart</p>

      <div className="md:flex gap-10 justify-between">
        <div className="md:w-[30%] md:hidden">
          <p className="text-gray-700 font-bold ">Total:</p>
          <p className="font-bold py-4 text-xl">{totalPrice(codeCart)} FCFA</p>
          <Button
            label="Checkout"
            color="bg-[#f94d1c]"
            text="text-white"
            onClick={() => handleCheckOut()}
          />
        </div>
        <div className="py-4 w-[70%]">
          {codeCart ? codeCart?.map((item) => (
            <ShopCodeCart
              key={item.id}
              title={item.title}
              price={item.price}
              author={item.author}
              rating={item.rating}
            // onClick={handleRemove(item.id)}
            />
          )) : <p className="m-auto">No code added to cart. <Link href="/">Browse code snippets</Link> </p>}
        </div>
        <div className="hidden md:flex md:flex-col md:w-[30%]">
          <p className="text-gray-700 font-bold ">Total:</p>
          <p className="font-bold py-4 text-xl">{totalPrice(codeCart)} FCFA</p>
          <Button
            label="Checkout"
            color="bg-[#f94d1c]"
            text="text-white"
            onClick={() => handleCheckOut()}
          />
        </div>
        {openPopup && (
          <>
            <Overlay
              transparent={false}
              onClick={() => setOpenPopup((prev) => !prev)}
            />
            <div className="fixed z-[80] bg-white  flex gap-5 flex-col top-[15%] w-[90%] md:left-[33%] shadow-md p-4 md:w-[400px] m-auto mobile:max-sm:w-[90vw] mobile:max-sm:left-2 mobile:max-sm:right-2">
              <span
              className=" mr-0 cursor-pointer hover:bg-gray-300 rounded-full w-fit "
              onClick={() => handleCheckOut()}><IoMdClose /></span>
              <SignupForm />

            </div>

            {/* <Popups
              title={"Delete this chat?"}
              content={""}
              actionText={"Delete chat"}
              onCancel={() => setOnDelete((prev) => !prev)}
              onAction={() => handleDeleteChat()}
            /> */}
          </>
        )}

      </div>

    </div>
  )
}