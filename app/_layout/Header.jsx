"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "./component/Menu";
import Link from "next/link";
import { Search } from "./component/Search";
import jwt from "jsonwebtoken";


export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      try {
        const token = localStorage.getItem("token");
        const decoded = token ? jwt.decode(token) : null;
        setIsVisible(!decoded || decoded.role !== "admin");
      } catch {
        setIsVisible(true);
      }
    };

    checkToken();
    window.addEventListener("storage", checkToken);
    const interval = setInterval(checkToken, 1000);

    return () => {
      window.removeEventListener("storage", checkToken);
      clearInterval(interval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 shadow-lg bg-white">
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/Logo.png"
            alt="logo"
            width={70}
            height={70}
            className="object-contain"
            priority
          />
          <span className="text-lg font-bold">HARDWARE HUB</span>
        </Link>

        {/* Search Bar */}
        <div className="relative w-full max-w-md mx-4 flex items-center border border-gray-300 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500">
          <Search />
        </div>

        {/* Menu */}
        <div className="flex">
          <Menu />
        </div>
      </div>
    </header>
  );
}
