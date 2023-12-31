"use client"
import Navbar from "@/components/molecules/navbar";
import Footer from "@/components/organisms/footer";
import React from "react";
import SignupForm from "@/components/molecules/signupComponent";

type Props = {}

export default function Signup ({}: Props) {
  return (
    <div>
      <Navbar/>
      <SignupForm/>
      <Footer/>
    </div>
  )
}