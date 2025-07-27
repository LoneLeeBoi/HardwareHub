import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white shadow-inner">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 py-10 px-6">
        {/* Social Links */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold uppercase text-gray-800 mb-2">Follow Us On</h3>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-blue-600 transition">Facebook</Link></li>
            <li><Link href="/" className="hover:text-pink-500 transition">Instagram</Link></li>
            <li><Link href="/" className="hover:text-sky-500 transition">Twitter</Link></li>
            <li><Link href="/" className="hover:text-blue-700 transition">LinkedIn</Link></li>
          </ul>
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
