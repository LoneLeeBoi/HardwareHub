"use client";

import React, { useEffect, useState } from "react";
import { ProductPopular } from "../functions/ProductFunctions";
import Image from "next/image";
import { AddToCartModal } from "@/app/popups/addToCartModal";

const FALLBACK_IMAGE = "/images/fallback.png";

export function PopularProducts() {
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await ProductPopular();

      if (result.success) {
        const data = result?.data?.data || [];
        setProducts(data);
      } else {
        setError(result.err || "Failed to fetch popular products.");
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const visibleProducts = showAll ? products : products.slice(0, 20);

  return (
    <div className="container my-[24px]">
      <h2 className="text-[30px] font-bold text-center">
        Our Popular Products
      </h2>

      <div className="py-4">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-xl p-4 text-center border border-gray-200 relative hover:bg-gray-100"
                  onClick={() => handleAddToCartClick(product)}
                >
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name || "Product"}
                      fill
                      className="object-contain rounded-lg relative z-[1]"
                    />
                    <div className="absolute z-[2] top-8 left-0 bg-red-600 text-white text-sm -translate-x-[10px] font-bold px-2 py-1 shadow">
                      TOP
                    </div>
                  </div>
                  <div className="font-semibold uppercase text-sm">
                    {product.name}
                  </div>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => handleAddToCartClick(product)}
                      className="mt-4 text-xs text-white py-2 font-black px-3 bg-red-700 hover:bg-red-800 w-fit"
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {products.length > 20 && !showAll && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition"
                >
                  Show More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
