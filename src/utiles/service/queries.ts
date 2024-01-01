import { PostponedPathnameNormalizer } from "next/dist/server/future/normalizers/request/postponed";
import { Code, User } from "../../../types";
import { BASE_URL } from "./constant";
import ApiCall from "./httpClient";
import { IoIosTabletLandscape } from "react-icons/io";

const apiCall = new ApiCall();

// CREATE USER
export const createUser = async (user: Partial<User>) => {
  return apiCall.POST(BASE_URL + "/users", user);
};

// GET USER BY EMAIL
export const loginFunction = async (payload: string) => {
  return apiCall.POST(BASE_URL + "/users/login", payload)
}

// SIGNUP FUNCTION (POST REQUEST)
export const signUp = async (newUser: {
  name: string;
  email: string;
  password: string;
}) => {
  return await apiCall.POST(BASE_URL + "/users", newUser);
};

// CREATE PURCHASE (POST REQUEST)
export const createPurchase = async (purchase: {
  code_id: string[],
  quantity: number,
  total_amount: number,
  buyer_id: number
}) => {
  return await apiCall.POST(BASE_URL + "purchases", purchase)
}

// GET ALL PURCHASES
export const getAllPurchases = async () => {
  return await apiCall.GET(BASE_URL + "puchases")
}

// { END POINTS FOR CODE TABLE }
// CREATE CODE (POST)
export const createCode = async(code: Code) => {
  return await apiCall.POST(BASE_URL + "code", code)
} 