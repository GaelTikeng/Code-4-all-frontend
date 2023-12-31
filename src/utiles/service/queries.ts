import { User } from "../../../types";
import { BASE_URL } from "./constant";
import ApiCall from "./httpClient";

const apiCall = new ApiCall();

// CREATE USER
export const createUser = async (user: Partial<User>) => {
  return apiCall.POST(BASE_URL + "/users", user);
};

// GET USER BY EMAIL
export const loginFunction = async (payload: string) => {
  return apiCall.POST(BASE_URL + "/users/login", payload)
}

export const signUp = async (newUser: {
  name: string;
  email: string;
  password: string;
}) => {
  return await apiCall.POST(BASE_URL + "/users", newUser);
};