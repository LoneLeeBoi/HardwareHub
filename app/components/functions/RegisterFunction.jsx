"use server";

export default async function RegisterFunction({ username, email, password }) {
  const baseUrl = "http://localhost:3000";
  const url = `${baseUrl}/api/register`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Register error:", error.message);
    return { error: error.message };
  }
}
