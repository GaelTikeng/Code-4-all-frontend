import React from "react";


type Props = {
  label: string,
  color: string,
  text: string,
  borderColor?: string,
  onClick?: () => void
}

export default function Button({ onClick, label, color, text, borderColor }: Props) {

  return (
    <button
      onClick={onClick}
      className={`${color} w-full p-1 border px-2 ${text} ${borderColor} hover:cursor-pointer`}>
      <p className="text-center font-bold">{label}</p>
    </button>
  )
}