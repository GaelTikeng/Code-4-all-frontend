"use client";
// import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utiles/supabase/client";
import Pulsation from "@/components/atoms/pulsation";
import { User } from "../../../types";
import { LOCAL_STORAGE } from "@/utiles/service/storage";
import { BASE_URL } from "@/utiles/service/constant";
// import { LOCAL_STORAGE } from "@/utils/service/storage";
// import { signUp } from "@/utils/service/queries";
// import { SITE_URL } from "@/utils/service/constant";
// import { useAppContext } from "../Context/AppContext";

const Signupb = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // context data

  const handleInputChange = async () => {
    setIsLoading(true);
    const googleUser = JSON.parse(
      localStorage.getItem("sb-xkwspfurbsmpwwazlkmu-auth-token") || "{}"
    );

    await fetch(BASE_URL + "/users", {
      method: "POST",
      body: JSON.stringify({
        name: googleUser?.user.user_metadata.name,
        email: googleUser?.user.email,
        image: googleUser?.user.user_metadata.picture,
        phone: googleUser?.user.phone,
      }),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        LOCAL_STORAGE.save("userObject", data);
        console.log(data);
        setSuccess(`Welcome ${data.name} 🙂`);
        router.push("/dashboard");
        setIsLoading(false);
      }
      );

    // API call: Get user by email
    // const existingUser: User = await getUserByEmail(googleUser?.user.email)
    // if (existingUser) {
    //   localStorage.setItem("userObject", JSON.stringify(existingUser))
    // } else {
    //   LOCAL_STORAGE.save("email", googleUser?.user.email);
    //   LOCAL_STORAGE.save("userObject", googleUser?.user);

    //   await fetch(BASE_URL + "/users", {
    //     method: "POST",
    //     body: JSON.stringify({
    //       name: googleUser?.user.user_metadata.name,
    //       email: googleUser?.user.email,
    //       image: googleUser?.user.user_metadata.picture,
    //       phone: googleUser?.user.phone,
    //     }),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       if (!data.message) {
    //         setCurrentUser(data);
    //         LOCAL_STORAGE.save("sender", data);
    //         console.log(data);
    //         setSuccess(`Welcome ${data.name} 🙂`);
    //         router.push("/dashboard");
    //         setIsLoading(false);
    //       }
    //     });
    // }

  };

  return (
    <div className=" mt-56 items-center justify-center text-center">
      <h1 className="text-3xl font-extrabold text-slate-800 font-serif">
        Welcome to <span className="text-4xl text-[#f94d1c]"> Code 4 all</span>
      </h1>
      <h4 className="mt-8 mb-6 font-bold text-xl text-slate-950">
        Read our <span className="text-[#f94d1c]">Privacy Policy</span>. Tap
        Agree and Continue to accept the{" "}
        <span className="text-themecolor">Terms of Service</span>
      </h4>
      {!success ? (
        <button
          onClick={() => handleInputChange()}
          className={`border ${isLoading ? "cursor-not-allowed disabled:cursor-wait" : ""
            } p-4 px-5 text-base font-extrabold bg-themecolor text-[#f94d1c] hover:shadow rounded`}
        >
          {isLoading ? "Loading..." : "Agree and Continue"}
        </button>
      ) : (
        <p className="text-2xl mt-6 font-extrabold text-[#f94d1c]">
          {success}
        </p>
      )}
    </div>
  );
};
export default Signupb;
