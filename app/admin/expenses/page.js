"use client";

import React, { useState, useEffect } from "react";
import { AddExpenseModal } from "@/app/popups/addExpenseModal";
import { ExpenseFunctions } from "@/app/components/functions/ExpenseFunctions";
import { Plus } from "@/public/icons/plus";
import { Edit } from "@/public/icons/edit";
import { Trash } from "@/public/icons/trash";
import { ConfirmationModal } from "@/app/popups/confirmationModal";
import useExpenseHandlers from "../expenses/expenseHandler";
import Pagination from "@/app/utils/Pagination";
import { Magnify } from "@/public/icons/magnify";
import CategoryFunctions from "@/app/components/functions/CategoryFunctions";

export default function ExpensePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    date: "",
    category_id: "",
    user_id: "",
  });

  const { expenses, isConfirm, setExpenses, setConfirm, handleDeleteExpense } =
    useExpenseHandlers();

  const fetchExpenses = async () => {
    const params = searchTerm
      ? { search: searchTerm, category_id_name: searchTerm }
      : {};
    const result = await ExpenseFunctions(params);
    if (result.success) {
      const data = result?.data?.data || [];
      setExpenses(data);
      setTotalPages(result?.data?.totalPages);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await CategoryFunctions();
      setCategories(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchExpenses();
  }, []);

  const handleInputChange = (field, value) => {
    setNewExpense({ ...newExpense, [field]: value });
  };

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : "Unknown";
  };

  const handleAddExpense = () => {
    if (isEditing) {
      setExpenses((prev) =>
        prev.map((item) =>
          item.id === editingId ? { ...newExpense, id: editingId } : item
        )
      );
    } else {
      setExpenses((prev) => [...prev, { ...newExpense, id: Date.now() }]);
    }
    setNewExpense({ name: "", amount: "", date: "", category_id: "" });
    setModalOpen(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (item) => {
    setNewExpense(item);
    setEditingId(item.id);
    setIsEditing(true);
    setModalOpen(true);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>
        <div
          onClick={() => {
            setIsEditing(false);
            setNewExpense({ name: "", amount: "", date: "", category_id: "" });
            setModalOpen(true);
          }}
          className="my-4 flex w-fit items-center uppercase gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          Expense
        </div>
      </div>

      <div className="w-full">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Expenses</h3>
        <div className="mb-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              fetchExpenses();
            }}
            className="flex items-center border border-gray-300 rounded-lg px-2 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500"
          >
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none !outline-none ring-0 focus:!outline-none focus:!ring-0"
            />
            <div onClick={fetchExpenses}>
              <Magnify className="h-7 w-7 text-gray-500 ml-2" />
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Name", "Amount (₱)", "Date", "Category", "Action"].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-8 text-center text-gray-400"
                  >
                    No expenses found.
                  </td>
                </tr>
              ) : (
                expenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {expense.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₱{expense.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {expense.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {getCategoryName(expense.category_id)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center gap-6">
                      <div
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <Edit className="size-6" />
                      </div>
                      <div
                        onClick={() => setConfirm(expense.id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash className="size-6" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </div>

      <AddExpenseModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        newExpense={newExpense}
        handleInputChange={handleInputChange}
        handleAddExpense={handleAddExpense}
        refreshExpense={fetchExpenses}
        isEditing={isEditing}
      />

      <ConfirmationModal
        isOpen={isConfirm}
        onClose={() => setConfirm("")}
        onConfirm={() => {
          if (isConfirm) {
            handleDeleteExpense(isConfirm);
            setConfirm("");
          }
        }}
        title="Are you sure?"
        message="This action cannot be undone."
      />
    </div>
  );
}
