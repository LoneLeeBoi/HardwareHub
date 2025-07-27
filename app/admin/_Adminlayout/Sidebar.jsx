import Link from "next/link";
import React from "react";

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen sticky top-0 left-0">
      <nav className="space-y-4">
        <Link href={`/admin`} className="font-bold text-lg">Dashboard</Link>
        <ul className="space-y-2 text-gray-700">
          <li>
            <Link href="/admin/product" className="hover:text-blue-600 block">
              Product
            </Link>
          </li>
          <li>
            <Link href="/expenses" className="hover:text-blue-600 block">
              Expenses
            </Link>
          </li>
          <li>
            <Link href="/inventories" className="hover:text-blue-600 block">
              Inventories
            </Link>
          </li>
          <li>
            <Link href="/walk-in" className="hover:text-blue-600 block">
              Walk In
            </Link>
          </li>

          {/* Manage section */}
          <li>
            <div className="font-semibold">Manage</div>
            <ul className="ml-4 mt-1 space-y-1 text-sm">
              <li>
                <Link href="/manage/debt" className="hover:text-blue-600 block">
                  Debt
                </Link>
              </li>
              <li>
                <Link href="/manage/orders" className="hover:text-blue-600 block">
                  Orders
                </Link>
              </li>
              <li>
                <Link href="/manage/receipt" className="hover:text-blue-600 block">
                  Receipt
                </Link>
              </li>
            </ul>
          </li>

          <li>
            <Link href="/users" className="hover:text-blue-600 block">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
