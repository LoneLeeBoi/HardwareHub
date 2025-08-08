import axios from "axios";

export async function UserFunctions(params = {}) {
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const queryString = Object.keys(params).length
    ? `?${new URLSearchParams(params).toString()}`
    : "";

  const url = `${baseUrl}/api/user${queryString}`;

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
