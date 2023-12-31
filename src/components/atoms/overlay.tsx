import React from "react";

interface Props {
  onClick: () => void;
  transparent?: boolean;
}

const Overlay = ({ onClick, transparent }: Props) => {
  return (
    <div
      onClick={onClick}
      className={`h-[100vh] w-[100vw]  bg-opacity-90 ${
        transparent ? "" : "bg-[#f1f1f1]"
      }  fixed top-0 right-0 z-30`}
    ></div>
  );
};

export default Overlay;
