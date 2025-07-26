import Image from "next/image";
import React from "react";

export function AddToCartModal({ isOpen, onClose, product }) {
  if (!product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[101] bg-black/70 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-in Modal */}
      <div
        className={`fixed top-0 right-0 z-[102] bg-white h-screen w-full sm:w-1/3 p-6 shadow-xl overflow-y-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-4">
          <button onClick={onClose} className="text-gray-600 hover:text-black">
            ✕
          </button>
        </div>

        {/* Product Details */}
        <div className="relative h-full">
          <div className="text-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={200}
              className="w-32 h-32 object-contain mx-auto mb-4"
            />
            <p className="font-semibold text-lg">{product.name}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <p className="text-lg mt-2 text-primary font-bold">
              ${product.price}
            </p>
          </div>

          <div className="absolute bottom-0 w-full">
            <button
              onClick={() => {
                onClose(); // auto-close after adding
              }}
              className="w-full bg-red-700 hover:bg-red-800 text-white py-2 rounded-md"
            >
              Confirm Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
