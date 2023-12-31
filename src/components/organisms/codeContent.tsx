"use client"
import React from "react";
import CodeCard from "../molecules/codeCard";
import Carousel from "react-multi-carousel";
import { Code, Test } from "../../../types";

type Props = {}

export const allCode: Test[] = [
  {
    id: '1',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: '2',
    title: "html source",
    author: "franck",
    rating: 2,
    price: 4200
  },
  {
    id: '3',
    title: "python source",
    author: "Bello",
    rating: 5,
    price: 1400
  },
  {
    id: '4',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: '5',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: '6',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: '7',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: '8',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: "9",
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  },
  {
    id: '10',
    title: "code source",
    author: "GAELINHO",
    rating: 12,
    price: 100
  }
]

export default function Codes({ }: Props) {
  
  return (
    <div className="md:px-[80px] px-[20px] flex gap-6 flex-wrap">
        {allCode.map((item, index) => (
          <CodeCard
            key={index}
            title={item.title}
            author={item.author}
            rating={item.rating}
            price={item.price}
          />
        ))}
      {/* <div className="flex gap-6 flex-wrap">
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
        <CodeCard
          title="code source "
          author="Gael tikeng"
          rating={5}
          price={5000}
        />
      </div> */}
    </div>
  )
}