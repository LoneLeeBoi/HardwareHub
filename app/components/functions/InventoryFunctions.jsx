import axios from "axios";


export async function InventoryFunctions(params = {}) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const queryString = Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const url = `${baseUrl}/api/inventory${queryString}`;

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
      "Fetching inventorys failed. Please try again.";

    return {
      success: false,
      status,
      err: message,
    };
  }
}

export async function AddInventory(inventoryData) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/inventory`;



  try {
    const res = await axios.post(url, inventoryData, {
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


export async function EditInventory(inventoryData) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/inventory/${inventoryData.id}`;

  
 
  try {
    const res = await axios.put(url, inventoryData, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to edit product:", error.response?.data || error.message);
    return false;
  }
}



export async function DeleteInventory(inventoryId) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/inventory/${inventoryId}`;

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
