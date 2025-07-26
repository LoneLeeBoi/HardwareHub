import axios from "axios";

export default async function LoginFunction({ email, password }) {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/login`;

  try {
    const res = await axios.post(url, { email, password });

    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message || "Login failed. Please try again.";

    return {
      success: false,
      status: status,
      err: message,
    };
  }
}
