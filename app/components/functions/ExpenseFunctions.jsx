import axios from "axios";


export async function ExpenseFunctions(params = {}) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
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
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/expense`;

  try {
    const res = await axios.post(url, expenseData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "application/json",
      },
    });
    return { success: true };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { success: false, message: error.response.data.error };
    }
    console.error("Failed to add expense:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}



export async function EditExpense(expenseData) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/expense/${expenseData.id}`;

  
 
  try {
    const res = await axios.put(url, expenseData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return { success: true };
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { success: false, message: error.response.data.error };
    }
    console.error("Failed to add expense:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}



export async function DeleteExpense(expenseId) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/expense/${expenseId}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to add product:", error);
    return false;
  }
}
