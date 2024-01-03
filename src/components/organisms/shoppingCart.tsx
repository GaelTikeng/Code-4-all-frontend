"use client"
import React, { useState } from "react";
import ShopCodeCart from "../molecules/shopCodeCart";
import { allCode } from "./codeContent";
import { Code, Test, User } from "../../../types";
import { totalPrice } from "@/utiles/function";
import Button from "../atoms/button";
import Link from "next/link";
import Overlay from "../atoms/overlay";
import { IoMdClose } from "react-icons/io";
import SignupFormb from "../molecules/signupComp";
import LoginFormb from "../molecules/loginComp";
import { useRouter } from "next/navigation";



type Props = {
  codeCart: Test[]
}

export default function ShoppingCart({ codeCart }: Props) {
  const router = useRouter()
  const [openPopup, setOpenPopup] = useState<Boolean>(false)
  const [showForm, setShowForm] = useState<Boolean>(false)
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
  const [snippets, setSnippets] = useState<Code[] | undefined>(
    (): Code[] | undefined => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage = JSON.parse(localStorage.getItem("codeArray") as string) || [];
        if (fromLocalStorage) return fromLocalStorage;
      }
      return undefined;
    }
  )

  const handleRemove = (id: string) => {
    const newCodesInCart: Code[] | undefined = snippets?.filter((item) => item.id !== id)
    setSnippets(newCodesInCart)
    localStorage.setItem('codeArray', JSON.stringify(newCodesInCart))
    console.log('rest', snippets)
  }

  const handleCheckOut = () => {
    if (user?.name) {
      router.push('/checkout')
    } else {
      setOpenPopup((prev) => !prev)
    }
  }

  const handleShowForm = () => {
    setShowForm(prev => !prev)
  }

  return (
    <div className="md:w-2/3 w-full px-5 mx-auto py-8">
      <h1 className="text-3xl font-bold ">Shopping Cart</h1>
      <p className="font-medium pt-4 ">{snippets?.length} Code snippet(s) in cart</p>

      <div className="md:flex gap-10 justify-between">
        <div className="md:w-[30%] md:hidden">
          <p className="text-gray-700 font-bold ">Total:</p>
          <p className="font-bold py-4 text-xl">{totalPrice(snippets)} FCFA</p>
          <Button
            label="Checkout"
            color="bg-[#f94d1c]"
            text="text-white"
            onClick={() => handleCheckOut()}
          />
        </div>
        <div className="py-4 w-full">
          {snippets ? snippets?.map((item) => (
            <ShopCodeCart
              key={item.id}
              title={item.title}
              price={item.price}
              author={item.author}
              rating={item.rating}
              onClick={() => handleRemove(item.id)}
            />
          )) : <p className="m-auto">No code added to cart. <Link href="/">Browse code snippets</Link> </p>}
        </div>
        {snippets ?
          <div className="hidden md:flex md:flex-col md:w-[30%]">
            <p className="text-gray-700 font-bold ">Total:</p>
            <p className="font-bold py-4 text-xl">{totalPrice(snippets)} FCFA</p>
            <Button
              label="Checkout"
              color="bg-[#f94d1c]"
              text="text-white"
              onClick={() => handleCheckOut()}
            />
          </div>
          : ""}
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
              <div>
                {!showForm && (
                  <SignupFormb onClick={() => handleShowForm()} />
                )}
              </div>
              <div>
                {showForm && (
                  <LoginFormb onClick={() => handleShowForm()} handleClose={handleCheckOut} />
                )}
              </div>

            </div>
          </>
        )}

      </div>

    </div>
  )
}