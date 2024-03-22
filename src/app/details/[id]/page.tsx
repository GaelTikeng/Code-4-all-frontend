"use client"
import Navbar2 from "@/components/molecules/navbar2";
import Footer from "@/components/organisms/footer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Code, Review } from "../../../../types";
import { findCodeById, getReviewByCodeId } from "@/utiles/service/queries";
import Image from "next/image";
import Loader from "@/components/atoms/loader";
import ReviewCart from "@/components/organisms/reviewCart";
import Link from "next/link";
import PageDetailSkeleton from "@/components/molecules/pageDetailSkeleton";
import { useAppContext } from "@/app/context/appContext";


function DetailPage() {
  const { allCode } = useAppContext()
  const param = useParams()
  // const [codeDetail, setCodeDetail] = useState<Code>()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)


  const fetchData = async (id: string | string[]) => {
    setIsLoading(true)
    setLoading(true)

    await getReviewByCodeId(id)
      .then((res) => {
        console.log("all review", res)
        setReviews(res)
        setIsLoading((prev: Boolean) => !prev)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const codeDetails = allCode.find((item) => item.id === param.id)

  useEffect(() => {
    fetchData(param.id)
  }, [param.id])

  return (
    <div className="">
      <Navbar2 />
      <div className="w-[90%] md:max-w-[60%] gap-5 py-6 mx-auto">
        <Link className="text-[#f94d1c] hover:underline" href="/">Go back</Link>
        {codeDetails ?
          <div className="pt-5 md:flex gap-5 ">
            <Image
              src="https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"
              alt="zip file image"
              className="border shadow hover:cursor-pointer"
              width={250}
              height={250}
              loading="lazy"
            />
            <div className="my-auto">
              <h1 className="font-bold text-xl pb-2 ">{codeDetails?.title}</h1>
              <p className="text-xs text-gray-400 ">By {codeDetails?.user.name}</p>
              <p>{codeDetails?.rating} stars</p>
              <p className="pb-2"> Category: <span className="pb-2 font-semibold text-lg">{codeDetails?.category}</span></p>
              <p className="pb-2"> Programming language: <span className="pb-2 font-semibold text-lg">{codeDetails?.programming_language}</span></p>
              <h3 className="text-lg text-[#f94d1c] font-extrabold pb-2">{codeDetails?.price} FCFA</h3>
              <p className="pb-2">Description: {codeDetails?.description}</p>
            </div>
          </div>
          :
          <PageDetailSkeleton />
        }

        <h2 className="font-semibold text-xl text-center py-5">Reviews of professionals</h2>
        <div className="md:grid md:grid-cols-2 p-4 gap-4 ">
          {reviews.length ? reviews.map((data) => (
            <ReviewCart
              key={data.id}
              name={data.user.name}
              createdAt={data.createdAt}
              review={data?.review}
              rating={data.rating}
            />
          )) : <p className="italic font-mono text-center w-full">This code snippet has not yet been reviewed</p>}
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default DetailPage