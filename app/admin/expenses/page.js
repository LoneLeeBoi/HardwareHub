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
export default function ExpensePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    expenses,
    isConfirm,
    setExpenses,
    setConfirm,
    handleDeleteExpense,
    triggerfetchExpenses,
  } = useExpenseHandlers();

  const fetchExpenses = async () => {
    const params = searchTerm
      ? { search: searchTerm, category_name: searchTerm }
      : {};
    const result = await ExpenseFunctions(params);
    if (result.success) {
      const data = result?.data?.data || [];
      setExpenses(data);
      setTotalPages(result?.data?.totalPages);
      triggerfetchExpenses();
    } else {
      setError(result.err || "Failed to fetch Expense.");
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
    user_id: "",
  });

  const handleInputChange = (field, value) => {
    setNewExpense({ ...newExpense, [field]: value });
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

    setNewExpense({ name: "", amount: "", date: "", category: "" });
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
      <div className=" mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Expense Tracker</h1>

        <div
          onClick={() => {
            setIsEditing(false);
            setNewExpense({ name: "", amount: "", date: "", category: "" });
            setModalOpen(true);
          }}
          className="my-4 flex w-fit items-center uppercase gap-3 px-6 py-3 bg-gray-100 hover:bg-blue-700 text-gray-700 hover:text-white rounded-lg font-xs font-black transition-colors duration-200 shadow-sm hover:shadow-md cursor-pointer"
        >
          <Plus className="size-5 stroke-3" />
          Expense
        </div>
      </div>

      {/* Table */}
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
            <div className="" onClick={fetchExpenses}>
              <Magnify className="h-7 w-7 text-gray-500 ml-2" />
            </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount (₱)
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
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
                expenses?.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {expense.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">
                        ₱{expense.amount}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {expense.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {expense.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center  gap-6">
                      <div
                        onClick={() => handleEdit(expense)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                      >
                        <Edit className={`size-6`} />
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

      {/* Modal */}
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
        onClose={() => {
          if (isConfirm) {
            setConfirm("");
          }
        }}
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