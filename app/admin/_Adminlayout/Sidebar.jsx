import Link from "next/link";
import React from "react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-white p-6 h-screen sticky top-0 left-0 shadow-md">
      <nav className="space-y-6 text-sm">
        <Link
          href="/admin"
          className="font-bold text-lg text-gray-800 hover:text-blue-600 transition"
        >
          Dashboard
        </Link>

        <ul className="space-y-3 text-gray-700">
          <li className="ml-2">
            <Link
              href="/admin/product"
              className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Product
            </Link>
          </li>
          <li className="ml-2">
            <Link
              href="/admin/expenses"
              className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Expenses
            </Link>
          </li>
          <li className="ml-2">
            <Link
              href="/inventories"
              className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Inventories
            </Link>
          </li>
          <li className="ml-2">
            <Link
              href="/walk-in"
              className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Walk In
            </Link>
          </li>

          {/* Manage section */}
          <li className="mt-4">
            <div className="font-semibold text-gray-600 uppercase text-xs tracking-wide mb-1">
              Manage
            </div>
            <ul className="ml-4 space-y-1 text-sm">
              <li>
                <Link
                  href="/manage/debt"
                  className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
                >
                  Debt
                </Link>
              </li>
              <li>
                <Link
                  href="/manage/orders"
                  className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link
                  href="/manage/receipt"
                  className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
                >
                  Receipt
                </Link>
              </li>
            </ul>
          </li>

          <li className="ml-2 mt-4">
            <Link
              href="/users"
              className="block px-3 py-2 rounded-md hover:bg-blue-100 hover:text-blue-700 transition"
            >
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
