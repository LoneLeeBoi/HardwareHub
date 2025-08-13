"use client";

import React, { useState } from "react";
import Image from "next/image";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import globalState from "@/app/store/globalState";
import LoginFunction from "../functions/LoginFunctions";
import { syncCartFromStorage } from "@/app/cart/AppCartSync";

function Spinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await LoginFunction({ email, password });

      if (res.status === 200) {
        const token = res?.data?.token;
        const decoded = jwt.decode(token);
        const { role, id } = decoded || {};

        globalState.setState({ isLogged: true });
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        Cookies.set("token", token, { expires: 1, secure: true, sameSite: "strict" });

        toast.success(role === "admin" ? "Welcome admin." : "Welcome dear user.");

        await syncCartFromStorage();
        await fetchCart();

        setTimeout(async () => {
          if (role === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }, 1000);
      } else {
        const msg = res.status === 401 ? "Invalid email or password." : res.err || "Something went wrong.";
        toast.error(msg);
      }
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Logo Section */}
        <div className="mb-6 flex items-center gap-4">
          <div className="relative flex h-[150px] w-[150px] items-center justify-center">
            <Image src="/images/LogoTwo.png" alt="logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">Hardware Hub</span>
            <span className="text-lg font-light">Powering Possibility</span>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded border border-gray-300 px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded border border-gray-300 px-4 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className={`rounded py-2 px-4 font-semibold text-white transition-all ${
              loading ? "cursor-not-allowed bg-blue-300" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "LOG IN"}
          </button>
        </form>

        <div className="pt-4 text-center">
          <span className="text-sm">Don’t have an account? </span>
          <Link
            href="/auth/register"
            className="text-blue-500 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
