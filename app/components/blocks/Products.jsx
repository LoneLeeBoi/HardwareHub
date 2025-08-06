"use client";

import React, { useEffect, useState } from "react";
import { ProductFunctions } from "../functions/ProductFunctions";
import Image from "next/image";
import searchState from "@/app/store/searchState";
import { AddToCartModal } from "@/app/popups/addToCartModal";

const FALLBACK_IMAGE = "/images/fallback.png";

export function Products() {
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // ⭐ Modal product state
  const [isModalOpen, setIsModalOpen] = useState(false); // ⭐ Modal visibility state

  const setProducts = searchState((state) => state.setProducts);
  const products = searchState((state) => state.products);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await ProductFunctions();

      if (result.success) {
        const data = result?.data?.data || [];
        setProducts(data);
      } else {
        setError(result.err || "Failed to fetch products.");
      }
    };

    fetchCategories();
  }, [setProducts]);

  const handleAddToCartClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const visibleProducts = showAll ? products : products.slice(0, 20);

  return (
    <div className="container">
      <div className="uppercase text-center border-t-8 bg-gray-300 py-4 text-[20px] text-primary font-bold border-primary w-full">
        discover more
      </div>

      <div className="py-4">
        {error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white shadow-md rounded-xl px-4 pb-4 text-center border border-gray-200 hover:bg-gray-200"
                  onClick={() => handleAddToCartClick(product)}
                >
                  <div className="relative w-full h-48 mb-2">
                    <Image
                      src={product.image || FALLBACK_IMAGE}
                      alt={product.name || "Product"}
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                  <div className="font-semibold uppercase text-sm">
                    {product.name}
                  </div>
                  <div className="w-full flex justify-center">
                    <button
                      onClick={() => handleAddToCartClick(product)} // 👈 handle click
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

        {/* ⭐ Modal */}
        <AddToCartModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
        />
      </div>
    </div>
  );
}
