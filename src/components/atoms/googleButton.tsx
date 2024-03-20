import React, { useState } from "react";
import Image from "next/image";
import { auth } from "@/utiles/firebase/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { BASE_URL } from "@/utiles/service/constant";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const GoogleBtn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const googleAuth = new GoogleAuthProvider()
  const handleGoogleSignin = async () => {
    setIsLoading(prev => !prev)
    const result = await signInWithPopup(auth, googleAuth)
    if (result) {
      // console.log(result)
      setIsLoading(prev => !prev)
      await fetch(BASE_URL + "/users", {
        method: "POST",
        body: JSON.stringify({
          name: result?.user.displayName,
          email: result?.user.email,
          image: result?.user.photoURL,
        }),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("userObject", JSON.stringify(data));
          // console.log(data);
          router.push("/");
          toast.success("Enjoy Code-4-all 😀", {
            position: "top-right",
            theme: "dark",
            hideProgressBar: true,
            autoClose: 3000
          })
          setIsLoading(prev => !prev);
        }
        );
    }

  }

  return (
    <div className="">
      <button
        onClick={() => handleGoogleSignin()}
        data-u
        className={
          isLoading
            ? "hover:cursor-not-allowed flex border border-gray-300 w-full items-center rounded gap-3 px-[60px] m-auto"
            : "flex border border-gray-300 hover:shadow items-center rounded  gap-3 w-full justify-center m-auto"
        }
      >
        <Image
          height={40}
          width={40}
          alt="google logo"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        />
        <p className="text-[15px]">{isLoading ? "Loading..." : "Google"}</p>
      </button>

    </div>

  )
}
export default GoogleBtn