"use client";

import React, { useEffect, useState } from "react";
import globalState from "@/app/store/globalState";
import { CheckoutModal } from "../popups/checkoutModal";
import { Plus } from "@/public/icons/plus";
import { Minus } from "@/public/icons/minus";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function StorageCart() {
  const { cart, removeFromCart, updateQuantity, isLogged } = globalState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.cardID);
    setSelectedItems((prev) => prev.filter((id) => id !== itemId));
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(itemId)
        ? prevSelected.filter((id) => id !== itemId)
        : [...prevSelected, itemId]
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      if (selectedItems.includes(item.id)) {
        return total + item.price * (item.quantity || 1);
      }
      return total;
    }, 0);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);

  const selectedCartItems = cart.filter((item) =>
    selectedItems.includes(item.id)
  );

  const handleCheckOut = () => {
    const orderData = {
      user_id: localStorage.getItem("id"),
      payment_method: paymentMethod,
      items: selectedCartItems,
      stock: [
        ...selectedCartItems.map((item) => ({
          id: item.id,
          quantity: item.quantity || 1,
        })),
      ],
      total_amount: calculateTotal(),
    };
    console.log("order", orderData);
  };

  const SkeletonItem = () => (
    <div className="p-6 flex items-center justify-between animate-pulse">
      <div className="flex items-center space-x-4 flex-1">
        <div className="w-4 h-4 bg-gray-300 rounded" />
        <div className="w-20 h-20 bg-gray-200 rounded-lg" />
        <div className="flex-1 space-y-2">
          <div className="w-1/2 h-4 bg-gray-300 rounded" />
          <div className="w-2/3 h-3 bg-gray-200 rounded" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="w-4 h-4 bg-gray-300 rounded" />
            <div className="w-6 h-6 bg-gray-300 rounded" />
            <div className="w-20 h-3 bg-gray-200 rounded ml-4" />
          </div>
        </div>
      </div>
      <div className="w-20 h-8 bg-gray-300 rounded" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">
          {isLoading
            ? "Loading items..."
            : `${cart.length} item(s) in your cart`}
        </p>
      </header>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow-sm border divide-y divide-gray-200">
          {[...Array(3)].map((_, i) => (
            <SkeletonItem key={i} />
          ))}
        </div>
      ) : cart.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 flex justify-center">
            <img
              src={"/images/Cart.png"}
              alt={"Cart"}
              className="w-70 object-cover"
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
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-1"
                      style={{ width: "fit-content" }}
                    />
                    <div className="flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg border border-gray-200"
                      />
                    </div>
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
                        <div className="flex items-center gap-2">
                          <div
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          >
                            <Minus className="size-4 stroke-2" />
                          </div>
                          <span className="px-2 text-lg">
                            {item.quantity || 1}
                          </span>
                          <div
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                            className="cursor-pointer p-1 hover:bg-gray-100 rounded"
                          >
                            <Plus className="size-4 stroke-2" />
                          </div>
                        </div>
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
                      onClick={() => handleRemoveItem(item)}
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
                Selected Total:
              </span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            <div className="mt-6 text-right">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  if (isLogged) {
                    setIsCheckoutOpen(true);
                  } else {
                    toast.error("Please log in to proceed with checkout.");
                    setTimeout(() => {
                      router.push("/login");
                    }, 1000);
                  }
                }}
                disabled={selectedItems.length === 0}
                className={`px-6 py-3 rounded-lg transition font-semibold text-sm uppercase ${
                  selectedItems.length === 0
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={selectedCartItems}
        onConfirm={handleCheckOut}
        setPaymentMethod={setPaymentMethod}
      />
    </div>
  );
}
