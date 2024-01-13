"use client"
import CommentCart from "@/components/molecules/commentCart";
import HeroSection from "@/components/molecules/heroSection";
import Navbar from "@/components/molecules/navbar";
import Codes from "@/components/organisms/codeContent";
import CommentCarousel from "@/components/organisms/commentCarousel";
import Footer from "@/components/organisms/footer";
import Discount from "@/components/organisms/newzletter";
import React, { Suspense, useEffect, useState } from "react";
import { findAllReviews, findCodeByCategory, getAllSnippets } from "@/utiles/service/queries";
import { Code, Review, User } from "../../types";
import Navbar2 from "@/components/molecules/navbar2";
import CarousselComment from "@/components/organisms/carouselComments";
import SkeletonCart from "@/components/molecules/codeSnippetSkeleton";
import SkeletonComment from "@/components/molecules/seletonComments";
import { useAppContext } from "./context/appContext";

export default function Home() {
  const { allCode, allReviews, setAllCode, allClicked, clicked, setAllClicked, setClicked } = useAppContext()
  const [snippets, setSnippets] = useState<Code[] | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
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



  const category = [{ category: "Frontend" }, { category: "Backend" }]

  const getCodeByCategory = async (cat: string) => {
    setClicked(prev => !prev)
    setAllClicked(false)
    await findCodeByCategory(cat)
      .then((res) => {
        console.log('code by category', res)
        setAllCode(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const getAllCode = async () => {
    setClicked(prev => !prev)
    setAllClicked(true)
    getAllSnippets()
      .then((res) => {
        console.log("all codes", res)
        setAllCode(res)
        setIsLoading(prev => !prev)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      {user ? <Navbar2 /> : <Navbar />}
      <HeroSection />
      <div className="flex mt-3 w-[90%] mx-auto pb-2 gap-6">
        <div onClick={() => getAllCode()}>
          <h2 className={`font-semibold ${allClicked ? 'text-black' : 'text-gray-500'} hover:text-black hover:cursor-pointer text-[16px]`}>All</h2>
        </div>
        {category.map((cat, i) => (
          <div key={i} onClick={() => getCodeByCategory(cat.category)}>
            <h2 className={`font-semibold ${clicked ? 'text-black' : 'text-gray-500'} hover:text-black hover:cursor-pointer text-[16px]`}>{cat.category}</h2>
            {/* <p className="h-2 bg-grren-300">.</p> */}
          </div>
        ))}
      </div>
      <hr className="w-[90%] mx-auto"></hr>
      {allCode?.length ? <Codes snippets={allCode} /> : <SkeletonCart />}

      <Discount />
      {/* <CarousselComment /> */}
      {allReviews ? <CommentCarousel reviews={allReviews} />
        :
        <SkeletonComment />
      }
      <Footer />

    </div>
  )
}