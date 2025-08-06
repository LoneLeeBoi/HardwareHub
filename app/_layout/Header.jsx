"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "./component/Menu";
import Link from "next/link";
import { Search } from "./component/Search";
import jwt from "jsonwebtoken";

export function Header() {
  const [showHeader, setShowHeader] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [mounted, setMounted] = useState(false); // 🚨 NEW

  useEffect(() => {
    setMounted(true); // wait until client
  }, []);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setShowHeader(true);
        return;
      }

      try {
        const decoded = jwt.decode(token);
        if (decoded?.role === "user") {
          setShowHeader(true);
        } else {
          setShowHeader(false);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        setShowHeader(true);
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

  useEffect(() => {
    if (showHeader) {
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [showHeader]);

  if (!mounted || !showHeader) return null;

  return (
    <div
      className={`sticky top-0 z-50 border-b border-gray-200 shadow-lg bg-white transform transition-all duration-700 ease-in-out ${
        animate ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-6 px-4">
        <Link href="/" className="flex items-center w-[70px] cursor-pointer gap-[14px]">
            <Image
              src="/images/Logo.png"
              alt="logo"
              width={70}
              height={70}
              className="object-contain size-[70px]"
              sizes="70px"
              priority
            />
          <span className="text-[18px] text-center font-bold">
            HARDWARE HUB
          </span>
        </Link>

        <div className="search relative w-full max-w-md mx-4 flex items-center border border-gray-300 rounded-full px-3 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
          <Search />
        </div>

        <div className="flex gap-1 items-center">
          <Menu />
        </div>
      </div>
    </div>
  );
}
