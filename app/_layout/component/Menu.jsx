"use client";

import globalState from "@/app/store/globalState";
import { Bell } from "@/public/icons/bell";
import { Cart } from "@/public/icons/cart";
import { User } from "@/public/icons/user";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export function Menu(props) {
  const isLogged = globalState((state) => state.isLogged);
  const [token, setToken] = useState();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <>
      <Link
        href={"/cart"}
        className="px-2 py-2 hover:bg-gray-200 rounded-full text-sm"
      >
        <Cart className={`w-5 h-5`} />
      </Link>
      {isLogged ||
        (token && (
          <div className="flex">
            <div className="px-2 py-2 hover:bg-gray-200 rounded-full text-sm">
              <Bell className={`w-5 h-5`} />
            </div>
            <div className="hover:bg-green-300 px-2 py-2 rounded-full text-sm">
              <User className={`w-5 h-5`} />
            </div>
          </div>
        ))}
    </>
  );
}
