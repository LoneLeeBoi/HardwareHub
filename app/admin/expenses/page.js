"use client";
import { AddExpenseModal } from "@/app/popups/addExpenseModal";
import { Close } from "@/public/icons/close";
import { Edit } from "@/public/icons/edit";
import { Plus } from "@/public/icons/plus";
import { Trash } from "@/public/icons/trash";
import React, { useState } from "react";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      name: "Electricity Bill",
      amount: 2500,
      date: "2024-01-15",
      category: "Utilities",
    },
    {
      id: 2,
      name: "Groceries",
      amount: 1800,
      date: "2024-01-14",
      category: "Food",
    },
    {
      id: 3,
      name: "Internet Bill",
      amount: 1200,
      date: "2024-01-13",
      category: "Utilities",
    },
    {
      id: 4,
      name: "Gas",
      amount: 3000,
      date: "2024-01-12",
      category: "Transportation",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newExpense, setNewExpense] = useState({
    name: "",
    amount: "",
    date: "",
    category: "",
  });

  const totalExpense = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const highestExpense = Math.max(...expenses.map((expense) => expense.amount));
  const categoryCount = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + 1;
    return acc;
  }, {});
  const mostFrequentCategory = Object.keys(categoryCount).reduce((a, b) =>
    categoryCount[a] > categoryCount[b] ? a : b
  );

  const summaryData = [
    { label: "TOTAL EXPENSE", value: `₱ ${totalExpense.toLocaleString()}` },
    { label: "HIGHEST EXPENSE", value: `₱ ${highestExpense.toLocaleString()}` },
    { label: "MOST FREQUENT", value: mostFrequentCategory },
  ];

  const handleAddExpense = () => {
    if (
      newExpense.name &&
      newExpense.amount &&
      newExpense.date &&
      newExpense.category
    ) {
      const expense = {
        id: Date.now(),
        name: newExpense.name,
        amount: parseFloat(newExpense.amount),
        date: newExpense.date,
        category: newExpense.category,
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ name: "", amount: "", date: "", category: "" });
      setIsModalOpen(false);
    }
  };

  const handleDeleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const handleInputChange = (field, value) => {
    setNewExpense((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        EXPENSE DASHBOARD
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {summaryData.map((item, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 border">
            <span className="text-sm text-gray-500 font-medium">
              {item.label}
            </span>
            <div className="text-2xl font-bold text-gray-800 mt-2">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Add Expense Button */}
      <div className="mb-6">
        <div
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 w-fit hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className={`size-4 stroke-3`} />
          Add New Expense
        </div>
      </div>

      {/* Expense Table */}
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {expenses.map((expense) => (
                <tr key={expense.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {expense.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₱ {expense.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(expense.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {expense.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <div className="text-blue-600 hover:text-blue-800 p-1">
                        <Edit className={`size-4 `} />
                      </div>
                      <div
                        onClick={() => handleDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash className={`size-4 `} />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Expense Modal */}
      {isModalOpen && (
        <AddExpenseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newExpense={newExpense}
          handleInputChange={handleInputChange}
          handleAddExpense={handleAddExpense}
        />
      )}
    </div>
  );
}
