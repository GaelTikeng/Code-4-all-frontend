import React, { FormEvent } from "react";
import { Review, User } from "../../../types";
import { createReview } from "@/utiles/service/queries";
import { toast } from "react-toastify";


type Props = {
  ID: string,
  giveStatus: (msg: string) => void
}

export default function ReviewForm({ ID, giveStatus }: Props) {
  
  const [isLoading, setIsLoading] = React.useState<Boolean>(false)
  const [rating, setRating] = React.useState<string>('')
  const [review, setReview] = React.useState<string>('')
  const [user, setUser] = React.useState<User | null>(
    (): User | null => {
      if (typeof localStorage !== "undefined") {
        const fromLocalStorage =
          JSON.parse(localStorage.getItem("userObject") as string) || {};
        if (fromLocalStorage) return fromLocalStorage;
      }
      return null;
    }
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(prev => !prev)
    console.log(ID)
    const payload = {
      user_id: user?.id,
      code_id: ID,
      review: review,
      rating: rating
    }
    await createReview(payload)
      .then((res) => {
        console.log(res)
        giveStatus('true')
        setIsLoading(prev => !prev)
        toast.success("Review successfully posted", {
          position: toast.POSITION.TOP_RIGHT,
          theme: "dark",
          hideProgressBar: true,
          autoClose: 2000
        })
      })
      .catch((error) => {
        console.log(error)
      })

  }

  return (
    <div className="bg-[#f1f1f1] w-[90%] mx-auto p-4">
      <form className="container" onSubmit={handleSubmit}>
        <h1 className="font-semibold text-center py-5 text-xl">Review Code Snippet</h1>
        <div className="flex flex-col pb-4">
          <label htmlFor="frm-message" aria-required>Review<span className="text-red-500">*</span></label>
          <textarea
            onChange={(event) => setReview(event.target.value)}
            className="p-2"
            name="description"
          ></textarea>
        </div>

        <div className="flex flex-col pb-4">
          <label htmlFor="frm-rating">Rating<span className="text-red-500">*</span></label>
          <input
            className="border-1 p-1"
            type="number"
            name="rating"
            required
            onChange={(event) => setRating(event.target.value)}
          // onChange={(event) => handleInputChange(event)}
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-4  bg-[#f94d1c] hover:shadow-xl font-semibold text-white w-full"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>

    </div>
  )
}