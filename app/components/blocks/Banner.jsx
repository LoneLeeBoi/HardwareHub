import Image from "next/image";

export function Banner() {
  return (
    <section className="sm:py-6 sm:px-4 sm:container">
      <div className="relative w-full mx-auto h-[200px] md:h-[250px] sm:rounded-2xl shadow-md border border-gray-200 overflow-hidden">
        <Image
          src="/images/Banner.png"
          alt="Homepage Banner"
          fill
          priority
          className="sm:object-cover"
        />
      </div>
    </section>
  );
}
