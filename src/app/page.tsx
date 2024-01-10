"use client"
import CommentCart from "@/components/molecules/commentCart";
import HeroSection from "@/components/molecules/heroSection";
import Navbar from "@/components/molecules/navbar";
import Codes from "@/components/organisms/codeContent";
import CommentCarousel from "@/components/organisms/commentCarousel";
import Footer from "@/components/organisms/footer";
import Discount from "@/components/organisms/newzletter";
import React, { Suspense, useEffect, useState } from "react";
import { findAllReviews, getAllSnippets } from "@/utiles/service/queries";
import { Code, Review, User } from "../../types";
import Navbar2 from "@/components/molecules/navbar2";
import CarousselComment from "@/components/organisms/carouselComments";
import SkeletonCart from "@/components/molecules/codeSnippetSkeleton";
import SkeletonComment from "@/components/molecules/seletonComments";

export default function Home() {
  const [snippets, setSnippets] = useState<Code[] | null>(null)
  const [review, setReview] = useState<Review[] | null>(null)
  const [loader, setLoader] = useState<Boolean>(false)
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

  useEffect(() => {
    setIsLoading(true)
    setLoader(true)
    getAllSnippets()
      .then((res) => {
        console.log("all codes", res)
        setSnippets(res)
        setIsLoading(prev => !prev)
      })
      .catch((error) => {
        console.log('fail to fetch codes snippets', error)
      })

    findAllReviews()
      .then((res) => {
        console.log("all reviews", res)
        setReview(res)
        setLoader(prev => !prev)
      })
      .catch((error) => {
        console.log('error due to review', error)
      })

  }, [])

  return (
    <div>
      {user ? <Navbar2 /> : <Navbar />}
      <HeroSection />
      {snippets ? <Codes snippets={snippets} /> : <SkeletonCart/>}

      <Discount />
      {/* <CarousselComment /> */}
      {review ? <CommentCarousel reviews={review} />
        :
        <SkeletonComment/>
      }
      <Footer />

    </div>
  )
}