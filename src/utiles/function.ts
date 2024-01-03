import { Code, Test } from "../../types"

export const totalPrice = (codeCart: Code[] | undefined) => {
  let sum: number = 0
  for (let i = 0; i < codeCart?.length; i++) {
    sum += codeCart[i]?.price
  }
  return sum
}