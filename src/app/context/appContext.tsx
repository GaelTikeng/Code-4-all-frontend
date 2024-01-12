"use client"
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Code, Review, User } from "../../../types";
import { findAllReviews, getAllSnippets } from "@/utiles/service/queries";


interface DataType {
  allCode: Code[];
  clicked: Boolean;
  setClicked: Dispatch<SetStateAction<Boolean>>;
  setAllClicked: Dispatch<SetStateAction<Boolean>>;
  allClicked: Boolean;
  setAllCode: Dispatch<SetStateAction<Code[]>>;
  allReviews: Review[];
  setAllReviews: Dispatch<SetStateAction<Review[]>>;
  searchRes: Code[];
  setSearchRes: Dispatch<SetStateAction<Code[]>>;
}

const AppContext = createContext<DataType | null>(null);

export const AppContextProvider = ({ children }: any) => {

  const [allCode, setAllCode] = useState<Code[]>([])
  const [searchRes, setSearchRes] = useState<Code[]>([]);
  const [review, setReview] = useState<Review[] | null>(null)
  const [isLoading, setIsLoading] = useState<Boolean>(false)
  const [clicked, setClicked] = useState<Boolean>(false)
  const [allClicked, setAllClicked] = useState<Boolean>(false)
  const [allReviews, setAllReviews] = useState<Review[]>([])

  // do all the queries in a useEffect
  useEffect(() => {
    setIsLoading(true)
    setAllClicked(true)
    getAllSnippets()
      .then((res) => {
        console.log("all codes", res)
        setAllCode(res)
        setIsLoading(prev => !prev)
      })
      .catch((error) => {
        console.log('fail to fetch codes snippets', error)
      })

    findAllReviews()
      .then((res) => {
        console.log("all reviews", res)
        setReview(res)
      })
      .catch((error) => {
        console.log('error due to review', error)
      })

  }, [])
  
  return (
    <AppContext.Provider value={{
      allCode,
      setAllCode,
      allReviews,
      setAllReviews,
      clicked,
      setClicked,
      allClicked,
      setAllClicked,
      searchRes,
      setSearchRes,
    }}>{children}</AppContext.Provider>);
}
export const useAppContext = () => useContext(AppContext) as DataType;