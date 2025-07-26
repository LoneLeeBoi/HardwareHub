import { create } from "zustand";

const globalState = create((set) => ({
  isLog: true,
  isLogged: false,
}));

export default globalState;
