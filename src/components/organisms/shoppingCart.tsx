"use client"
import React from "react";
import ShopCodeCart from "../molecules/shopCodeCart";
import { allCode } from "./codeContent";
import { Code, Test } from "../../../types";
import { totalPrice } from "@/utiles/function";
import Button from "../atoms/button";

type Props = {
  codeCart: Test[]
}

export default function ShoppingCart({ codeCart }: Props) {

  const handleRemove = (id: string) => { }

  const handleCheckOut = () => { }

  return (
    <div className="md:w-2/3 full px-5 mx-auto py-8">
      <h1 className="text-3xl font-bold ">Shopping Cart</h1>
      <p className="font-bold pt-4 ">{codeCart.length} Code snippets in cart</p>

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
          {codeCart.map((item) => (
            <ShopCodeCart
              key={item.id}
              title={item.title}
              price={item.price}
              author={item.author}
              rating={item.rating}
            // onClick={handleRemove(item.id)}
            />
          ))}
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
      </div>

    </div>
  )
}