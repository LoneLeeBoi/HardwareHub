import React from "react";

export function Header(props) {
  return (
    <div className="border-b border-gray-200 shadow-lg  ">
      <div className="container flex justify-between py-[24px] ">
        <div className="">
          {/* <Image
            src=""
            fill
            alt="logo"
            className="w-[20px] h-[20px] object-cover"
          /> */}
          logo
        </div>
        <div className="">2</div>
        <div className="flex gap-[12px] items-center">
          <div className="px-[14px] py-[6px]">I</div>
          <div className="bg-gray-300 rounded-full px-[14px] py-[6px]">II</div>
          <div className="bg-green-300 rounded-full px-[12px] py-[6px]">
            III
          </div>
        </div>
      </div>
    </div>
  );
}
