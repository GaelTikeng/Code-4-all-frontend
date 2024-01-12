import React from "react";
import CommentCart from "../molecules/commentCart";
import { Review } from "../../../types";
import Pulsation from "../atoms/pulsation";

type Props = {
  reviews: Review[]
}

export default function CommentCarousel({ reviews}: Props) {

  return (
    <div
      style={{
        padding: "",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundImage: "linear-gradient(100deg, #f1f1f1bd, #e1e1e1c5), url(https://previews.123rf.com/images/monsitj/monsitj1702/monsitj170200006/72934082-code-de-programmation-technologie-abstrait-du-d%C3%A9veloppeur-de-logiciels-et-de-script-informatique.jpg)"
      }}
      className="h-fit py-8 md:py-12">
      <div className="  h-full w-full">
        <h1 className="text-2xl mb-6 font-semibold text-center">What developers say? </h1>
        <div className=" grid grid-cols-2 mx-auto md:grid md:grid-cols-3 md:w-[50%] z-50">
          {reviews ? reviews.map((item) => (
            <CommentCart
              key={item.id}
              createdAt={item.createdAt.slice(0,10)}
              comment={item.review}
              name={item.user.name}
            />
          )) : <Pulsation/>}
        </div>
      </div>



    </div>
  )
}