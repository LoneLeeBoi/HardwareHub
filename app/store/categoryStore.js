import { create } from "zustand";

export const useCategoryModalStore = create((set) => ({
  isCategoryFormOpen: false,
  success: false,
  openCategoryForm: () => set({ isCategoryFormOpen: true }),
  closeCategoryForm: () => set({ isCategoryFormOpen: false }),
  setSuccess:()=>set({success:true})
}));
