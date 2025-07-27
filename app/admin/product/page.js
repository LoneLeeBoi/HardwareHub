"use client";
import { Plus } from "@/public/icons/plus";
import { useEffect, useState } from "react";
import ProductsTable from "../components/common/ProductsTable";
import ProductForm from "../components/common/ProductForm";
import { useModalStore } from "@/app/store/modalStore";
import { useCategoryModalStore } from "@/app/store/categoryStore";
import CategoryForm from "../components/common/CategoryForm";
export default function Page(props) {
  const [categories, setCategories] = useState([]);
  const { openCategoryForm } = useCategoryModalStore();
  const { isCategoryFormOpen } = useCategoryModalStore();
  const { closeCategoryForm } = useCategoryModalStore();
  const { success } = useCategoryModalStore();

  const { closeProductForm } = useModalStore();
  const { openProductForm } = useModalStore();
  const { isProductFormOpen } = useModalStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/product/categories");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchCategories();
  }, [success]);

  return (
    <div className="p-4 container">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">PRODUCTS</h2>

      {/* Action Buttons */}
      <div className="flex gap-4 w-fit mb-6">
        {/* Add Product Button */}
        <div
          onClick={openProductForm}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          PRODUCT
        </div>
        {isProductFormOpen && (
          <div className="h-full w-screen fixed top-0 left-0 flex items-center justify-center">
            <span
              className="fixed top-0 left-0 bg-black/40 w-screen h-full"
              onClick={closeProductForm}
            />
            <ProductForm />
          </div>
        )}

        <div
          onClick={openCategoryForm}
          className="flex items-center gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          CATEGORY
        </div>
        {isCategoryFormOpen && (
          <div className="h-full w-screen fixed top-0 left-0 flex items-center justify-center">
            <span
              className="fixed top-0 left-0 bg-black/40 w-screen h-full"
              onClick={closeCategoryForm}
            />
            <CategoryForm />
          </div>
        )}
      </div>

      <section className="grid grid-cols-12 gap-[6px]">
        <div className="flex flex-col gap-6 col-span-8">
          <ProductsTable />
        </div>
        <div className="w-full col-span-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">
            Categories
          </h3>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories?.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {category.name}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
