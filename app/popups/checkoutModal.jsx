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
    {
      id: "credit",
      name: "Pay Later",
    },
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
        className={`fixed inset-0 z-[101] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
        aria-hidden={!isOpen}
      />

      {/* Modal */}
      <div
        className={`fixed top-0 right-0 z-[102] h-full w-full sm:w-[90%] md:w-2/3 lg:w-1/3 bg-white shadow-xl transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b">
            <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
            {/* <Close
              className="w-5 h-5 cursor-pointer hover:scale-110 transition-transform"
              onClick={onClose}
            /> */}
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

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center text-gray-500">
                Your cart is empty.
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="flex items-center gap-4 border-b pb-4"
                >
                  <Image
                    src={item.image || "/images/fallback.png"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded border"
                  />
                  <div className="flex flex-col flex-1">
                    <div className="font-medium text-gray-800">{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {formatPrice(item.price)} × {item.quantity}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-800">
                    {formatPrice(item.price * (item.quantity || 1))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t px-6 py-4 bg-gray-50">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total:</span>
              <span className="text-green-600">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm font-medium uppercase">
              <div
                className="py-3 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
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
