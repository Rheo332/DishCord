import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import dishcordLogo from "../../assets/logo.png";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
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
      return newErrors;
    });
  };

  const navigate = useNavigate();

  async function login() {
    try {
      const res = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        // TODO: Handle success
        // Store user data in local storage or context
        const data = await res.json();
        localStorage.setItem("t", data.token);
        navigate("/");
      } else {
        // TODO: Handle error (show UI message)
        // "wrong password" or "user not found"
        const error = await res.json();
        console.error(error);
      }
    } catch (error) {
      // TODO: Handle error (show UI message)
      // "Network error" or "Server not reachable" probably
      console.error("Login error:", error);
    }
  }

  const validate = () => {
    const errors = {};
    if (!user.username) {
      errors.username = "Username is required";
    } else if (user.username.length < 4) {
      errors.username = "Username must be at least 4 characters";
    }
    if (!user.password) {
      errors.password = "Password is required";
    } else if (user.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      login();
    }
  };

  return (
    <div className="wrapper">
      <h1>DishCord</h1>
      <img src={dishcordLogo} className="logo" alt="DishCord logo" />

      <form className="inputContainer" onSubmit={handleSubmit} noValidate>
        <input
          className={`login-input ${
            errors.username ? "invalid" : user.username.length >= 4 ? "valid" : ""
          }`}
          type="text"
          name="username"
          required
          minLength="4"
          placeholder="Username"
          onChange={handleChange}
        />
        {errors.username && <p className="error">{errors.username}</p>}
        <input
          className={`login-input ${
            errors.password ? "invalid" : user.password.length >= 8 ? "valid" : ""
          }`}
          type="password"
          name="password"
          required
          minLength="8"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        <div className="loginButtons">
          <button type="button" onClick={() => navigate("/register")}>
            Register instead
          </button>
          <button type="submit">Login</button>
        </div>
      </form>
      <span className="guestLink" onClick={() => navigate("/")}>
        Or continue as Guest
      </span>
    </div>
  );
}
