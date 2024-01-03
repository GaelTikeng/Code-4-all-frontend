"use client"
import CodeCard from "@/components/molecules/codeCard";
import CommentCart from "@/components/molecules/commentCart";
import HeroSection from "@/components/molecules/heroSection";
import LoginForm from "@/components/molecules/signupComponent";
import Navbar from "@/components/molecules/navbar";
import CarousselComment from "@/components/organisms/carouselComments";
import Codes from "@/components/organisms/codeContent";
import CommentCarousel from "@/components/organisms/commentCarousel";
import Footer from "@/components/organisms/footer";
import Discount from "@/components/organisms/newzletter";
import React, { useEffect, useState } from "react";
import { getAllSnippets } from "@/utiles/service/queries";
import { Code } from "../../types";
// import Login from "./signup/page";

export default function Home() {
  const [snippets, setSnippets] = useState<Code[]>([])

  useEffect(() => {
    getAllSnippets()
      .then((res) => {
        console.log("all codes", res)
        setSnippets(res)
      })
      .catch((error) => {
        console.log('fail to fetch codes snippets', error)
      })
  }, [])

  return (
    <div>
      <Navbar />
      <HeroSection />
      <Codes snippets={snippets} />

      <div className="grid grid-cols-2">
        <CommentCart
          image="/image3.jpg"
          createdAt="12 jan 2032"
          name="gaelinho"
          comment="hello guys"
        />
        <CommentCart
          image="/image3.jpg"
          createdAt="12 jan 2032"
          name="gaelinho"
          comment="hello guys"
        />
      </div>
      <Discount />
      {/* <CarousselComment /> */}
      <CommentCarousel />
      <Footer />

    </div>
  )
}