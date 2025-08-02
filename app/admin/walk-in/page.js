"use client";
import React, { useState } from "react";

export default function Page() {
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountPaid, setAmountPaid] = useState("");

  const products = [
    { id: 1, productName: "Book", price: 799.3, unit: "Pc", stock: 35, qty: 1 },
    { id: 2, productName: "Pen", price: 69.3, unit: "Pc", stock: 50, qty: 1 },
    { id: 3, productName: "School Uniform - Pink", price: 650, unit: "Pc", stock: 25, qty: 1 },
    { id: 4, productName: "Shoes", price: 1899.58, unit: "Pc", stock: 15, qty: 1 },
  ];

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product }]);
    }
  };

  const updateCartQty = (id, newQty) => {
    if (newQty <= 0) {
      setCart(cart.filter((item) => item.id !== id));
    } else {
      setCart(
        cart.map((item) => (item.id === id ? { ...item, qty: newQty } : item))
      );
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + item.price * item.qty;
    }, 0);
  };

  const calculateChange = () => {
    const total = calculateTotal();
    const paid = parseFloat(amountPaid) || 0;
    return paid - total;
  };

  const handleTransaction = () => {
    if (!customerName.trim()) {
      alert("Please enter customer name");
      return;
    }
    if (cart.length === 0) {
      alert("Please add items to cart");
      return;
    }
    if (parseFloat(amountPaid) < calculateTotal()) {
      alert("Amount paid is less than total");
      return;
    }

    alert(
      `Transaction completed for ${customerName}!\nTotal: ₱${calculateTotal().toFixed(
        2
      )}\nChange: ₱${calculateChange().toFixed(2)}`
    );

    // Reset form
    setCart([]);
    setCustomerName("");
    setAmountPaid("");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Walk-In Customer Sale
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Available Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Available Product
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 font-medium">Product Name</th>
                  <th className="text-left p-2 font-medium">Price</th>
                  <th className="text-left p-2 font-medium">Per Unit</th>
                  <th className="text-left p-2 font-medium">Stock</th>
                  <th className="text-left p-2 font-medium">Qty</th>
                  <th className="text-left p-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">{product.productName}</td>
                    <td className="p-2">₱{product.price}</td>
                    <td className="p-2">{product.unit}</td>
                    <td className="p-2">{product.stock}</td>
                    <td className="p-2">{product.qty}</td>
                    <td className="p-2">
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-blue-500 text-white px-3 py-1 rounded text-xs hover:bg-blue-600 transition-colors"
                      >
                        Add
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Search
            </button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">
              Refresh
            </button>
          </div>
        </div>

        {/* Cart */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Cart</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-2 font-medium">Product</th>
                  <th className="text-left p-2 font-medium">Price</th>
                  <th className="text-left p-2 font-medium">Qty</th>
                  <th className="text-left p-2 font-medium">Amount</th>
                  <th className="text-left p-2 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-2">{item.productName}</td>
                    <td className="p-2">₱{item.price}</td>
                    <td className="p-2">
                      <input
                        type="number"
                        value={item.qty}
                        onChange={(e) =>
                          updateCartQty(item.id, parseInt(e.target.value))
                        }
                        className="w-16 px-1 py-1 border rounded text-center"
                        min="1"
                      />
                    </td>
                    <td className="p-2">
                      ₱{(item.price * item.qty).toFixed(2)}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center font-semibold text-lg border-t pt-4">
            <span>Total:</span>
            <span>₱{calculateTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Payment Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Payment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Customer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date:
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payment Method:
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Cash">Cash</option>
              <option value="Card">Card</option>
              <option value="GCash">GCash</option>
              <option value="Bank Transfer">Bank Transfer</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount Paid:
            </label>
            <input
              type="number"
              value={amountPaid}
              onChange={(e) => setAmountPaid(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
            />
          </div>
        </div>

        {amountPaid && (
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <div className="flex justify-between">
              <span>Total: ₱{calculateTotal().toFixed(2)}</span>
              <span>Amount Paid: ₱{parseFloat(amountPaid).toFixed(2)}</span>
              <span
                className={`font-semibold ${
                  calculateChange() >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                Change: ₱{calculateChange().toFixed(2)}
              </span>
            </div>
          </div>
        )}

        <button
          onClick={handleTransaction}
          className="bg-blue-500 text-white px-6 py-2 rounded font-medium hover:bg-blue-600 transition-colors"
        >
          Complete Sale
        </button>
      </div>
    </div>
  );
}
