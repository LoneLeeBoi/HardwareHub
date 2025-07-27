"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "./component/Menu";
import Link from "next/link";
import { Search } from "./component/Search";
import jwt from "jsonwebtoken";

export function Header() {
  const [showHeader, setShowHeader] = useState(false);
  const [animate, setAnimate] = useState(false); // trigger animation

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) return setShowHeader(false);

      try {
        const decoded = jwt.decode(token);
        if (decoded?.role === "user") {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
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
      // delay to allow animation to run after render
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [showHeader]);

  if (!showHeader) return null;

  return (
    <div
      className={`sticky top-0 z-50 border-b border-gray-200 shadow-lg bg-white transform transition-all duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
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
