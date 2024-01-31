"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Button from "../atoms/button";
import { useRouter } from "next/navigation";
import { signUp } from "@/utiles/service/queries";
import GoogleBtn from "../atoms/googleButton";
import GithubBtn from "../atoms/githubButton";

type Props = {}

export default function SignupForm({ }: Props) {
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState("")
  const [success, setSuccess] = useState<String>("")
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [error, setError] = useState<String>("")

  const handleClick = async () => {
    if (name && email && password) {
      setError("")
      setIsLoading(true)
      signUp({
        name: name,
        email: email,
        password: password
      }).then((data) => {
        localStorage.setItem('userObject', JSON.stringify(data))
        console.log(data);
        setSuccess(`Welcome ${data.name} 🙂`);
        router.push("/dashboard");
        setIsLoading(false);
      }).catch((error) => {
        console.log(error)
      })
    } else {
      setError("Fill all fields")
    }
  }

  return (
    <div className="w-[85%] bg-white z-50 md:w-[400px] mx-auto px-4 my-6 leading-10">
      <div className="py-6 flex justify-center">
        <Image
          src="/code4all.png"
          alt="logo"
          height={75}
          width={150}
          priority={false}

        />
      </div>
      <h1 className="text-[#f94d1c] text-center text-xl font-semibold  pb-3">Create your account</h1>

      <p className="text-center pb-4">Have an account?<Link href="/login" className="text-blue-600">Log in now</Link></p>
      {/* <GoogleButton /> */}
      <GoogleBtn/>
      <GithubBtn/>
      <div style={{ columnGap: "18px" }} className="flex mt-[18px] justify-between items-center font-sm ">
        <span className="block w-full h-[2px] bg-gray-300"></span>
        <span className="italic font-mono">OR</span>
        <span className="block w-full h-[2px] bg-gray-300"></span>
      </div>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          className="border rounded border-gray-300 px-3 w-full"
          onChange={(e) => setName(e.target.value)}
        />
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
        {success ? <p className="text-green-500 text-center">{success}</p> : ""}
        {error ? <p className="text-red-500 text-center">{error}</p> : ""}
        <Button
          label={isLoading ? "Loading..." : "Signup"}
          color="bg-[#f94d1c]"
          text="text-white"
          borderColor="border-gray-300"
          onClick={() => handleClick()}
        />
      </div>
    </div>
  )
}