import React, { ReactElement, useContext } from "react";
import Pulsation from "../atoms/pulsation";
import Carousel from "react-multi-carousel";
import { useAppContext } from "@/app/context/appContext";
import CodeCard from "../molecules/codeCard";

export default function CodeCarousel(props: { title: string }) {
  const { allCode, setAllCode } = useAppContext()

  const handleClick = (id: string) => {
    console.log(id)
  } 

  let pageContent: ReactElement | ReactElement[] = (
    <div>
      <Pulsation />
    </div>
  );
    if (allCode.length) {
      pageContent = allCode.map((item, index) => (
        <CodeCard
          title={item.title}
          author={item.user.name}
          rating={item.rating}
          price={item.price}
          onClick={() => handleClick(item.id)}
        />
      ))

    }


  return (
    <div>
      <Carousel
        swipeable={false} className="w-full"
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 3,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}

      >
        {pageContent}
      </Carousel>

    </div>
  )
} 

