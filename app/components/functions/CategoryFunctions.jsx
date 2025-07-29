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

export async function AddCategory(props) {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/product/categories`;

  const token = localStorage.getItem("token");

  try {
    const res = await axios.post(
      url,
      {
        name: props.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message ||
      "Adding category failed. Please try again.";

    return {
      success: false,
      status: status,
      err: message,
    };
  }
}

export async function EditCategory(props) {
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/product/categories/${props.id}`;

  try {
    const res = await axios.put(
      url,
      { name: props.name },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      success: true,
      status: res.status,
      data: res.data,
    };
  } catch (err) {
    const status = err.response?.status || 500;
    const message =
      err.response?.data?.message ||
      "Updating category failed. Please try again.";

    return {
      success: false,
      status: status,
      err: message,
    };
  }
}

export async function DeleteCategory(id) {
  const baseUrl = "http://localhost:3000";
  const token = localStorage.getItem("token");
  const url = `${baseUrl}/api/product/categories/${id}`;

  try {
    const res = await axios.delete(url, {
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
      "Deleting category failed. Please try again.";

    return {
      success: false,
      status: status,
      err: message,
    };
  }
}
