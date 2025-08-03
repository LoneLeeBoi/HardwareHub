"use client";
import React from "react";
import RequestCart from "./requestCart";
import StorageCart from "./storageCart";
const page = () => {
  const storedToken = localStorage?.getItem("token");
  return <div>{storedToken ? <RequestCart /> : <StorageCart />}</div>;
};

export default page;
