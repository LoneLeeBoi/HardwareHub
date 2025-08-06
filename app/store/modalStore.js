import { create } from "zustand";

export const useModalStore = create((set) => ({
  isProductFormOpen: false,
  successProduct:false,
  openProductForm: () => set({ isProductFormOpen: true }),
  closeProductForm: () => set({ isProductFormOpen: false }),
  setSuccessProduct: () => set({ successProduct: true }),
}));
