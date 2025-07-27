import React from "react";
import Image from "next/image";

export function Banner(props) {
  return (
    <div className="py-4">
      <Image
        src={`/images/Banner.png`}
        width={1080}
        height={300}
        alt="banner"
        className="w-full h-[300px] object-cover rounded-lg"
        priority
      />
    </div>
  );
}
