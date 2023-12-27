import React from "react";


type Props = {
  label: string,
  color: string,
  text: string,
  borderColor?: string
}

export default function Button({label, color, text, borderColor }: Props) {
  
  return (
    <div className={`${color} p-1 border px-2 ${text} ${borderColor} rounded-lg hover:cursor-pointer`}>
      <div>{label}</div>
    </div>
  )
}