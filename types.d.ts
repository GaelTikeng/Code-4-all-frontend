import { ReactElement } from "react";


type Review = {
  id: string,
  user_id: string,
  code_id: string,
  review: string,
  rating: string
}

type Code = {
  id: string,
  user_id: string,
  purchase_id: string,
  title: string,
  description: string,
  price: number,
  code_file: string,
  programming_language: string,
  category: string,
  rating: number,
  author: string,
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
  quantity: number
}

type Test = {
  price: number,
  title: string,
  author: string,
  rating: number,
  id: string
}
