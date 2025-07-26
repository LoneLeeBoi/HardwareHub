import { Magnify } from "@/public/icons/magnify";
import Image from "next/image";
import React from "react";
import { Menu } from "./component/Menu";

export function Header() {
  return (
    <div className="border-b border-gray-200 shadow-lg">
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        {/* Logo */}
        <div className="relative w-[70px] h-[70px]">
          <Image
            src="/images/Logo.png"
            alt="logo"
            fill
            className="object-contain"
            sizes="70px"
            priority
          />
        </div>

        <div className="search relative w-full max-w-md mx-4 flex items-center border border-gray-300 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pr-10 pl-2 text-sm"
            style={{
              padding: "0.5rem",
              border: "none",
              outline: "none",
              backgroundColor: "transparent",
              borderRadius: "0",
              boxShadow: "none",
            }}
          />

          <div className="absolute right-3 text-gray-400">
            <Magnify className="w-5 h-5 cursor-pointer" />
          </div>
        </div>

        {/* Right Buttons */}
        <div className="flex gap-1 items-center">
          <Menu />
        </div>
      </div>
    </div>
  );
}
