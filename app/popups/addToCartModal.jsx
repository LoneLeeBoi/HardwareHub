"use client";
import { Close } from "@/public/icons/close";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import globalState from "../store/globalState";
import { Plus } from "@/public/icons/plus";
import { Minus } from "@/public/icons/minus";

export function AddToCartModal({ isOpen, onClose, product }) {
  const { addToCart } = globalState();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const modalRef = useRef(null);

  // Initialize selected variant
  useEffect(() => {
    if (Array.isArray(product) && product.length > 0) {
      setSelectedVariant(product[0]); // default to first variant
    } else if (product && !Array.isArray(product)) {
      setSelectedVariant(product); // single product
    } else {
      setSelectedVariant(null);
    }
  }, [product]);

  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        isOpen
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset quantity when modal closes
  useEffect(() => {
    if (!isOpen) {
      setQuantity(1);
    }
  }, [isOpen]);

  // Don't render if no product or variant selected
  if (!isOpen || !selectedVariant) return null;

  const handleAddToCart = () => {
    if (selectedVariant && quantity > 0) {
      addToCart({ ...selectedVariant, quantity });
      onClose();
    }
  };

  const variants = Array.isArray(product) ? product : [product];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[101] bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`fixed top-0 right-0 z-[102] bg-white h-screen w-full sm:w-1/3 p-6 shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full min-h-0">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <div
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
              aria-label="Close modal"
            >
              <Close className="size-6 stroke-3" />
            </div>
          </div>

          {/* Header */}
          <h2 className="text-xl font-black mb-4">ADD TO CART</h2>

          {/* Scrollable Content */}
          <div className="flex-1 min-h-0 overflow-y-auto">
            {/* Product Image */}
            <div className="mb-4">
              <Image
                src={selectedVariant.image || "/images/fallback.png"}
                alt={selectedVariant.name || "Product image"}
                width={300}
                height={250}
                className="w-full h-[250px] object-cover rounded"
                priority
              />
            </div>

            {/* Product Name */}
            <h3 className="font-serif font-semibold text-lg uppercase mb-4">
              {selectedVariant.name}
            </h3>

            {/* Price Display */}
            <div className="text-xl font-bold mb-4">
              ${selectedVariant.price}
            </div>

            {/* Variants Selector */}
            {variants.length > 1 && (
              <div className="mb-6">
                <label className="block font-semibold mb-2">Select Unit:</label>
                <select
                  className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedVariant?.id?.toString() || ""}
                  onChange={(e) => {
                    const targetValue = e.target.value;
                    const chosen = variants.find(
                      (v) => v.id?.toString() === targetValue
                    );
                    if (chosen) {
                      setSelectedVariant(chosen);
                    }
                  }}
                >
                  {variants.map((v) => (
                    <option key={v.id} value={v.id?.toString()}>
                      {v.unit || "Unit"} - ${v.price}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Quantity Controls */}
            <div className="mb-6">
              <label className="block font-semibold mb-2">Quantity:</label>
              <div className="flex items-center gap-3 w-fit">
                <button
                  className="p-2 rounded border hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                >
                  <Minus className="size-4 stroke-3" />
                </button>
                <span className="text-xl font-semibold min-w-[2rem] text-center">
                  {quantity}
                </span>
                <button
                  className="p-2 rounded border hover:bg-gray-100 transition-colors"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus className="size-4 stroke-3" />
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="text-lg font-semibold mb-6">
              Total: ${(selectedVariant.price * quantity).toFixed(2)}
            </div>
          </div>

          {/* Actions - Fixed at bottom */}
          <div className="mt-auto pt-4 border-t">
            <div className="grid grid-cols-3 gap-2 text-white uppercase text-sm font-semibold">
              <button
                className="py-3 bg-red-600 text-center hover:bg-red-700 transition-colors rounded"
                onClick={onClose}
              >
                Close
              </button>
              <button
                className="py-3 bg-blue-600 text-center hover:bg-blue-700 transition-colors rounded"
                onClick={() => {
                  // Add your buy now logic here
                  console.log("Buy now clicked");
                }}
              >
                Buy Now
              </button>
              <button
                className="py-3 bg-green-600 text-center hover:bg-green-700 transition-colors rounded"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}