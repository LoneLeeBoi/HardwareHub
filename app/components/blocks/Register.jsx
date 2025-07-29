"use client";

import React, { useState } from "react";
import RegisterFunction from "../functions/RegisterFunction";
import Image from "next/image";
import { toast } from "react-toastify";

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
      toast.error("Passwords do not match");
      return;
    }

    const result = await RegisterFunction(formData);

    switch (result.status) {
      case 201:
      case 200:
        toast.success("Thank you.");
        toggleForm();
        break;

      case 400:
        toast.error(result.message || "Bad request.");
        break;

      case 409:
        toast.error(result.message || "User already exists.");
        break;

      case 500:
        toast.error("Server error. Please try again later.");
        break;

      default:
        toast.error(result.message || "Registration failed.");
        break;
    }
  };

  return (
    <div className="relative z-10 flex items-center justify-center h-full">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative w-[150px] h-[150px]">
            <Image
              src="/images/LogoTwo.png"
              alt="logo"
              fill
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-3xl font-semibold">Hardware Hub</span>
            <span className="text-lg font-light">Powering Possibility</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4" autoComplete="off">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Register
          </button>
        </form>
        <div className="flex justify-center gap-2 pt-4">
          <span>Already have an account?</span>
          <span
            className="font-bold text-[14px] text-blue-500 cursor-pointer"
            onClick={toggleForm}
          >
            Login
          </span>
        </div>
      </div>
    </div>
  );
}
