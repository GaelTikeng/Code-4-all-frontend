"use client"
import CommentCart from "@/components/molecules/commentCart";
import HeroSection from "@/components/molecules/heroSection";
import Navbar from "@/components/molecules/navbar";
import Codes from "@/components/organisms/codeContent";
import CommentCarousel from "@/components/organisms/commentCarousel";
import Footer from "@/components/organisms/footer";
import Discount from "@/components/organisms/newzletter";
import React, { useEffect, useState } from "react";
import { findAllReviews, getAllSnippets } from "@/utiles/service/queries";
import { Code, Review, User } from "../../types";
import Navbar2 from "@/components/molecules/navbar2";

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
      {(loader && snippets)? <Codes snippets={snippets} /> : <p className="h-[300px] text-center">Loading code snippets...</p>}

      {/* <div className="grid grid-cols-2">
        <CommentCart
          createdAt="12 jan 2032"
          name="gaelinho"
          comment="hello guys"
        />
        <CommentCart
          createdAt="12 jan 2032"
          name="gaelinho"
          comment="hello guys"
        />
      </div> */}
      <Discount />
      {/* <CarousselComment /> */}
      {(isLoading && review) ? <CommentCarousel reviews={review} />
        :
        <p
          style={{
            padding: "",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            // backgroundImage: "url(https://previews.123rf.com/images/monsitj/monsitj1702/monsitj170200006/72934082-code-de-programmation-technologie-abstrait-du-d%C3%A9veloppeur-de-logiciels-et-de-script-informatique.jpg)"
            backgroundImage: "linear-gradient(100deg, #f1f1f1bd, #e1e1e1c5), url(https://previews.123rf.com/images/monsitj/monsitj1702/monsitj170200006/72934082-code-de-programmation-technologie-abstrait-du-d%C3%A9veloppeur-de-logiciels-et-de-script-informatique.jpg)"
          }}
          className="my-auto text-center h-[400px]">Loading Reviews... </p>}
      <Footer />

    </div>
  )
}