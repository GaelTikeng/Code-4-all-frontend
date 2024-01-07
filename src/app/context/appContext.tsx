"use client"
import React, { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { Code, Review, User } from "../../../types";
import { getAllSnippets } from "@/utiles/service/queries";


interface DataType {
  allCode: Code[];
  setAllCode: Dispatch<SetStateAction<Code[]>>;
  allReviews: Review[];
  setAllReviews: Dispatch<SetStateAction<Review[]>>;
}

const initialState: DataType = {
  allCode: [],
  setAllCode: () => [],
  allReviews: [],
  setAllReviews: () => [],
};

const AppContext = createContext<DataType>(initialState);

export const AppContextProvider = ({ children }: any) => {

  const [allCode, setAllCode] = useState<Code[]>([])
  const [allReview, setAllReview] = useState<Review[]>([])

  const values = {
    allCode,
    setAllCode,
    allReview,
    setAllReview
  }

  // do all the queries in a useEffect
  

  return <AppContextProvider value={values}>{children}</AppContextProvider>;
}
export const useAppContext = () => useContext(AppContext);