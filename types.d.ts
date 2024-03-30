import { ReactElement } from "react";


type Review = {
  id: string,
  user_id: string | undefined,
  code_id: string,
  review: string,
  rating: string,
  createdAt: string,
  user: {
    name:string
  }
}

type Code = {
  id: string,
  user_id: string | undefined,
  purchase_id: string,
  title: string,
  description: string,
  price: number,
  code_file?: string,
  programming_language: string,
  category: string,
  rating: number,
  thumbnail: string
  author: string,
  createdAt: string,
  user: {
    name: string,
    email: string
  }
}

type User = {
  id: string,
  name: string,
  image: string,
  phone: string,
  email: string,
  password: string
}

type Purchase = {
  id: string,
  code_id: string,
  buyer_id: string,
  total_amount: number,
  quantity: number,
  createdAt: string
}

type Test = {
  price: number,
  title: string,
  author: string,
  rating: number,
  id: string
}
