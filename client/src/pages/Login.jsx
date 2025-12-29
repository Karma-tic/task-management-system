import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/dashboard"); // ✅ redirect after success
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
  <div style={{ maxWidth: "400px", margin: "60px auto" }}>
    <h2>Login</h2>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button style={{ width: "100%" }} type="submit">
        Login
      </button>
    </form>

    <p style={{ marginTop: "15px", textAlign: "center" }}>
      Don’t have an account?{" "}
      <a href="/register">Create one</a>
    </p>
  </div>
);
};

export default Login;
