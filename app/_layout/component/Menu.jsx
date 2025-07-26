"use client";

import DropdownWithTooltip from "@/app/popups/DropdownWithTooltip";
import globalState from "@/app/store/globalState";
import { Bell } from "@/public/icons/bell";
import { Cart } from "@/public/icons/cart";
import { User } from "@/public/icons/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function Menu() {
  const { isLogged, cart, setLoggedIn } = globalState();
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const isAuthenticated = isLogged || token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setLoggedIn(false);
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
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

      {/* Bell and User */}
      {isAuthenticated && (
        <div className="flex space-x-2">
          <DropdownWithTooltip
            trigger={<Bell className="w-5 h-5" />}
            tooltip="Notifications"
          >
            <ul className="text-sm text-gray-700">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                No new notifications
              </li>
            </ul>
          </DropdownWithTooltip>

          <DropdownWithTooltip
            trigger={<User className="w-5 h-5" />}
            tooltip="Account"
          >
            <ul className="text-sm text-gray-700">
              <Link href={`/profile`} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </Link>
              <Link href={`/settings`} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </Link>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={handleLogout}
              >
                Logout
              </li>
            </ul>
          </DropdownWithTooltip>
        </div>
      )}
    </>
  );
}
