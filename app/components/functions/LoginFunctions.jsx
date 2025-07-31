import axios from "axios";
import jwt from "jsonwebtoken";
import globalState from "@/app/store/globalState";

export default async function LoginFunction({ email, password }) {
  const baseUrl = "http://localhost:3000"; // Or use an environment variable
  const url = `${baseUrl}/api/login`;

  try {
    const res = await axios.post(url, { email, password });

    const { token, role } = res.data;

    // Save token to localStorage
    localStorage.setItem("token", token);

    // Optional: decode token to get role (fallback to response role)
    const decoded = jwt.decode(token);
    const userRole = decoded?.role || role || "guest";

    // Update Zustand global state
    globalState.getState().setLogin(userRole);

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
