import axios from "axios";

export async function getUserCart() {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const url = `${baseUrl}/api/cart?user_id=${localStorage.getItem("id")}`;

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

export async function addUserCart(cart) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const url = `${baseUrl}/api/cart`;
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  try {
    const responses = await Promise.all(
      cart.map((item) => {
        const data = {
          user_id: id,
          product_id: item.id,
          quantity: Number(item.quantity),
        };

        return axios.post(url, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      })
    );

    return {
      success: true,
      status: 200,
      data: responses.map((res) => res.data),
    };
  } catch (err) {
    const status = err?.response?.status || 500;
    const message =
      err?.response?.data?.message ||
      "Adding to cart failed. Please try again.";

    return {
      success: false,
      status,
      err: message,
    };
  }
}

export async function removeProduct(id) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const url = `${baseUrl}/api/cart/${id}`;
  const token = localStorage.getItem("token");

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
      "Removing product from cart failed. Please try again.";

    return {
      success: false,
      status: status,
      err: message,
    };
  }
}
