"use client";

import React from "react";
import globalState from "@/app/store/globalState";

export default function CartPage() {
  const { cart, removeFromCart } = globalState();

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">
          {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
        </p>
      </header>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 flex justify-center">
            <img
              src={"/images/Cart.png"}
              alt={"Cart"}
              className="w-70 object-cover "
            />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-500 mb-6">
            Add some items to get started with your order.
          </p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <div
                  key={`${item.id}-${index}`}
                  className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center space-x-4 flex-1">
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.image || "/placeholder-product.jpg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                        onError={(e) => {
                          e.target.src =
                            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yOCAzMkM5IDMyIDMyIDkgMzIgMjhDMzIgNDcgOSA0OCAyOCA0OEM0NyA0OCA0OCA0NyA0OCAyOEM0OCA5IDQ3IDMyIDI4IDMyWiIgZmlsbD0iI0Q1RDlERCIvPgo8cGF0aCBkPSJNMzYgMjRIMzJWMzZIMzZWMjRaIiBmaWxsPSIjOTNBM0IzIi8+CjxwYXRoIGQ9Ik00MiAzMEgzOFYzNEg0MlYzMFoiIGZpbGw9IiM5M0EzQjMiLz4KPC9zdmc+";
                        }}
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Qty: {item.quantity || 1}</span>
                        <span>•</span>
                        <span>{formatPrice(item.price)} each</span>
                        <span>•</span>
                        <span className="font-medium text-gray-900">
                          {formatPrice(item.price * (item.quantity || 1))}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0 ml-4">
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      aria-label={`Remove ${item.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900">
                Total Amount:
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(calculateTotal())}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
