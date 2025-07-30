import axios from "axios";


export async function ExpenseFunctions(params = {}) {
  const baseUrl = "http://localhost:3000";
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
  const baseUrl = "http://localhost:3000";
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
    console.error("Failed to add product:", error);
    return false;
  }
}
