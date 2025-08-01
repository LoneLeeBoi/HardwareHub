import axios from "axios";

const baseUrl = "http://localhost:3000";

export async function ExpenseFunctions(params = {}) {
  const token = localStorage.getItem("token");

  const queryString = Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const url = `${baseUrl}/api/expense${queryString}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message ||
      "Fetching expenses failed. Please try again.";

    return {
      success: false,
      status,
      err: message,
    };
  }
}

export async function AddExpense(expenseData) {
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/expense`;

  try {
    const res = await axios.post(url, expenseData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to add expense:", error);
    return false;
  }
}

export async function EditExpense(expenseData) {
  const token = localStorage.getItem("token");

  if (!expenseData.id) {
    console.error("Missing expense ID for update.");
    return false;
  }

  const url = `${baseUrl}/api/expense/${expenseData.id}`;

  try {
    const res = await axios.put(url, expenseData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to update expense:", error);
    return false;
  }
}

export async function DeleteExpense(id) {
  const token = localStorage.getItem("token");

  if (!id) {
    console.error("Missing expense ID for deletion.");
    return false;
  }

  const url = `${baseUrl}/api/expense/${id}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to delete expense:", error);
    return false;
  }
}
