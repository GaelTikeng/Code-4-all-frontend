"use client"
import Navbar2 from "@/components/molecules/navbar2";
import Footer from "@/components/organisms/footer";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import CodeDetails from "@/components/organisms/reviewCart";
import { Code, Review } from "../../../../types";
import { findCodeById, getReviewByCodeId } from "@/utiles/service/queries";
import Image from "next/image";
import Loader from "@/components/atoms/loader";
import ReviewCart from "@/components/organisms/reviewCart";



function DetailPage() {
  const param = useParams()
  const [codeDetail, setCodeDetail] = useState<Code>()
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [loading, setLoading] = useState<Boolean>(false)


  const fetchDatas = async (id: string | string[]) => {
    setIsLoading(true)
    setLoading(true)

    await getReviewByCodeId(id)
      .then((res) => {
        console.log("all review", res)
        setReviews(res)
        setIsLoading(prev => !prev)
      })
      .then((error) => [
        console.log(error)
      ])

    await findCodeById(id)
      .then((res) => {
        console.log('this is code detail', res)
        setCodeDetail(res)
        setLoading(prev => !prev)
      })
      .catch((error) => {
        console.log("error while fetching code object", error)
      })
  }

  useEffect(() => {
    fetchDatas(param.id)
  }, [])

  const data = [{
    id: '1',
    name: "Gael T",
    rating: 4,
    createdAt: "2024/01/2336",
    review: "MY RATING asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,",
  }, {
    id: '2',
    name: "Gael T",
    rating: 2,
    createdAt: "2024/01/2336",
    review: "MY RATING  asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,",
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATIN  asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,G",
    rating: 1,
    createdAt: "2024/01/2336",
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATIN GATIN  asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,G",
    createdAt: "2024/01/2336",
    rating: 1,
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATING",
    createdAt: "2024/01/2336",
    rating: 1,
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATIN ATIN  asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,GG",
    createdAt: "2024/01/2336",
    rating: 1,
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATIN  ATIN  asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,GG ",
    createdAt: "2024/01/2336",
    rating: 1,
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATING fnfchgnlfmbldfg bxdfgbd fglkbnfg bdgbn d gbdsfbnlsdfkb/dsf blds fb.mdf bnslfdb sdfblsfnb zlsf",
    createdAt: "2024/01/2336",
    rating: 1,
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATING",
    createdAt: "2024/01/2336",
    rating: 1,
  }, {
    id: '1',
    name: "Gael T",
    review: "MY RATIN  ATIN  asdv sadv,jb sakjvn,sdvk.jasbdvkj as,dv.sbdvkjbs,v ksbdvkjsdbv,. sadkvbas,.d nvasdbvn, asda vkjsaddkgv ksduvksadvbkads,GG",
    createdAt: "2024/01/2336",
    rating: 1,
  }]

  return (
    <div className="">
      <Navbar2 />
      <div className="w-[90%] md:max-w-[60%] gap-5 py-6 mx-auto">
        <div className=" md:flex gap-5 ">
          <Image
            src="https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"
            alt="zip file image"
            className="border shadow hover:cursor-pointer"
            width={250}
            height={250}
            loading="lazy"
          />
          <div className="">
            <h1 className="font-bold text-xl pb-5 ">{codeDetail?.title}</h1>
            <p className="text-xs text-gray-400 b-5">By {codeDetail?.user.name}</p>
            <p>{codeDetail?.rating} stars</p>
            <p className="pb-5"> Programming language: <span className="pb-5 font-semibold text-lg">{codeDetail?.programming_language}</span></p>
            <h3 className="text-sm font-extrabold pb-2">{codeDetail?.price} FCFA</h3>
            <p className="pb-5">{codeDetail?.description}</p>
          </div>


        </div>
        <h2 className="font-semibold text-xl text-center py-5">Reviews of professionals</h2>
        <div className="md:grid md:grid-cols-2 p-4 gap-4 ">
          {(data.length && isLoading) ? data.map((data) => (
            <ReviewCart
              key={data.id}
              name={data.name}
              createdAt={data.createdAt}
              review={data?.review}
            />
          )) : <p className="italic font-mono">This code snippet has not yet been reviewed</p>}
        </div>
      </div>

      <Footer />
    </div>
  )
}
export default DetailPage