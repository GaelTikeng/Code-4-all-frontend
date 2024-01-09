"use client"
import Navbar from "@/components/molecules/navbar";
import Footer from "@/components/organisms/footer";
import React from "react";
import LoginForm from "@/components/molecules/loginComponent";

type Props = {}

export default function Signup ({}: Props) {
  return (
    <div>
      <Navbar/>
      <LoginForm/>
      <div className="fixed w-full bottom-0">
        <Footer />
      </div>
    </div>
  )
}