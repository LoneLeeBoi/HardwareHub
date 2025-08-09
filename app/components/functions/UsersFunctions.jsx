import { isAuthorized } from "@/app/lib/auth";
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

export async function DeleteUser(productId) {
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");

  const url = `${baseUrl}/api/user/${productId}`;

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

export async function EditUser(UserData) {
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/user/${UserData.user_id}`;

  const form = new FormData();
    form.append("firstname", UserData.firstname);
    form.append("lastname", UserData.lastname);
    form.append("address", UserData.address);
    form.append("contact", UserData.contact);

  try {
    const res = await axios.put(url, form, {
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
        "Content-Type": "multipart/form-data",
      },
    });

    return true;
  } catch (error) {
    console.error(
      "Failed to edit user:",
      error.response?.data || error.message
    );
    return false;
  }
}
