import axios from "axios";

export default async function CategoryFunctions() {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/product/categories`;

  const token = localStorage.getItem("token");

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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
      "Fetching categories failed. Please try again.";

    return {
      success: false,
      status: status,
      err: message,
    };
  }
}
