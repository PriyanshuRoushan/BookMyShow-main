import React, { useState } from "react";
import { loginUser, registerUser } from "../services/authapi.js";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");
  setLoading(true);

  try {
    // 🔥 Explicit payload (do NOT pass formData directly)
    const payload = {
      identifier: formData.identifier,
      password: formData.password,
    };

    // 🔍 Debug once – you can remove later
    console.log("SENDING PAYLOAD 👉", payload);

    const res = isLogin
      ? await loginUser(payload)
      : await registerUser(payload);

    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    navigate("/");
  } catch (err) {
    console.error("LOGIN ERROR 👉", err.response?.data || err);
    setError(
      err.response?.data?.message || "Authentication failed"
    );
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="login-register-container">
      <h1>{isLogin ? "Sign In" : "Create Account"}</h1>

      {error && <p className="error-text">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email or Phone Number</label>
        <input
          type="text"
          name="identifier"
          value={formData.identifier}
          onChange={handleChange}
          placeholder="Enter email or phone"
          required
        />

        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
          required
        />

        <button type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : isLogin
            ? "Login"
            : "Register"}
        </button>
      </form>

      <p
        className="toggle-auth"
        onClick={() => setIsLogin(!isLogin)}
      >
        {isLogin
          ? "New user? Create an account"
          : "Already have an account? Login"}
      </p>
    </div>
  );
};

export default LoginRegister;
