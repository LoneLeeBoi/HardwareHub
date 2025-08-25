export default async function RegisterFunction({ username, email, password }) {
  const baseUrl = "https://w0q5x1x4-3000.asse.devtunnels.ms";
  const url = `${baseUrl}/api/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: data.message || "Registration failed",
      };
    }

    return {
      success: true,
      status: response.status,
      data,
    };
  } catch (error) {
    console.error("Register error:", error.message);
    return {
      success: false,
      status: 500, // Default for server/network error
      message: error.message || "Something went wrong",
    };
  }
}
