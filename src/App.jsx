import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import BottomNav from "./components/BottomNav/BottomNav.jsx";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RecipeBrowser from "./pages/RecipeBrowser/RecipeBrowser.jsx";
import Register from "./pages/Register/Register.jsx";

import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  const hideNav = location.pathname === "/login" || location.pathname === "/register";

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("t");
      if (token) {
        try {
          const res = await fetch("/auth/status", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: token,
            },
          });
          if (res.ok) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Error checking authentication status:", error);
          setIsAuthenticated(false);
        }
      }
      setIsLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipe-browser" element={<RecipeBrowser />} />
        <Route
          path="/profile"
          element={
            isLoading ? (
              <div>Loading...</div>
            ) : isAuthenticated ? (
              <Profile />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      {!hideNav && <BottomNav />}
    </>
  );
}

export default App;
