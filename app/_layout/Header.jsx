"use client";
import Image from "next/image";
import React from "react";
import { Menu } from "./component/Menu";
import Link from "next/link";
import { Search } from "./component/Search";

export function Header() {
  return (
    <div className="sticky top-0 z-50 border-b border-gray-200 shadow-lg bg-white">
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        {/* Logo */}
        <Link href="/" className="relative w-[70px] h-[70px] cursor-pointer">
          <Image
            src="/images/Logo.png"
            alt="logo"
            fill
            className="object-contain"
            sizes="70px"
            priority
          />
        </Link>

        {/* Search Bar */}
        <div className="search relative w-full max-w-md mx-4 flex items-center border border-gray-300 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search />
        </div>

        {/* Right Buttons */}
        <div className="flex gap-1 items-center">
          <Menu />
        </div>
      </div>
    </div>
  );
}
