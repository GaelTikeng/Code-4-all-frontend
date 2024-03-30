import React from 'react'
import Image from "next/image";


type Props = {
  price: number,
  title: string,
  author: string,
  imageSrc?: string,
  rating: number,
  onClick?: () => void
}

export default function ShopCodeCart({ onClick, imageSrc, title, price, author, rating }: Props) {


  return (
    <div className=''>
      <hr></hr>
      <div className='flex py-4 gap-4 justify-between'>
      
      <div className='flex gap-4'>
        <Image
          src={imageSrc || "https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"}
          alt='zip file'
          className="border shadow hover:cursor-pointer"
          width={100}
          height={50}
          loading="lazy"
        />
        <div className=' leadding-loose'>
          <h2 className="text-lg  font-medium">{title}</h2>
          <p className="text-xs text-gray-400">By {author}</p>
          <p className="text-sm font-medium">{rating} stars</p>
        </div>
      </div>
      <div className='flex justify-between gap-5 items-baseline'>
        <p
          className='text-xs text-[#f94d1c] hover:cursor-pointer'
          onClick={onClick}
        >
          Remove
        </p>
        <p className='text-sm font-bold text-[#f94d1c]'>{price} FCFA</p>
      </div>
    </div>
    </div>
  )
}