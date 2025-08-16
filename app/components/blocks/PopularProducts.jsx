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
    <div className="container mx-auto px-4 sm:py-10">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-gray-800 font-serif">
        Our Popular Products
      </h2>

      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-4">
            {visibleProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer"
                onClick={() => handleAddToCartClick(product)}
              >
                <div className="relative w-full h-[250px] mb-3 rounded-t-2xl overflow-hidden">
                  <Image
                    src={product.image || FALLBACK_IMAGE}
                    alt={product.name || "Product"}
                    fill
                    className="object-fill h-full w-full"
                  />
                  <div className="absolute top-5 left-0 bg-red-600 text-white text-md font-semibold px-2 py-1 rounded shadow-md">
                    TOP
                  </div>
                </div>

                <div className="font-semibold text-sm text-gray-700 uppercase mb-2 truncate text-center">
                  {product.name}
                </div>

                <div className="flex justify-center p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering modal twice
                      handleAddToCartClick(product);
                    }}
                    className="text-xs bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full transition-all"
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products.length > 20 && !showAll && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(true)}
                className="px-6 py-2 bg-black text-white rounded-full font-semibold hover:bg-opacity-80 transition-all"
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
  );
}
