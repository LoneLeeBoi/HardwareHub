import React from "react";
import Image from "next/image";

export function Banner() {
  return (
    <section className="sm:py-6 sm:px-4 sm:container">
      <div className="relative w-full  mx-auto h-[200px] md:h-[300px] sm:rounded-2xl overflow-hidden shadow-md border border-gray-200">
        <Image
          src="/images/Banner.png"
          alt="Homepage Banner"
          fill
          className="sm:object-cover"
          priority
        />
      </div>
    </section>
  );
}
