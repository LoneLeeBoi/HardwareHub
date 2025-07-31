"use client";

import React, { useState } from "react";
import LoginFunction from "../functions/LoginFunctions";
import globalState from "@/app/store/globalState";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";
import Link from "next/link";

function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin" />
        <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-500 rounded-full shadow-lg animate-ping transform -translate-x-1/2 -translate-y-1/2" />
      </div>
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
        const role = decoded?.role;
        const name = decoded?.name || "User";

        globalState.setState({ isLogged: true });

        localStorage.setItem("token", token);
        Cookies.set("token", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        if (role === "admin") {
          toast.success("Welcome, Admin.");
        } else {
          toast.success(`Welcome,  ${res.data.name}.`);
        }

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
    } catch {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center h-full min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-[150px] h-[150px] flex items-center justify-center text-white text-lg font-bold">
            <Image
              src="/images/LogoTwo.png"
              alt="logo"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-3xl font-semibold">Hardware Hub</span>
            <span className="text-lg font-light">Powering Possibility</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border border-gray-300 rounded px-4 py-2"
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
