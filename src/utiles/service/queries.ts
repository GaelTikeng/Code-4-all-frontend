import { PostponedPathnameNormalizer } from "next/dist/server/future/normalizers/request/postponed";
import { Code, Review, User } from "../../../types";
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
  code_id: string[] | undefined,
  quantity: number | undefined,
  total_amount: any,
  buyer_id: string | undefined
}) => {
  return await apiCall.POST(BASE_URL + "/purchases", purchase)
}

// GET ALL PURCHASES
export const getAllPurchases = async () => {
  return await apiCall.GET(BASE_URL + "puchases")
}
 
// GET PURCHASES PER BUYER
export const getPurchasesPerBuyer = async (id: string | undefined) => {
  return await apiCall.GET(BASE_URL + `/purchases/${id}`)
}
// export const getPurchasesPerBuyer = async (id: string | undefined) => {
//   try {
//     const response = await fetch(
//       BASE_URL + `/purchases/${id}`,
//       {
//         // next: { revalidate: 900 }, // function will be excuted after 5 mintes
//         method: "GET",
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Failed to get all snippets");
//     }
//     return response.json()
//     // return data

//   } catch (error) {
//     console.error(error);
//   }
// }

// { END POINTS FOR CODE TABLE }
// CREATE CODE (POST)
export const createCode = async (code: {
  user_id: string | undefined,
  title: string,
  description: string,
  price: number,
  code_file: string,
  programming_language: string,
  category: string,

}) => {
  return await apiCall.POST(BASE_URL + "/code", code)
}

// GET ALL CODE SNIPPETS
export const getAllSnippets = async () => {
  try {
    const response = await fetch(
      BASE_URL + `/code`,
      {
        next: { revalidate: 300 }, // function will be excuted after 5 mintes
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get all snippets");
    }
    const data = response.json();
    return data

  } catch (error) {
    console.error(error);
  }

}

// GET CODE SNIPPET BY ID
export const getCodeById = async (id: string | undefined) => {
  // console.log('from fxn', id)
  try {
    const response = await fetch(
      BASE_URL + `/code/${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get all snippets");
    }
    const data = response.json();
    return data

  } catch (error) {
    console.error(error);
  }
}

// DUPLICATE Did this duplicate bcz of types was disturbing
export const findCodeById = async (id: string | string[]) => {
  // console.log('from fxn', id)
  try {
    const response = await fetch(
      BASE_URL + `/code/${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get all snippets");
    }
    const data = response.json();
    return data

  } catch (error) {
    console.error(error);
  }
}

// DELETE CODE SNIPPET
export const deleteCode = async (id: string, author_id: string) => {
  return await apiCall.DELETE(BASE_URL + `/code/${id}/${author_id}`)
}

// GET CODE SNIPPET PER USER/AUTHOR
export const getCodePerUser = async (user_id: string | undefined) => {
  return await apiCall.GET(BASE_URL + `/code/user_code/${user_id}`)
}

// GET CODE PER CATEGORY
export const findCodeByCategory = async (name: string) => {
  return await apiCall.GET(BASE_URL + `/code/category/${name}`)
}

// UPDATE CODE SNIPPET
// export const updateCode = async ()

// GET ALL REVIEWS
export const findAllReviews = async () => {
  return await apiCall.GET(BASE_URL + "/review")
}

// POST A REVIEW
export const createReview = async (payload: {
  user_id: string | undefined,
  code_id: string,
  review: string,
  rating: string
}) => {
  return await apiCall.POST(BASE_URL + "/review", payload)
}

// GET REVIEW BY CODE_ID
export const getReviewByCodeId = async (id: string | string[]) => {
  try {
    const response = await fetch(
      BASE_URL + `/review/${id}`,
      {
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to get all snippets");
    }
    const data = response.json();
    return data

  } catch (error) {
    console.error(error);
  }
}

