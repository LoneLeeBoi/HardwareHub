"use client";
import jwt from "jsonwebtoken";

export async function syncCartFromStorage() {
  const storedToken = localStorage.getItem("token");
  const cart = localStorage.getItem("app-cart-storage");

  if (!storedToken || !cart) return;

  let decoded;
  try {
    decoded = jwt.decode(storedToken);
  } catch (err) {
    console.error("Invalid token:", err);
    return;
  }

  const user_id = decoded?.id;
  const role = decoded?.role;

  if (!user_id || role !== "user") {
    console.warn("Cart sync aborted: Invalid user or role.");
    return;
  }

  const cartItems = JSON.parse(cart)?.state?.cart || [];

  let allSuccess = true;

  for (const item of cartItems) {
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          user_id: user_id,
          product_id: item?.id,
          quantity: item?.quantity,
        }),
      });

      const data = await res.json();

      const isAlreadyInCart = data?.error === "Product already in cart";
      if (!res.ok && !isAlreadyInCart) {
        console.error("Cart sync error:", data);
        allSuccess = false;
      } else {
        console.log("Cart sync response:", data);
      }
    } catch (err) {
      console.error("Failed to sync item:", item, err);
      allSuccess = false;
    }
  }

  if (allSuccess) {
    localStorage.removeItem("app-cart-storage");
    location.reload();
  }
}
