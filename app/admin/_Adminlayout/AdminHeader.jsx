"use client";

import React from "react";
import Image from "next/image";
import DropdownWithTooltip from "@/app/popups/DropdownWithTooltip";
import { Cogs } from "@/public/icons/cogs";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import globalState from "@/app/store/globalState";
import { useRouter } from "next/navigation";

export function AdminHeader() {
  const { setLogout } = globalState();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setLogout(false);
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md sticky top-0 z-30">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <Image
          src="/images/Logo.png"
          alt="Logo"
          width={40}
          height={40}
          className="rounded-md"
        />
        <span className="text-xl font-semibold text-gray-800 tracking-tight">
          Admin Panel
        </span>
      </div>

      {/* Cog + Dropdown */}
      <DropdownWithTooltip
        trigger={
          <Cogs className="w-6 h-6 text-gray-600 hover:text-blue-600 transition duration-200 cursor-pointer" />
        }
        tooltip="Logout"
      >
        <div
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition duration-150 cursor-pointer"
        >
          Log out
        </div>
      </DropdownWithTooltip>
    </header>
  );
}
