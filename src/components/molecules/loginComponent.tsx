"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import GoogleButton from "../atoms/googleBtn";
import Button from "../atoms/button";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/utiles/service/constant";
import { useAppContext } from "@/app/context/appContext";
import { getAllSnippets, loginFunction } from "@/utiles/service/queries";
import { User } from "../../../types";

type Props = {}

export default function LoginForm({ }: Props) {
  const router = useRouter()
  const [success, setSuccess] = useState<String>("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<String>('')
  const [message, setMessage] = useState<String>('')

  const handleClick = async () => {
    setIsLoading(true)

    const credential: any = {
      email: email,
      password: password
    }

    // await getAllSnippets()
    //   .then((data) => {
    //     console.log("These are all snippets", data)
    //   })
    //   .catch((error) => console.log('this is error', error))

    await loginFunction(credential)
      .then((res) => {
        console.log(res)
        if (res.error) {
          setMessage("Invalid email or password")
          setIsLoading(false)
        } else if (res.name) {
          localStorage.setItem('userObject', JSON.stringify(res))
          setMessage('')
          setSuccess('Welcome back')
          setIsLoading((prev) => !prev)
          router.push('/dashboard')
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className="w-[85%] md:w-[300px] mx-auto px-4 my-6 leading-10">
      <div className="py-6">
        <Image
          src="/code4all.png"
          alt="logo"
          height={75}
          width={150}
          priority={false}

        />
      </div>
      <h1 className="text-[#f94d1c] text-xl font-semibold  pb-3">Log in your account</h1>

      <p className=" pb-4">Don't have an account?<Link href="/signup" className="text-blue-600">Signup now</Link></p>
      <GoogleButton />
      <div style={{ columnGap: "18px" }} className="flex mt-[18px] justify-between items-center font-sm ">
        <span className="block w-full h-[2px] bg-gray-300"></span>
        <span>OR</span>
        <span className="block w-full h-[2px] bg-gray-300"></span>
      </div>
      <div className="flex flex-col gap-4">
        {message ? <p className="bg-red-300 w-full py-3 text-xs">{message}</p> : ""}
        {success ? <p className="bg-green-300 py-3text-xs w-full">{success}</p> : ""}
        <input
          type="text"
          placeholder="Email"
          className="border rounded border-gray-300 px-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded border-gray-300 px-3 w-full"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          label={isLoading ? "Loading..." : "Login"}
          color="bg-[#f94d1c]"
          text="text-white"
          borderColor="border-gray-300"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  )
}