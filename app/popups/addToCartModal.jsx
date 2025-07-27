"use client";

import { Close } from "@/public/icons/close";
import Image from "next/image";
import React, { useState } from "react";
import globalState from "../store/globalState";
import { Plus } from "@/public/icons/plus";
import { Minus } from "@/public/icons/minus";

export function AddToCartModal({ isOpen, onClose, product }) {
  const { cart, setCart } = globalState();
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    onClose();
    setQuantity(1); // reset quantity
  };

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
        className={`fixed top-0 right-0 z-[102] bg-white h-screen w-full sm:w-1/3 p-6 shadow-xl overflow-hidden transition-transform duration-300 ease-in-out ${
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
          <div className="text-xl font-black mb-4">ADD TO CART</div>

          {/* Product */}
          <div>
            <Image
              src={product.image || "/images/fallback.png"}
              alt={product.name}
              width={300}
              height={200}
              className="w-full h-[250px] object-cover mb-4"
            />
            <div className="flex justify-between font-serif font-semibold text-lg uppercase mb-2">
              <p className="tracking-widest">{product.name}</p>
              <p className="text-primary">${product.price}</p>
            </div>

            {/* Quantity */}
            <div className="mb-4 w-fit flex items-center gap-3">
              <button
                className="w-fit p-1 rounded hover:bg-gray-200 transition"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                aria-label="Decrease quantity"
              >
                <Minus className="size-4 stroke-3" />
              </button>
              <span className="text-xl font-semibold">{quantity}</span>
              <button
                className="w-fit p-1 rounded hover:bg-gray-200 transition"
                onClick={() => setQuantity(quantity + 1)}
                aria-label="Increase quantity"
              >
                <Plus className="size-4 stroke-3" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto">
            <div className="grid grid-cols-3 gap-2 text-white uppercase text-sm font-semibold">
              <div
                className="py-3 bg-red-600 text-center hover:bg-red-700 transition cursor-pointer"
                onClick={onClose}
              >
                Close
              </div>
              <div className="py-3 bg-blue-600 text-center hover:bg-blue-700 transition cursor-pointer">
                Buy
              </div>
              <div
                className="py-3 bg-green-600 text-center hover:bg-green-700 transition cursor-pointer"
                onClick={handleAddToCart}
              >
                Add
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
