import React, { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { Code, Review, User } from "../../../types";




interface DataType {
  currentUser: User;
  setCurrentUser: Dispatch<SetStateAction<User>>;
  allCode: Code[];
  setAllCode: Dispatch<SetStateAction<Code[]>>;
  allReviews: Review[];
  setAllReviews: Dispatch<SetStateAction<Review[]>>;
}

const initialState: DataType = {
  currentUser: {
    id: "",
    name: "",
    email: "",
    phone: "",
    image: ""
  },
  setCurrentUser: () => {},
  allCode: [],
  setAllCode: () => [],
  allReviews: [],
  setAllReviews: () => [],
};

const AppContext = createContext<DataType>(initialState);

export const AppContextProvider = ({children}: any) => {
  const [currentUser, setCurrentUser] = useState<User>(
    initialState.currentUser
  );

  const [allCode, setAllCode] = useState<Code[]>([])
  const [allReview, setAllReview] = useState<Review[]>([])

  const values = {
    currentUser,
    setCurrentUser,
    allCode,
    setAllCode,
    allReview,
    setAllReview
  }

  // do all the queries in a useEffect


  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
export const useAppContext = () => useContext(AppContext);