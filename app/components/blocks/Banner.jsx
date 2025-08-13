import React from "react";
import Image from "next/image";

export function Banner() {
  return (
    <section className="py-6 px-4">
      <div className="relative w-full max-w-7xl mx-auto h-[200px] md:h-[300px] rounded-2xl overflow-hidden shadow-md border border-gray-200">
        <Image
          src="/images/Banner.png"
          alt="Homepage Banner"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
