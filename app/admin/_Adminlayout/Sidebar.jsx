"use client";
import Link from "next/link";
import React, { useState } from "react";
import SidebarNavigation from "./SidebarNavigation";
import { Product } from "@/public/icons/product";
import { Money } from "@/public/icons/money";
import { Inbox } from "@/public/icons/inbox";
import { Walk } from "@/public/icons/walk";
import { Receipt } from "@/public/icons/receipt";
import { User } from "@/public/icons/user";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import globalState from "@/app/store/globalState";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Bars from "@/public/icons/bars";
import { Close } from "@/public/icons/close";

const navItems = [
  { label: "Product", href: "/admin/product", icon: Product },
  { label: "Expenses", href: "/admin/expenses", icon: Money },
  { label: "Inventories", href: "/admin/inventories", icon: Inbox },
  { label: "Walk In", href: "/admin/walk-in", icon: Walk },
];

const manageItems = [
  { label: "Debt", href: "/admin/manage/debt", icon: Money },
  { label: "Orders", href: "/admin/manage/orders", icon: Product },
  { label: "Receipt", href: "/admin/manage/receipt", icon: Receipt },
];

export function Sidebar() {
  const { setLogout } = globalState();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    Cookies.remove("token");
    setLogout(false);
    toast.success("You have been logged out.");
    router.push("/");
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b bg-white shadow-sm sticky top-0 z-50">
        <Link href="/admin" className="flex items-center space-x-2">
          <Image src="/images/Logo.png" alt="Logo" width={32} height={32} />
          <span className="font-bold text-lg">Dashboard</span>
        </Link>
        <div
          className="p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <Close className="w-6 h-6" /> : <Bars className="w-6 h-6" />}
        </div>
      </div>

      <aside
        className={`fixed md:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm z-40 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="hidden md:flex px-6 py-8 border-b border-gray-100">
            <Link
              href="/admin"
              className="flex items-center space-x-3 group transition-all duration-200 hover:opacity-80"
            >
              <Image src="/images/Logo.png" alt="Logo" width={40} height={40} />
              <div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  Dashboard
                </h1>
                <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
              </div>
            </Link>
          </div>

          <nav className="flex-1 px-4 pt-24 sm:py-6 space-y-8 overflow-y-auto">
            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Main Menu
              </h2>
              <ul className="space-y-1">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <SidebarNavigation
                      icon={item.icon}
                      route={item.href}
                      title={item.label}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                Management
              </h2>
              <ul className="space-y-1">
                {manageItems.map((item) => (
                  <li key={item.href}>
                    <SidebarNavigation
                      icon={item.icon}
                      route={item.href}
                      title={item.label}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4 px-3">
                System
              </h2>
              <ul className="space-y-1">
                <li>
                  <SidebarNavigation
                    icon={User}
                    route="/admin/users"
                    title="Users"
                  />
                </li>
              </ul>
            </div>
          </nav>

          <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">A</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">
                    administrator@company.com
                  </p>
                </div>
              </div>
            </div>
            <div
              onClick={handleLogout}
              className="mt-3 justify-end flex p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 group"
              title="Logout"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </>
  );
}
