export default async function LoginFunction({ email, password }) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (err) {
    console.error("Login error:", err);
    return { success: false, error: true };
  }
}
