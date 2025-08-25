import axios from "axios";

export async function UserFunctions(params = {}) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
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
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
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
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const url = `${baseUrl}/api/user/${id}`;

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

export async function AddDetails(UserData) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const url = `${baseUrl}/api/user/${id}`;

  const form = new FormData();
  form.append("firstname", UserData.firstname);
  form.append("lastname", UserData.lastname);
  form.append("address", UserData.address);
  form.append("contact", UserData.contact);

  try {
    const res = await axios.post(url, form, {
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

export async function GetDetails(id) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/user/${id}`;

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.data;
  } catch (error) {
    console.error(
      "Failed to get user details:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function PasswordValidation(password) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  try {
    const res = await axios.post(
      `${baseUrl}/api/user/password/${id}`,
      { password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    return false;
  }
}

export async function ChangeUserPassword(password) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  try {
    const res = await axios.patch(
      `${baseUrl}/api/user/password/${id}`,
      { password },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  } catch (error) {
    return false;
  }
}
