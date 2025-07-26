// searchState.js
import { create } from "zustand";

const searchState = create((set) => ({
  searchParams: "",
  setSearchParams: (value) => set({ searchParams: value }),
  
  products: [],
  setProducts: (products) => set({ products }),
}));

export default searchState;
