import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addUserCart,
  removeProduct,
} from "@/app/components/functions/CartFunctions";

const globalState = create(
  persist(
    (set, get) => ({
      isLog: true,
      isLogged: false,
      cart: [],

      setLogout: async (status) => {
        if (get().cart.length > 0) {
          try {
            await addUserCart(get().cart);
          } catch (err) {
            console.error("Cart sync failed:", err);
          }
        }

        set({
          isLogged: status,
          cart: [],
        });
      },

      setCart: (newCart) => set({ cart: newCart }),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);

          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      quantity: (i.quantity || 1) + (item.quantity || 1),
                    }
                  : i
              ),
            };
          } else {
            return { cart: [...state.cart, item] };
          }
        }),

      removeFromCart: (itemId, cartID) => {
        removeProduct(cartID);
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        })),

      mergeCartOnLogin: (tempCart) => {
        const currentCart = get().cart;
        const mergedCart = [...currentCart];

        tempCart.forEach((tempItem) => {
          const index = mergedCart.findIndex((i) => i.id === tempItem.id);

          if (index > -1) {
            mergedCart[index].quantity =
              (mergedCart[index].quantity || 1) + (tempItem.quantity || 1);
          } else {
            mergedCart.push(tempItem);
          }
        });

        set({ cart: mergedCart });
      },
    }),
    {
      name: "app-cart-storage",
    }
  )
);

export default globalState;
