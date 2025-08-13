// Fix for retaining guest cart when logging in

import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  addUserCart,
  removeProduct,
} from "@/app/components/functions/CartFunctions";

const globalState = create(
  persist(
    (set, get) => ({
      isLogged: false,
      user: null, // stores email or userId
      carts: {}, // per-user cart: { [email]: [cartItems] }
      cart: [],

      setLogin: (userEmail, user) => {
        // ✅ Merge guest cart with user's existing cart (if any)
        const guestCart = get().carts["guest"] || [];
        const userCart = get().carts[userEmail] || [];

        // Merge logic: keep guest items + existing user items (avoid duplicate IDs)
        const mergedCart = [...userCart];
        guestCart.forEach((item) => {
          const existing = mergedCart.find((i) => i.id === item.id);
          if (existing) {
            existing.quantity += item.quantity || 1;
          } else {
            mergedCart.push(item);
          }
        });

        const updatedCarts = { ...get().carts, [userEmail]: mergedCart, guest: [] };

        set({
          isLogged: true,
          user,
          cart: mergedCart,
          carts: updatedCarts,
        });
      },

      setLogout: async (status) => {
        if (get().cart.length > 0) {
          try {
            await addUserCart(get().cart);
          } catch (err) {
            console.error("Cart sync failed:", err);
          }
        }

        const currentUser = get().user;
        const email = currentUser?.email || "guest";
        const currentCart = get().cart;
        const carts = { ...get().carts, [email]: currentCart };

        set({
          isLogged: status,
          user: null,
          cart: [],
          carts,
        });
      },

      // Cart actions
      setCart: (newCart) =>
        set((state) => {
          const email = state.user?.email || "guest";
          const updatedCarts = { ...state.carts, [email]: newCart };
          return { cart: newCart, carts: updatedCarts };
        }),

      addToCart: (item) =>
        set((state) => {
          let updatedCart;
          const existing = state.cart.find((i) => i.id === item.id);

          if (existing) {
            updatedCart = state.cart.map((i) =>
              i.id === item.id
                ? {
                    ...i,
                    quantity: (i.quantity || 1) + (item.quantity || 1),
                  }
                : i
            );
          } else {
            updatedCart = [...state.cart, { ...item, quantity: item.quantity || 1 }];
          }

          const email = state.user?.email || "guest";
          const updatedCarts = { ...state.carts, [email]: updatedCart };

          return { cart: updatedCart, carts: updatedCarts };
        }),

      removeFromCart: (itemId, cartID) => {
        const { isLogged } = get();

        if (isLogged) {
          removeProduct(cartID);
        }

        set((state) => ({
          cart: state.cart.filter((item) => item.id !== itemId),
        }));
      },

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          return { cart: updatedCart };
        }),

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
      name: "multi-user-cart-storage",
    }
  )
);

export default globalState;
