import React from "react";
import OrderSection from "./component/orderSection";

export default function Page(props) {
  return (
    <>
      <div className="relative h-[180px] sm:h-[250px] w-full bg-yellow-200"></div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-[18px] px-4 sm:mx-[100px] h-fit relative">
        <div className="w-[120px] h-[120px] sm:size-[200px] bg-black rounded-full absolute top-[-60px] sm:top-[-100px] left-1/2 sm:left-0 -translate-x-1/2 sm:translate-x-0"></div>

        <div className="text-center sm:text-left text-2xl sm:text-[48px] font-medium sm:pl-[220px] mt-[70px] sm:mt-0">
          {props?.name ?? "John Doe"}
        </div>
      </div>

      <div className="my-6 sm:my-[42px] px-4 sm:px-0">
        <OrderSection />
      </div>
    </>
  );
}
