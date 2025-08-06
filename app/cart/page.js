"use client";
import React, { useEffect, useState } from "react";
import RequestCart from "./requestCart";
import StorageCart from "./storageCart";
const page = () => {
  const [storedToken, setStoredToken] = useState();
  useEffect(() => {
    setStoredToken(localStorage?.getItem("token"));
  }, []);
  return <div>{storedToken ? <RequestCart /> : <StorageCart />}</div>;
};
export default page;
