import globalState from "@/app/store/globalState";

export default async function LoginFunction({ email, password }) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (data.success) {
      globalState.setState({ isLog: true });
    } else {
      alert("Invalid login");
    }
  } catch (err) {
    console.error("Login error:", err);
  }
}
