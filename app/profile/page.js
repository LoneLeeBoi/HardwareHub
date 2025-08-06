import React from "react";
import OrderSection from "./components/orderSection";

export default function Page(props) {
    return (
        <>
            <div className="relative h-[250px] w-full" style={{ backgroundColor: '#E4B800' }}></div>
            <div className="flex gap-[18px] mx-[100px] h-fit relative">
                <div className="size-[200px] bg-black rounded-full absolute top-[-100px]"></div>
                <div className="text-[48px] font-[500] px-[200px]">
                    {props?.name ?? "Lee Casquejo"}
                </div>
            </div>
            <div className="my-[42px]">
                <OrderSection />
            </div>
        </>
    );
}