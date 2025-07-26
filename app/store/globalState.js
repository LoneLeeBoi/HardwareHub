import { create } from "zustand";

const globalState = create((set) => ({
  isLog: true,
  isLogged: false,
  cart: [],

  // Set the whole cart
  setCart: (newCart) => set({ cart: newCart }),

  // Add item to cart
  addToCart: (item) =>
    set((state) => ({
      cart: [...state.cart, item],
    })),

  // Remove item from cart by ID (assuming item has an `id` field)
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    })),

  // Toggle login state
  setLoggedIn: (value) => set({ isLogged: value }),
}));

export default globalState;
