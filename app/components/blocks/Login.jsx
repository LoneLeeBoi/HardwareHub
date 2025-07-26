"use client";

import React, { useState } from "react";
import LoginFunction from "../functions/LoginFunctions";
import globalState from "@/app/store/globalState";
import { toast } from "react-toastify";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export function Login({ toggleForm }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await LoginFunction({ email, password });

    console.log(res);

    if (res.status === 200) {
      globalState.setState({ isLogged: true });
      localStorage.setItem("token", res?.data?.token);

      Cookies.set("token", res?.data?.token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      toast.success("Welcome dear user.");

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } else {
      if (res.status === 401) {
        toast.error("Invalid email or password.");
      } else {
        toast.error(res.err);
      }
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative  w-[150px] h-[150px] flex items-center justify-center text-white text-lg font-bold">
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
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>

        <div className="pt-4 text-center">
          <span className="text-sm">Don’t have an account? </span>
          <span
            type="button"
            className="text-blue-500 font-semibold hover:underline link"
            onClick={() => {
              toggleForm();
            }}
          >
            Create Account
          </span>
        </div>
      </div>
    </div>
  );
}
