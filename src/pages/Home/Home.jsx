import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useSwipeable } from "react-swipeable";
import dishcordLogo from "../../assets/logo.png";
import CreateRecipeButton from "../../components/CreateRecipeButton/CreateRecipeButton.jsx";
import ServiceStatus from "../../components/ServiceStatus/ServiceStatus.jsx";
import { useAuth } from "../../contexts/authContext.jsx";
import { useUserData } from "../../contexts/userDataContext.jsx";
import { getUserData } from "../../services/UserService.js";

function Home() {
  const navigate = useNavigate();
  let { isAuthenticated, setIsAuthenticated } = useAuth();
  let showSignInButton = !isAuthenticated;
  let showLogoutButton = isAuthenticated;
  let { setUserData } = useUserData();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate("/profile"),
    onSwipedRight: () => navigate("/recipe-browser"),
  });

  function toLogin() {
    navigate("/login");
  }

  useEffect(() => {
    if (isAuthenticated) {
      getUserData(setUserData);
    }
  }, [isAuthenticated, setUserData]);

  function logoutToLogin() {
    setIsAuthenticated(false);
    setUserData(null);
    localStorage.removeItem("t");
    setUserData({
      username: "",
      ownRecipes: [],
      likedRecipes: [],
      dislikedRecipes: [],
      favoriteRecipes: [],
    });
    navigate("/login");
  }

  return (
    <div {...swipeHandlers}>
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
      <CreateRecipeButton />
    </div>
  );
}

export default Home;
