"use client";

import { Login } from "./components/blocks/Login";
import { Register } from "./components/blocks/Register";
import globalState from "./store/globalState";

export default function Home() {
  const { isLog } = globalState();

  return <>{isLog ? <Register /> : <Login />}</>;
}
