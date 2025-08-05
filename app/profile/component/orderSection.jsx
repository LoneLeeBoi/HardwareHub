"use client";
import { useState } from "react";
import SettingsSection from "./settingsSection";

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

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 p-4">
      <div className="flex-1 border rounded shadow-sm p-4">
        <div className="flex items-center border-b mb-4">
          {["Purchase History", "Check Debt", "My Orders"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>

        <div className="h-[400px] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b text-gray-600">
                <th className="py-2">Product</th>
                <th className="py-2">Date</th>
                <th className="py-2">Time</th>
                <th className="py-2">Price</th>
                <th className="py-2">Quantity</th>
                <th className="py-2 text-green-600">Total</th>
              </tr>
            </thead>
            <tbody>
              {purchaseHistory.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="py-2 flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.product}
                      className="w-6 h-6 object-cover rounded"
                    />
                    {item.product}
                  </td>
                  <td className="py-2">{item.date}</td>
                  <td className="py-2">{item.time}</td>
                  <td className="py-2">₱{item.price.toFixed(2)}</td>
                  <td className="py-2">{item.quantity}</td>
                  <td className="py-2 text-green-600">
                    ₱{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <SettingsSection />
    </div>
  );
}
