"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import Link from "next/link";
import { toast } from "react-toastify";

import globalState from "@/app/store/globalState";
import LoginFunction from "../components/functions/LoginFunctions";
import { getUserCart } from "../components/functions/CartFunctions";
import { syncCartFromStorage } from "../cart/AppCartSync";
// Spinner Component
const Spinner = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setCart } = globalState();

  const fetchCart = async () => {
    try {
      const res = await getUserCart();
      setCart(res?.data?.data || []);
    } catch (err) {
      console.error("Cart fetch error", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await LoginFunction({ email, password });

      if (res.status === 200) {
        const token = res?.data?.token;
        const decoded = jwt.decode(token);
        const { role, id } = decoded || {};
        await syncCartFromStorage();
        globalState.setState({ isLogged: true });
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        Cookies.set("token", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        toast.success(
          role === "admin" ? "Welcome admin." : "Welcome dear user."
        );

        const serverCartResponse = await getUserCart();
        const serverCart = serverCartResponse?.data?.data || [];

        const guestCart =
          JSON.parse(localStorage.getItem("app-cart-storage"))?.state?.cart ||
          [];

        const mergedCart = [...serverCart];

        guestCart.forEach((tempItem) => {
          const index = mergedCart.findIndex(
            (i) => i.product_id === tempItem.product_id
          );

          if (index > -1) {
            mergedCart[index].quantity =
              (mergedCart[index].quantity || 1) + (tempItem.quantity || 1);
          } else {
            mergedCart.push(tempItem);
          }
        });

        globalState.getState().setCart(mergedCart);

        setTimeout(() => {
          router.push(role === "admin" ? "/admin" : "/");
        }, 1000);
      } else {
        toast.error(
          res.status === 401
            ? "Invalid email or password."
            : res.err || "Something went wrong."
        );
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-[150px] h-[150px]">
            <Image
              src="/images/LogoTwo.png"
              alt="Hardware Hub Logo"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Hardware Hub</h1>
            <p className="text-lg font-light">Powering Possibility</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="px-4 py-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className={`py-2 px-4 font-semibold text-white rounded transition-all ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>
          {loading && <Spinner />}
        </form>

        <div className="pt-4 text-center text-sm">
          Don’t have an account?{" "}
          <Link
            href="/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
