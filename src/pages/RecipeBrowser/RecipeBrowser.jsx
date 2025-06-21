import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSwipeable } from "react-swipeable";
import RecipeTileList from "../../components/RecipeTileList/RecipeTileList";
import { useAuth } from "../../contexts/authContext.jsx";
import { useUserData } from "../../contexts/userDataContext.jsx";
import { getAllRecipes, searchRecipes } from "../../services/RecipeService";
import { getUserData } from "../../services/UserService.js";
import "./RecipeBrowser.css";

function RecipeBrowser() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  let { userData, setUserData } = useUserData();
  let { isAuthenticated } = useAuth();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate("/"),
  });

  useEffect(() => {
    getAllRecipes().then((r) => {
      setRecipes(r);
    });

    if (isAuthenticated) {
      getUserData(setUserData);
    }
  }, [isAuthenticated, setUserData]);

  const handleInput = (event) => {
    event.preventDefault();
    const query = event.target.value;
    searchRecipes(query).then((r) => {
      setRecipes(r);
    });
  };

  return (
    <div className="recipe-browser-wrapper" {...swipeHandlers}>
      <h1 className="title">Recipe Browser</h1>
      <form role="search" className="recipe-search-form">
        <input
          className="search-input"
          type="search"
          name="query"
          placeholder="Search..."
          onInput={handleInput}
        />
      </form>
      <div className="recipe-browser">
        <RecipeTileList
          recipes={recipes}
          setRecipes={setRecipes}
          user={userData?.user}
          setUserData={setUserData}
        />
      </div>
    </div>
  );
}

export default RecipeBrowser;
