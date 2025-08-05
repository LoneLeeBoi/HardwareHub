import { create } from "zustand";
import { persist } from "zustand/middleware";

const globalState = create(
  persist(
    (set, get) => ({
      isLog: true,
      isLogged: false,
      cart: [],

      setLogout: (status) =>
        set({
          isLogged: status,
          cart: [], 
        }),

      setCart: (newCart) => set({ cart: newCart }),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
                  : i
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        }),

      removeFromCart: (itemId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        })),

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),
    }),
    {
      name: "app-cart-storage",
    }
  )
);

export default globalState;
