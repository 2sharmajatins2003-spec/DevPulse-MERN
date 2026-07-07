import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../services/authService";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUser(formData);

      localStorage.setItem("token", res.data.token);

      toast.success("Login Successful");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />

      <div className="login-card">
        <h1>DevPulse</h1>
        <p>Developer Learning Dashboard</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <span>
          Don't have an account?
          <Link to="/register"> Register</Link>
        </span>
      </div>
    </div>
  );
}

export default Login;