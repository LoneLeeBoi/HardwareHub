import axios from "axios";

export async function ProductFunctions(params = {}) {
  const baseUrl = "http://localhost:3000";
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
  const baseUrl = "http://localhost:3000";
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
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/product`;

  const form = new FormData();
  form.append("user_id", productData.user_id);
  form.append("name", productData.name);
  form.append("price", productData.price);
  form.append("category_id", productData.category_id);
  form.append("image", productData.image);

  try {
    const res = await axios.post(url, form, {
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

export async function EditProduct(productData) {
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/product`;

  const form = new FormData();
  form.append("user_id", productData.user_id);
  form.append("name", productData.name);
  form.append("price", productData.price);
  form.append("category_id", productData.category_id);
  form.append("image", productData.image);

  try {
    const res = await axios.post(url, form, {
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

export async function DeleteProduct(productId) {
  const baseUrl = "http://localhost:3000";
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
