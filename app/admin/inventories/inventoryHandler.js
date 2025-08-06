"use client";

import { useState, useEffect } from "react";
import { InventoryFunctions, DeleteInventory } from "@/app/components/functions/InventoryFunctions";
import { toast } from "react-toastify";

export default function useInventoryHandlers() {
  const [inventory, setInventory] = useState([]);
  const [isConfirm, setConfirm] = useState(null);

  const triggerfetchInventory = async () => {
    const result = await InventoryFunctions();
    if (result.success) {
      const data = result?.data?.data || [];
      setInventory(data);
    } else {
      toast.error(result.err || "Failed to fetch inventorys.");
    }
  };

  useEffect(() => {
    triggerfetchInventory();
  }, []);

  const handleDeleteInventory = async (id) => {
    try {
      const success = await DeleteInventory(id);
      if (success) {
        toast.success("inventory deleted.");
        await triggerfetchInventory();
      }
    } catch {
      toast.error("Failed to delete inventory.");
    } finally {
      setConfirm(null);
    }
  };

  return {
    inventory,
    setInventory,
    isConfirm,
    setConfirm,
    handleDeleteInventory,
    triggerfetchInventory,
  };
}
