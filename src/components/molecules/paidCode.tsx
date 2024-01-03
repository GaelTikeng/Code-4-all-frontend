import React, { useState } from "react";
import Image from "next/image";

type Props = {
  title?: string;
  author?: string;
  price: number
};

const PaidCourse = ({
  title,
  author,
  price
}: Props): React.JSX.Element => {
  return (
    <div className=" gap-4 my-2 flex w-full justify-start">
      <Image
        src="https://www.mymcpl.org/sites/default/files/2022-07/What%20Is%20a%20Zip%20File.jpg"
        alt='zip file'
        className="border shadow hover:cursor-pointer"
        width={60}
        height={30}
        loading="lazy"
      />
      <div className="flex justify-between w-full">
        <div className=" flex flex-col   flex-1 items-start gap-2 ">
          <p className="text-sm font-bold font-sans ">{title}</p>
          <p className="text-xs font-extralight font-sans">By {author}</p>
        </div>
        <p className='text-sm font-bold  text-[#f94d1c]'>{price} FCFA</p>
      </div>
    </div>
  );
};

export default PaidCourse;
