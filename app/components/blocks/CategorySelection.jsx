"use client";

import React from "react";
import Image from "next/image";
import searchState from "@/app/store/searchState";
// import CategoryFunctions from "../functions/CategoryFunctions";

export function CategorySelection() {
  const searchParams = searchState((state) => state.searchParams);

  // const [categories, setCategories] = useState([]);
  // const [error, setError] = useState("");

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     const res = await CategoryFunctions();

  //     if (res.success) {
  //       setCategories(res.data);
  //     } else {
  //       setError(res.err || "Failed to fetch categories");
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const categories = [
    {
      id: 1,
      label: "T-Shirts",
      image: "/images/tshirt.jpg",
    },
    {
      id: 2,
      label: "Hoodies",
      image: "/images/hoodie.jpg",
    },
    {
      id: 3,
      label: "Sneakers",
      image: "/images/sneakers.jpg",
    },
    {
      id: 4,
      label: "Accessories",
      image: "/images/accessories.jpg",
    },
  ];

  return (
    <div className="py-4">
      <h2 className="text-[30px] font-bold mb-4">Select a Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() =>
              searchState.setState({ searchParams: category.label })
            }
            className="border rounded-lg p-4 flex flex-col items-center hover:shadow transition cursor-pointer"
          >
            <Image
              src={"/images/fallback.png"}
              alt={category.label}
              width={100}
              height={100}
              className="rounded object-cover size-[100px]"
            />
            <div className="mt-2 text-center font-bold text-sm">
              {category.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
