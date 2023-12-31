"use client";
// import Pulsation from "@/app/[signup]/component/PulseLoader";
import { supabase } from "@/utiles/supabase/client";
import Image from "next/image";
import React, { useState } from "react";

const urlToUse = () => {
  let url: string | undefined =
    // process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process.env.NODE_ENV === "production"
      ? process?.env?.NEXT_PUBLIC_VERCEL_URL // Automatically set by Vercel.
      : "http://localhost:3000/welcome";
  url = url?.includes("http") ? url : `https://${url}`;
  url = url?.charAt(url.length - 1) === "/" ? url : `${url}/`;
  console.log("hint", process.env.NODE_ENV);
  return url;
};

const GoogleButton = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleGoogleSignin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
        redirectTo: urlToUse(),
      },
    });
    setIsLoading(true);
  };

  return (
    <div>
      <button
        onClick={() => handleGoogleSignin()}
        data-u
        className={
          isLoading
            ? "hover:cursor-not-allowed flex border border-gray-300 text-xl items-center rounded gap-3 px-[60px]  font-medium m-auto"
            : "flex border border-gray-300 hover:shadow text-xl items-center rounded  gap-3 w-full justify-center   font-medium m-auto"
        }
      >
        <Image
          height={40}
          width={40}
          alt="google logo"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
        />
        <p>{isLoading ? "Loading..." : "Google"}</p>
      </button>
    </div>
  );
};

export default GoogleButton;
