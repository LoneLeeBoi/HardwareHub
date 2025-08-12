"use client";

import React, { useEffect, useState } from "react";
import { ProductPopular } from "../functions/ProductFunctions";
import Image from "next/image";
import searchState from "@/app/store/searchState";
import { AddToCartModal } from "@/app/popups/addToCartModal";

const FALLBACK_IMAGE = "/images/fallback.png";

export function PopularProducts() {
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const setProducts = searchState((state) => state.setProducts);
  const products = searchState((state) => state.products);

  useEffect(() => {
    const fetchProducts = async () => {
      const result = await ProductPopular({ limit: 10 });

      if (result.success) {
        const data = result?.data?.data || [];
        setProducts(data);
      } else {
        setError(result.err || "Failed to fetch popular products.");
      }
    };

    fetchProducts();
  }, [setProducts]);

  const visibleProducts = showAll ? products : products.slice(0, 8);
  const uniqueProducts = visibleProducts.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (prod) => prod.name.toLowerCase() === item.name.toLowerCase()
      )
  );

  // Group same name products when clicked
  const handleAddToCartClick = (product) => {
    const sameNameProducts = products.filter(
      (item) => item.name === product.name
    );

    setSelectedProducts(sameNameProducts);
    setIsModalOpen(true);
  };

  return (
    <div className="container my-[24px]">
      {/* Header */}
      <h2 className="text-[30px] font-bold text-center">
        Our Popular Products
      </h2>

      <div className="py-4">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uniqueProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-xl px-4 pb-4 text-center border border-gray-200 hover:bg-gray-200 cursor-pointer"
                  onClick={() => handleAddToCartClick(product)}
                >
                  {/* Product Image */}
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name || "Product"}
                      fill
                      className="object-contain rounded-lg"
                    />
                    {/* TOP Flag */}
                    <div className="absolute z-[2] top-8 left-0 bg-red-600 text-white text-sm -translate-x-[10px] font-bold px-2 py-1 shadow">
                      TOP
                    </div>
                  </div>

                  {/* Product Name */}
                  <div className="font-semibold uppercase text-sm">
                    {product.name}
                  </div>

                  {/* Add to Cart Button */}
                  <div className="w-full flex justify-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // stop card click
                        handleAddToCartClick(product);
                      }}
                      className="mt-4 text-xs text-white py-2 font-black px-3 bg-red-700 hover:bg-red-800 w-fit rounded"
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

        {/* Add to Cart Modal */}
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProducts}
        />
      </div>
    </div>
  );
}
