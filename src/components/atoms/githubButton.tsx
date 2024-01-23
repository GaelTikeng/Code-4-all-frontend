import React, { useState } from "react";
import Image from "next/image";
import { auth } from "@/utiles/firebase/firebase";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { BASE_URL } from "@/utiles/service/constant";
import { useRouter } from "next/navigation";

const GithubBtn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const githubAuth = new GithubAuthProvider()
  const handleGithubSignin = async () => {
    setIsLoading(prev => !prev)
    const result = await signInWithPopup(auth, githubAuth)
    console.log(result)
    if (result) {
      console.log(result.user)
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
          console.log(data);
          router.push("/");
          setIsLoading(prev => !prev);
        }
        );
    }

  }

  return (
    <div className="py-2">
      <button
        onClick={() => handleGithubSignin()}
        data-u
        className={
          isLoading
            ? "hover:cursor-not-allowed flex border border-gray-300 w-full py-1 items-center text-xs rounded gap-3 px-[60px] m-auto"
            : "flex border border-gray-300 hover:shadow items-center py-1 rounded  gap-3 w-full justify-center m-auto"
        }
      >
        <Image
          height={30}
          width={30}
          alt="google logo"
          src="https://cdn-icons-png.flaticon.com/512/25/25231.png"
        />
        <p className="text-[15px]">{isLoading ? "Loading..." : "Github"}</p>
      </button>

    </div>

  )
}
export default GithubBtn