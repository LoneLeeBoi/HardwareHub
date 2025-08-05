"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import DropdownWithTooltip from "@/app/popups/DropdownWithTooltip";
import globalState from "@/app/store/globalState";

import { Bell } from "@/public/icons/bell";
import { Cart } from "@/public/icons/cart";
import { User } from "@/public/icons/user";
import { Info } from "@/public/icons/info";
import { Cogs } from "@/public/icons/cogs";

export function Menu() {
  const { isLogged, cart, setLogout, setCart } = globalState();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const notifications = [
    { amount: "123.01", date: "July 30, 2025" },
    { amount: "250.00", date: "August 15, 2025" },
  ];

  useEffect(() => {
    setIsAuthenticated(isLogged);
  }, [isLogged]);

  const handleLogout = () => {
    setLogout(false);
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    localStorage.removeItem("app-cart-storage");
    Cookies.remove("token");
    setCart([]);
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <>
      {/* Cart */}
      <Link href="/cart" className="relative px-2 py-2 hover:bg-gray-200 rounded-full group">
        <Cart className="w-5 h-5" />
        {cart.length > 0 && (
          <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
            {cart.length}
          </div>
        )}
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
          View Cart
        </span>
      </Link>

      {/* Not Authenticated */}
      {!isAuthenticated && (
        <DropdownWithTooltip
          trigger={
            <div className="relative px-2 py-2 hover:bg-gray-200 rounded-full group">
              <Cogs className="w-5 h-5" />
            </div>
          }
          tooltip="Account"
        >
          <ul className="text-sm text-gray-700">
            <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
            <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
          </ul>
        </DropdownWithTooltip>
      )}

      {/* Authenticated */}
      {isAuthenticated && (
        <div className="flex items-center space-x-2">
          {/* Notifications */}
          <DropdownWithTooltip
            trigger={
              <div className="relative px-2 py-2 hover:bg-gray-200 rounded-full group">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                    {notifications.length}
                  </div>
                )}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition pointer-events-none z-50">
                  Notifications
                </span>
              </div>
            }
            tooltip="Notifications"
          >
            <ul className="text-sm text-gray-700 max-h-60 overflow-y-auto w-64">
              {notifications.length === 0 ? (
                <li className="px-4 py-2 text-center text-gray-500">No new notifications</li>
              ) : (
                notifications.map((notif, index) => (
                  <li key={index} className="flex space-x-2 px-4 py-2 hover:bg-gray-100">
                    <Info className="size-16 mt-1 text-red-500" />
                    <span className="text-sm">
                      Your debt payment of <strong>₱{notif.amount}</strong> is due on <strong>{notif.date}</strong>.
                    </span>
                  </li>
                ))
              )}
            </ul>
          </DropdownWithTooltip>

          {/* User */}
          <DropdownWithTooltip
            trigger={
              <div className="relative px-2 py-2 hover:bg-gray-200 rounded-full group">
                <User className="w-5 h-5" />
              </div>
            }
            tooltip="Account"
          >
            <ul className="text-sm text-gray-700">
              <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
              <li onClick={handleLogout} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Logout
              </li>
            </ul>
          </DropdownWithTooltip>
        </div>
      )}
    </>
  );
}
