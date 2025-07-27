"use client";

import React, { useState } from "react";
import LoginFunction from "../functions/LoginFunctions";
import globalState from "@/app/store/globalState";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import jwt from "jsonwebtoken";

// Spinner component
function Spinner() {
  return (
    <div className="fixed flex inset-0 w-full h-full justify-center items-center bg-black/50 mt-4">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}

export function Login({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // loading state
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // show spinner

    try {
      const res = await LoginFunction({ email, password });

      if (res.status === 200) {
        const token = res?.data?.token;
        const decoded = jwt.decode(token);
        const role = decoded?.role;

        globalState.setState({ isLogged: true });
        localStorage.setItem("token", token);

        Cookies.set("token", token, {
          expires: 1,
          secure: true,
          sameSite: "strict",
        });

        if (role === "admin") {
          toast.success("Welcome admin.");
        } else {
          toast.success("Welcome dear user.");
        }

        // Delay to allow animation to show before redirect
        setTimeout(() => {
          if (role === "admin") {
            router.push("/admin");
          } else {
            router.push("/");
          }
        }, 1000);
      } else {
        if (res.status === 401) {
          toast.error("Invalid email or password.");
        } else {
          toast.error(res.err || "Something went wrong.");
        }
      }
    } catch (err) {
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false); // hide spinner
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
          <span
            className="text-blue-500 font-semibold hover:underline cursor-pointer"
            onClick={() => toggleForm()}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}
