"use client";

import React, { useState } from "react";
import LoginFunction from "../functions/LoginFunctions";
import globalState from "@/app/store/globalState";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    LoginFunction({ email, password });
  };

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 w-full h-full bg-gray-100 z-0">
        Banner
      </div>

      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-gray-500 w-[50px] h-[150px] flex items-center justify-center text-white text-lg font-bold">
              Logo
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
              className="text-blue-500 font-semibold hover:underline"
              onClick={() => {
                globalState.setState({ isLog: true });
              }}
            >
              Create Account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
