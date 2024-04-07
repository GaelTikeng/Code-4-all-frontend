"use client"
import Image from "next/image";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import Button from "../atoms/button";
import { useRouter } from "next/navigation";
import { loginFunction } from "@/utiles/service/queries";
import GoogleBtn from "../atoms/googleButton";
import GithubBtn from "../atoms/githubButton";

type Props = {}

export default function LoginForm({ }: Props) {
  const router = useRouter()
  const [success, setSuccess] = useState<String>("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState<String>('')
  const [message, setMessage] = useState<String>('')

  const handleClick = async () => {
    const credential: any = {
      email: email,
      password: password
    }

    if (email && password) {
      setIsLoading(true)
      setMessage('')
      await loginFunction(credential)
        .then((res) => {
          // console.log(res)
          if (res.error) {
            setMessage("Invalid email or password")
            setIsLoading(false)
          } else if (res.name) {
            localStorage.setItem('userObject', JSON.stringify(res))
            setMessage('')
            setSuccess('Welcome back')
            setIsLoading((prev) => !prev)
            router.push('/')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    } else {
      setMessage("Fill all fields")
    }
  }

  return (
    <div className="w-[85%] md:w-[400px] mx-auto px-4 my-6 leading-10">
      <div className="py-6 flex justify-center">
        <Image
          src="/code4all.png"
          alt="logo"
          height={75}
          width={150}
          priority={false}
        />
      </div>
      <h1 className="text-[#f94d1c] text-center text-xl font-semibold  pb-3">Log in your account</h1>
      <p className=" pb-4 text-center">Dont have an account?<Link href="/signup" className="text-blue-600">Signup now</Link></p>
      <GoogleBtn/>
      <GithubBtn/>
      <div style={{ columnGap: "18px" }} className="flex mt-[18px] justify-between items-center font-sm ">
        <span className="block w-full h-[2px] bg-gray-300"></span>
        <span className="italic">OR</span>
        <span className="block w-full h-[2px] bg-gray-300"></span>
      </div>
      <form onSubmit={handleClick} className="flex flex-col gap-4">
        {message ? <p className="bg-red-300 text-center w-full py-3 text-xs">{message}</p> : ""}
        {success ? <p className="bg-green-300 text-center py-3text-xs w-full">{success}</p> : ""}
        <input
          type="email"
          placeholder="Email"
          name="email"
          className="border rounded border-gray-300 px-3 w-full"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
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
      </form>
    </div>
  )
}