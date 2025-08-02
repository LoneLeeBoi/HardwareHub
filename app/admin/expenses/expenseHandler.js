"use client";

import { useState, useEffect } from "react";
import { ExpenseFunctions, DeleteExpense } from "@/app/components/functions/ExpenseFunctions";
import { toast } from "react-toastify";

export default function useExpenseHandlers() {
  const [expenses, setExpenses] = useState([]);
  const [isConfirm, setConfirm] = useState(null);

  const triggerfetchExpenses = async () => {
    const result = await ExpenseFunctions();
    if (result.success) {
      const data = result?.data?.data || [];
      setExpenses(data);
    } else {
      toast.error(result.err || "Failed to fetch expenses.");
    }
  };

  useEffect(() => {
    triggerfetchExpenses();
  }, []);

  const handleDeleteExpense = async (id) => {
    try {
      const success = await DeleteExpense(id);
      if (success) {
        toast.success("Expense deleted.");
        await triggerfetchExpenses();
      }
    } catch {
      toast.error("Failed to delete expense.");
    } finally {
      setConfirm(null);
    }
  };

  return {
    expenses,
    setExpenses,
    isConfirm,
    setConfirm,
    handleDeleteExpense,
    triggerfetchExpenses,
  };
}
