import { useNavigate } from "react-router-dom";
import "./Home.css";
import dishcordLogo from "../../assets/logo.png";
import { useAuth } from "../../authContext.jsx";
import ServiceStatus from "../../components/ServiceStatus/ServiceStatus.jsx";

function Home() {
  const navigate = useNavigate();
  let { isAuthenticated, setIsAuthenticated } = useAuth();
  let showSignInButton = !isAuthenticated;
  let showLogoutButton = isAuthenticated;

  function toLogin() {
    navigate("/login");
  }

  function logoutToLogin() {
    setIsAuthenticated(false);
    localStorage.removeItem("t");
    navigate("/login");
  }

  return (
    <>
      {showSignInButton && (
        <button id="signInButton" className="secondary-button" onClick={toLogin}>
          Sign In
        </button>
      )}
      {showLogoutButton && (
        <button id="logoutButton" className="secondary-button" onClick={logoutToLogin}>
          Logout
        </button>
      )}
      <div className="home-wrapper">
        <img src={dishcordLogo} className="logo" alt="DishCord logo" />
        <h1 className="title">DishCord</h1>
        <ServiceStatus />
      </div>
    </>
  );
}

export default Home;
