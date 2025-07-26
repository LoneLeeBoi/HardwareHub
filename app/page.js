"use client";

import { useState } from "react";
import { Login } from "./components/blocks/Login";
import { Register } from "./components/blocks/Register";

export default function Home() {
  const [isLoginPage, setLoginPage] = useState(true);

  const toggleForm = () => {
    setLoginPage(!isLoginPage);
  };

  return (
    <>
      <div className="relative h-screen">
        <div className="absolute inset-0 w-full h-full bg-gray-100 z-0">
          Banner
        </div>
        {isLoginPage ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </div>
    </>
  );
}
