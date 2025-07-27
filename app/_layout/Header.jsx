"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "./component/Menu";
import Link from "next/link";
import { Search } from "./component/Search";
import jwt from "jsonwebtoken";

export function Header() {
  const [showHeader, setShowHeader] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return setShowHeader(false);

      try {
        const decoded = jwt.decode(token);
        setShowHeader(decoded?.role === "user");
      } catch {
        setShowHeader(false);
      }
    };

    checkToken();

    const onStorage = () => checkToken();
    window.addEventListener("storage", onStorage);
    const interval = setInterval(checkToken, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (showHeader) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [showHeader]);

  if (!showHeader) return null;

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md transition-all duration-700 ease-in-out transform ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-auto">
          <div className="relative w-[60px] h-[60px]">
            <Image
              src="/images/Logo.png"
              alt="logo"
              fill
              className="object-contain"
              sizes="60px"
              priority
            />
          </div>
          <h2 className="text-xl font-bold text-gray-800">HardwareHub</h2>
        </Link>


        {/* Search Bar */}
        <div className="flex-1 min-w-[200px] max-w-lg w-full">
          <div className="flex items-center px-4 py-2 border border-gray-300 rounded-full transition focus-within:ring-2 focus-within:ring-blue-500 bg-white shadow-sm">
            <Search />
          </div>
        </div>

        {/* Menu / Buttons */}
        <div className="flex items-center gap-3">
          <Menu />
        </div>
      </div>
    </header>
  );
}
