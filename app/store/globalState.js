import { create } from "zustand";
import { persist } from "zustand/middleware";

const globalState = create(
  persist(
    (set, get) => ({
      isLogged: false,
      user: null, // stores email or userId
      carts: {},  // per-user cart: { [email]: [cartItems] }

      // Auth actions
      setLogin: (user) => {
        const userEmail = user.email;
        const userCart = get().carts[userEmail] || [];
        set({
          isLogged: true,
          user,
          cart: userCart,
        });
      },

      setLogout: () => {
        const currentUser = get().user;
        if (currentUser) {
          const email = currentUser.email;
          const currentCart = get().cart;
          const carts = { ...get().carts, [email]: currentCart };
          set({
            isLogged: false,
            user: null,
            cart: [],
            carts,
          });
        } else {
          set({ isLogged: false, user: null, cart: [] });
        }
      },

      // Cart actions
      cart: [],
      setCart: (newCart) => set({ cart: newCart }),

      addToCart: (item) =>
        set((state) => {
          const existing = state.cart.find((i) => i.id === item.id);
          let updatedCart;
          if (existing) {
            updatedCart = state.cart.map((i) =>
              i.id === item.id
                ? { ...i, quantity: (i.quantity || 1) + (item.quantity || 1) }
                : i
            );
          } else {
            updatedCart = [...state.cart, { ...item, quantity: item.quantity || 1 }];
          }

          // update in both cart and carts store
          const email = state.user?.email;
          const updatedCarts = { ...state.carts, [email]: updatedCart };

          return { cart: updatedCart, carts: updatedCarts };
        }),

      removeFromCart: (itemId) =>
        set((state) => {
          const updatedCart = state.cart.filter((item) => item.id !== itemId);
          const email = state.user?.email;
          const updatedCarts = { ...state.carts, [email]: updatedCart };
          return { cart: updatedCart, carts: updatedCarts };
        }),

      updateQuantity: (itemId, quantity) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          );
          const email = state.user?.email;
          const updatedCarts = { ...state.carts, [email]: updatedCart };
          return { cart: updatedCart, carts: updatedCarts };
        }),

      // Computed helpers
      getCartLength: () => get().cart.length,
      getTotalQuantity: () =>
        get().cart.reduce((total, item) => total + (item.quantity || 1), 0),
    }),
    {
      name: "multi-user-cart-storage",
    }
  )
);

export default globalState;
