"use client"
import { useState } from "react";

export default function Functions() {
  const [isOpen, setOpen] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [productData, setProduct] = useState([]);
  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [amountPaid, setAmountPaid] = useState("");

  const [cart, setCart] = useState([]);

  const [products] = useState([
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      acquisitionCost: 45.0,
      retailCost: 89.99,
      stock: 25,
      remainingStock: 25,
    },
    {
      id: 2,
      name: "Smartphone Case",
      acquisitionCost: 8.5,
      retailCost: 24.99,
      stock: 150,
      remainingStock: 8,
    },
    {
      id: 3,
      name: "Gaming Keyboard",
      acquisitionCost: 35.0,
      retailCost: 79.99,
      stock: 40,
      remainingStock: 3,
    },
    {
      id: 4,
      name: "Organic Green Tea",
      acquisitionCost: 12.0,
      retailCost: 28.5,
      stock: 80,
      remainingStock: 65,
    },
    {
      id: 5,
      name: "Protein Powder",
      acquisitionCost: 22.0,
      retailCost: 49.99,
      stock: 30,
      remainingStock: 4,
    },
    {
      id: 6,
      name: "Running Shoes",
      acquisitionCost: 55.0,
      retailCost: 129.99,
      stock: 20,
      remainingStock: 18,
    },
    {
      id: 7,
      name: "Yoga Mat",
      acquisitionCost: 15.0,
      retailCost: 39.99,
      stock: 35,
      remainingStock: 2,
    },
    {
      id: 8,
      name: "Desk Lamp",
      acquisitionCost: 18.0,
      retailCost: 45.99,
      stock: 50,
      remainingStock: 42,
    },
  ]);

  const isLowStock = (remainingStock, originalStock) => {
    const percentage = (remainingStock / originalStock) * 100;
    return percentage <= 20;
  };

  const lowStockProducts = products.filter((product) =>
    isLowStock(product.remainingStock, product.stock)
  );

  const regularStockProducts = products.filter(
    (product) => !isLowStock(product.remainingStock, product.stock)
  );

  // ===== Cart Logic =====

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          productName: product.name,
          price: product.retailCost,
          qty: 1,
        },
      ]);
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const updateCartQty = (id, qty) => {
    if (qty < 1) return;
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty } : item
      )
    );
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  };

  const calculateChange = () => {
    const total = calculateTotal();
    const paid = parseFloat(amountPaid) || 0;
    return paid - total;
  };

  const handleTransaction = () => {
    if (calculateTotal() === 0) {
      alert("Cart is empty.");
      return;
    }
    if (calculateChange() < 0) {
      alert("Insufficient payment.");
      return;
    }
    alert("Sale completed successfully!");
    // Reset
    setCart([]);
    setCustomerName("");
    setAmountPaid("");
  };

  return {
    isOpen,
    setOpen,
    isEdit,
    setEdit,
    productData,
    setProduct,
    isConfirmOpen,
    setConfirmOpen,
    products,
    cart,
    setCart,
    addToCart,
    removeFromCart,
    updateCartQty,
    calculateTotal,
    calculateChange,
    handleTransaction,
    customerName,
    setCustomerName,
    date,
    setDate,
    paymentMethod,
    setPaymentMethod,
    amountPaid,
    setAmountPaid,
    lowStockProducts,
    regularStockProducts,
  };
}