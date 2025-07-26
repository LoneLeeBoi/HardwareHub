import Image from "next/image";
import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 shadow-lg">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4">
        {/* Social Links */}
        <div className="flex flex-col gap-2 uppercase text-sm">
          <h3 className="font-bold mb-2">Follow Us On</h3>
          <Link href="/" className="hover:underline">Facebook</Link>
          <Link href="/" className="hover:underline">Instagram</Link>
          <Link href="/" className="hover:underline">Twitter</Link>
          <Link href="/" className="hover:underline">LinkedIn</Link>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-lg font-semibold mb-2">About Us</h3>
          <p className="text-sm text-gray-600">
            Hardware Hub is a modern platform dedicated to streamlining the
            hardware shopping experience. With a wide selection of tools,
            building materials, and equipment, we aim to provide convenience,
            quality, and reliability. Whether you're stocking up for a project
            or managing a store, Hardware Hub is your one-stop solution.
          </p>
        </div>

        {/* Logo */}
        <div className="flex flex-col items-center justify-center gap-4">
          <Image
            src="/images/LogoTwo.png"
            alt="Hardware Hub Logo"
            width={120}
            height={120}
            className="object-contain"
          />
          <span className="text-xl font-bold">HARDWARE HUB</span>
        </div>
      </div>
    </footer>
  );
}
