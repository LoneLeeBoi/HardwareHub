"use client";

import { Close } from "@/public/icons/close";
import Image from "next/image";
import React, { useState } from "react";

export function CheckoutModal({
  isOpen,
  onClose,
  cart,
  onConfirm,
  setPaymentMethod,
}) {
  const methods = [
    { id: "cash", name: "Cash on Delivery" },
    { id: "Gcash", name: "Gcash" },
  ];

  const calculateTotal = () =>
    cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[101] bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 z-[102] bg-white h-screen w-full sm:w-1/2 lg:w-1/3 p-6 shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Close Icon */}
          <div className="flex justify-end" onClick={onClose}>
            <Close className="size-6 stroke-3 cursor-pointer" />
          </div>

          {/* Header */}
          <h2 className="text-xl font-black mb-4">CHECKOUT DETAILS</h2>

          {/* Cart Items */}
          <div className="flex flex-col gap-4 flex-1">
            {cart.map((item, index) => (
              <div key={`${item.id}-${index}`} className="border-b pb-4">
                <Image
                  src={item.image || "/images/fallback.png"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-[150px] object-cover rounded mb-2"
                />
                <div className="flex justify-between font-semibold text-sm">
                  <span>{item.name}</span>
                  <span>
                    {formatPrice(item.price)} x {item.quantity}
                  </span>
                </div>
                <div className="text-right text-base font-bold">
                  {formatPrice(item.price * (item.quantity || 1))}
                </div>
              </div>
            ))}
          </div>
          <select
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="border p-2 rounded"
          >
            {methods.map((method) => (
              <option key={method.id} value={method.id}>
                {method.name}
              </option>
            ))}
          </select>

          {/* Total + Actions */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between font-bold text-lg mb-4">
              <span>Total</span>
              <span>{formatPrice(calculateTotal())}</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-white uppercase text-sm font-semibold mb-4">
              <div
                className="py-3 text-center cursor-pointer rounded-lg bg-red-500 hover:bg-red-700 transition"
                onClick={onClose}
              >
                Cancel
              </div>
              <div
                className="py-3 text-center rounded-lg  cursor-pointer bg-green-500 hover:bg-green-600 transition"
                onClick={onConfirm}
              >
                Confirm Order
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
