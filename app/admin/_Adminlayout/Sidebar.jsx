"use client";

import Link from "next/link";
import React from "react";

const navItems = [
  { label: "Product", href: "/admin/product" },
  { label: "Expenses", href: "/admin/expenses" },
  { label: "Inventories", href: "/admin/inventories" },
  { label: "Walk In", href: "/admin/walk-in" },
];

const manageItems = [
  { label: "Debt", href: "/admin/manage/debt" },
  { label: "Orders", href: "/admin/manage/orders" },
  { label: "Receipt", href: "/admin/manage/receipt" },
];

export function Sidebar() {
  return (
    <aside className="w-64 h-screen sticky top-0 left-0 bg-gray-100 p-4">
      <nav className="space-y-4">
        <Link href="/admin" className="font-bold text-lg">
          Dashboard
        </Link>

        <ul className="space-y-2 text-gray-700">
          {navItems.map((item) => (
            <li key={item.href} className="ml-4">
              <Link href={item.href} className="hover:text-blue-600 block">
                {item.label}
              </Link>
            </li>
          ))}

          <li>
            <div className="font-semibold">Manage</div>
            <ul className="ml-4 mt-1 space-y-1 text-sm">
              {manageItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-blue-600 block">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="ml-4">
            <Link href="/admin/users" className="hover:text-blue-600 block">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
