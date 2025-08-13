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
    <></>
    // <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
    //   {/* Logo */}
    //   <div className="flex items-center space-x-2">
    //     <Image
    //       src="/images/Logo.png" // Update with your actual logo path
    //       alt="Logo"
    //       width={40}
    //       height={40}
    //     />
    //     <span className="text-lg font-bold">Admin Panel</span>
    //   </div>

    //   {/* Cog with Tooltip + Dropdown */}
    //   <DropdownWithTooltip
    //     trigger={<Cogs className="w-6 h-6 text-gray-700" />}
    //     tooltip="Logout"
    //   >
    //     <div
    //       onClick={handleLogout}
    //       className="w-full text-left px-4 py-2 hover:bg-gray-100"
    //     >
    //       Log out
    //     </div>
    //   </DropdownWithTooltip>
    // </header>
  );
}
