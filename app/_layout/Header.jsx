"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Menu } from "./component/Menu";
import Link from "next/link";
import { Search } from "./component/Search";
import { Cart } from "@/public/icons/cart";
import { Cogs } from "@/public/icons/cogs";
import jwt from "jsonwebtoken";

export function Header() {
  const [role, setRole] = useState("guest");
  const [animate, setAnimate] = useState(false);
  const [cart, setCart] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setRole("guest");
        return;
      }

      try {
        const decoded = jwt.decode(token);
        setRole(decoded?.role || "guest");
      } catch {
        setRole("guest");
      }
    };

    const checkCart = () => {
      try {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
      } catch {
        setCart([]);
      }
    };

    checkToken();
    checkCart();

    const onStorage = () => {
      checkToken();
      checkCart();
    };

    window.addEventListener("storage", onStorage);
    const interval = setInterval(() => {
      checkToken();
      checkCart();
    }, 1000);

    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setAnimate(true);
  }, [role]);

  if (role === "admin") return null;

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

        {/* Right side */}
        <div className="flex items-center gap-4 relative">
          {role === "user" ? (
            <Menu />
          ) : (
            <>
              {/* Cart */}
              <Link
                href="/cart"
                className="relative px-2 py-2 hover:bg-gray-200 rounded-full text-sm group"
              >
                <Cart className="w-5 h-5" />
                {cart.length > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {cart.length}
                  </div>
                )}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 whitespace-nowrap">
                  View Cart
                </div>
              </Link>

              {/* Cogs Dropdown for Login/Register */}
              <div className="relative">
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
                >
                  <Cogs className="w-5 h-5 text-gray-700" />
                </div>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-md z-50">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
