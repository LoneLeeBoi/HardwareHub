"use client";
import { useState } from "react";
import SettingsSection from "./settingsSection";
import ChangePassword from "./changePassword";
import ProfileInfo from "./profileInfo";

const purchaseHistory = [
  {
    id: 1,
    product: "Roofing nails",
    date: "December 30, 2025",
    time: "10:15am",
    price: 300,
    quantity: 1,
    image: "/images/roofing1.png",
  },
  {
    id: 2,
    product: "Roofing nails",
    date: "December 30, 2025",
    time: "10:15am",
    price: 300,
    quantity: 34,
    image: "/images/roofing2.png",
  },
];

export default function OrderSection() {
  const [activeTab, setActiveTab] = useState("Purchase History");
  const [page, setPage] = useState("cart");

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6">
      {/* Order Content */}
      {page === "cart" && (
        <div className="flex-1 bg-white rounded-xl border shadow-md border-gray-200 p-6 pb-12">
          <div className="flex items-center space-x-4 border-b pb-4 mb-6">
            {["Purchase History", "Check Debt", "My Orders"].map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-t text-sm font-semibold transition-all border-b-2 ${
                  activeTab === tab
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-500 border-transparent hover:text-blue-500"
                }`}
              >
                {tab}
              </div>
            ))}
          </div>

          {/* Scrollable Table */}
          <div className="overflow-auto max-h-[400px]">
            <table className="w-full text-sm text-left">
              <thead className="sticky top-0 bg-white z-10 shadow-sm">
                <tr className="text-gray-700 border-b">
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Time</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Quantity</th>
                  <th className="py-2 px-4 text-green-600">Total</th>
                </tr>
              </thead>
              <tbody>
                {purchaseHistory.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.product}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span>{item.product}</span>
                    </td>
                    <td className="py-3 px-4">{item.date}</td>
                    <td className="py-3 px-4">{item.time}</td>
                    <td className="py-3 px-4">₱{item.price.toFixed(2)}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4 text-green-600">
                      ₱{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {page === "password" && <ChangePassword />}

      {page === "info" && <ProfileInfo />}

      <SettingsSection page={page} setPage={setPage} />
    </div>
  );
}
