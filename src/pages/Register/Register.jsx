import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import dishcordLogo from "../../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", password: "", passwordVerify: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "username" && value && value.length >= 4) {
        delete newErrors.username;
      }
      if (name === "password" && value && value.length >= 8) {
        delete newErrors.password;
      }
      if (name === "passwordVerify" && value && value.length >= 8) {
        delete newErrors.passwordVerify;
      }
      return newErrors;
    });
  };

  async function registerClicked() {
    try {
      const res = await fetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username, password: user.password }),
      });

      if (res.ok) {
        navigate("/");
      } else {
        const error = await res.json();
        console.error(error);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  }

  const validate = () => {
    const errors = {};
    if (!user.username) {
      errors.username = "Username is required";
    } else if (user.username.length < 4) {
      errors.username = "Username must be at least 4 characters long";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!user.passwordVerify) {
      errors.passwordVerify = "Password verification is required";
    } else if (user.passwordVerify !== user.password) {
      errors.passwordVerify = "Passwords do not match";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      registerClicked();
    }
  };

  function toLogin() {
    navigate("/login");
  }

  return (
    <>
      <div className="wrapper">
        <h1>DishCord</h1>

        <img src={dishcordLogo} className="logo" alt="DishCord logo" />

        <form className="inputContainer" onSubmit={handleSubmit} noValidate>
          <input
            className={`register-input ${
              errors.username ? "invalid" : user.username.length >= 4 ? "valid" : ""
            }`}
            type="text"
            name="username"
            required
            minLength="4"
            placeholder="Enter username"
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <input
            className={`register-input ${
              errors.password ? "invalid" : user.password.length >= 8 ? "valid" : ""
            }`}
            type="password"
            name="password"
            required
            minLength="8"
            placeholder="Enter password"
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            className={`register-input ${
              errors.passwordVerify ? "invalid" : user.passwordVerify.length >= 8 ? "valid" : ""
            }`}
            type="password"
            name="passwordVerify"
            required
            minLength="8"
            placeholder="Verify password"
            onChange={handleChange}
          />
          {errors.passwordVerify && <p className="error">{errors.passwordVerify}</p>}
          <div id="registerButtons">
            <button type="button" onClick={toLogin}>
              Cancel
            </button>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
}
