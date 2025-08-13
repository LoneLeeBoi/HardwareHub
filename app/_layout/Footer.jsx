"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export function Footer() {
  const [user, setUser] = useState("user");
  useEffect(() => {
    setUser(localStorage.getItem("role"));
  }, []);

  if (user === "admin") {
    return null;
  }
  return (
    <footer className="border-t border-gray-200 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-10 px-6">
        {/* Social Links */}
        <div className="flex flex-col gap-2 uppercase text-sm">
          <h3 className="font-bold mb-2">Follow Us On</h3>
          <Link href="/" className="hover:underline">
            Facebook
          </Link>
          <Link href="/" className="hover:underline">
            Instagram
          </Link>
          <Link href="/" className="hover:underline">
            Twitter
          </Link>
          <Link href="/" className="hover:underline">
            LinkedIn
          </Link>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-sm font-semibold uppercase text-gray-800 mb-2">About Us</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Hardware Hub is a modern platform dedicated to streamlining the hardware shopping experience.
            We provide tools, materials, and equipment with convenience, quality, and reliability.
            Whether you're stocking up for a project or managing a store, Hardware Hub is your one-stop solution.
          </p>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center md:items-end text-center md:text-right gap-4">
          <Image
            src="/images/LogoTwo.png"
            alt="Hardware Hub Logo"
            width={100}
            height={100}
            className="object-contain"
          />
          <span className="text-lg font-bold tracking-wide text-gray-900">HARDWARE HUB</span>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 pb-6">
        © {new Date().getFullYear()} Hardware Hub. All rights reserved.
      </div>
    </footer>
  );
}
