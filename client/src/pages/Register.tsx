import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { registerUser } from "../services/authService";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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
      const res = await registerUser(formData);

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <ToastContainer />

      <div className="register-card">
        <h1>DevPulse</h1>
        <p>Create Your Developer Account</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <button type="submit">Register</button>
        </form>

        <span>
          Already have an account?
          <Link to="/"> Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;