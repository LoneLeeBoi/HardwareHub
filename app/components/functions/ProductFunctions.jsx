import axios from "axios";
import jwt from "jsonwebtoken";

export async function ProductFunctions(params = {}) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const queryString = Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const url = `${baseUrl}/api/product${queryString}`;

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
      "Fetching products failed. Please try again.";

    return {
      success: false,
      status,
      err: message,
    };
  }
}

export async function ProductPopular(params = {}) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const queryString = Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const url = `${baseUrl}/api/product${queryString}`;

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
      "Fetching products failed. Please try again.";

    return {
      success: false,
      status,
      err: message,
    };
  }
}

export async function AddProduct(productData) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(localStorage.getItem("token"));
  const url = `${baseUrl}/api/product`;

  const form = new FormData();
  form.append("user_id", productData.user_id || decoded?.id);
  form.append("name", productData.name);
  form.append("acquisition_cost", productData.acquisition_cost);
  form.append("price", productData.price);
  form.append("category_id", productData.category_id);
  form.append("image", productData.image);
  form.append("units", productData.units);
  form.append("stock", productData.stock);

  try {
    const res = await axios.post(url, form, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
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

export async function EditProduct(productData) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/product/${productData.id}`;

  const form = new FormData();
  form.append("user_id", productData.user_id);
  form.append("name", productData.name);
  form.append("acquisition_cost", productData.acquisition_cost);
  form.append("price", productData.price);
  form.append("category_id", productData.category_id);
  form.append("units", productData.units);
  form.append("stock", productData.stock);

  if (productData.image instanceof File) {
    form.append("image", productData.image);
  }

  try {
    const res = await axios.put(url, form, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
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

export async function DeleteProduct(productId) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/product/${productId}`;

  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    console.error("Failed to add product:", error);
    return false;
  }
}
