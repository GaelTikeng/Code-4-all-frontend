import React from "react"
import CodeCard from "../molecules/codeCard"

interface Props {
  title: string,
  name: string,
  rating: number,
  price: number
}

export default function CartPopup({ title, name, rating, price }: Props) {
  return (
    <div>
      <CodeCard
        title={title}
        author={name}
        rating={rating}
        price={price}
      // onClick={() => handleClick(id)}
      // handleDetail={() => handleDetail(id)}
      />
    </div>
  )
} 