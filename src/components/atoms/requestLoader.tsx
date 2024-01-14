import React from "react";

const RequestLoader = () => {
  return (
    <div className="flex gap-6 py-4 h-4 bg-[#f94d1c] cursor-not-allowed justify-center font-semibold text-white w-full align-baseline">
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      {/* <p className="">Loading...</p> */}

    </div>
  )
}
export default RequestLoader