import Image from "next/image";
import React from "react";

interface propsType {
  img: string;
  title: string;
  mainTitle: string;
}

const Slide: React.FC<propsType> = ({ img, title, mainTitle }) => {
  return (
    <div
      className="relative outline-none border-none  md:w-[1000px] md:px-[80px] h-fit px-[20px]"
    >
      <div
      className=" absolute border hidden md:flex !h-fit bg-white w-[40%] border-none  left-[15px] md:left-[70px] sm:w-[300px] top-[50%] -translate-y-[50%] space-y-2 lg:space-y-4 p-4 sm:p-0 rounded-lg sm:rounded-none max-[700px]:relative"
      >
        <div className=" hidden md:flex flex-col gap-2 px-4 py-8 bg-[#f5f5f5]">
          <h2 className="text-[14px] text-[#f94d1c] lg:text-[20px] leading-[1.2] font-bold">
            {title}
          </h2>
          <h3 className="text-black text-[10px] lg:text-[16px] md:text-[14px] leading-[1.2]">
            {mainTitle}
          </h3>
        </div>
      </div>

      <Image
        className="w-[100%] h-[50%]  object-cover object-right md:object-left-bottom"
        src={img}
        alt="heroImage"
        width={700}
        height={10}
      />

      {/* <div className="max-[699px]:hidden">
      <Image
        className="w-[100%] h-[300px] md:h-auto object-cover object-right md:object-left-bottom"
        src={img}
        alt="heroImage"
        width={2000}
        height={2000}
      />
      </div> */}
    </div>
  );
};

export default Slide;
