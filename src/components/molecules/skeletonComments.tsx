import React from "react";

export default function SkeletonComment() {

  return (
    <div style={{
      padding: "",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundImage: "linear-gradient(100deg, #f1f1f1bd, #e1e1e1c5), url(https://previews.123rf.com/images/monsitj/monsitj1702/monsitj170200006/72934082-code-de-programmation-technologie-abstrait-du-d%C3%A9veloppeur-de-logiciels-et-de-script-informatique.jpg)"
    }}
    className="h-fit py-8 md:py-12">
      <div className="h-full  w-full">
      <h1 className="text-2xl mb-6 font-semibold text-center">What our developers say? </h1>
      <div className="md:grid grid grid-cols-2 md:grid-cols-3 md:px-[80px] px-[20px]">
        {[...Array(3)].map((item, index) => (
          <div key={index} className="max-w-[300px] py-8 bg-white leading-loose m-4 ">
            <div className="flex  justify-center py-4">
              <div className="rounded-full m-auto skeleton object-fill border border-[#f94d1c] w-[80px] h-[80px] "></div>
            </div>
            <div className="w-full my-1 h-8 skeleton"></div>
            <div className=" h-8 my-1 skeleton w-1/2 mx-auto "></div>
            <div className="skeleton my-1 w-[70%] h-7 mx-auto"></div>
            <div className="skeleton my-1 w-[90%] h-2 mx-auto"></div>
            <div className="skeleton my-1 w-[90%] h-2 mx-auto"></div>
            <div className="skeleton my-1 w-[90%] h-2 mx-auto"></div>
            <div className="skeleton my-1 w-[90%] h-2 mx-auto"></div>
            <div className="skeleton my-1 w-[90%] h-2 mx-auto"></div>

          </div>
        ))}
      </div>
      </div>
    </div>
  )
}