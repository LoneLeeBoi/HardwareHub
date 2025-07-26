"use client";

import React, { useState } from "react";
import RegisterFunction from "../functions/RegisterFunction";
import globalState from "@/app/store/globalState";

export function Register({ toggleForm }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await RegisterFunction(formData);
    console.log(result);
  };

  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
        <div className="flex justify-center gap-2 pt-4">
          <span className="">Already have an account?</span>
          <span
            className="font-bold text-[14px] text-blue-500"
            onClick={() => {
              toggleForm();
            }}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
