import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import RecipeTileList from "../../components/RecipeTileList/RecipeTileList";
import { getAllRecipes, searchRecipes } from "../../services/RecipeService";
import "./RecipeBrowser.css";

function RecipeBrowser() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getAllRecipes().then((r) => {
      setRecipes(r);
    });
  }, []);

  const handleInput = (event) => {
    event.preventDefault();
    const query = event.target.value;
    searchRecipes(query).then((r) => {
      setRecipes(r);
    });
  };

  return (
    <div className="recipe-browser-wrapper">
      <h1 className="title">Recipe Browser</h1>
      <form role="search" className="recipe-search-form">
        <input
          className="search-input"
          type="search"
          name="query"
          placeholder="Search..."
          onInput={handleInput}
        />
        <button type="submit" className="recipe-search-button">
          <Search size={30} absoluteStrokeWidth={1} color="var(--color-primary)" />
        </button>
      </form>
      <div className="recipe-browser">
        <RecipeTileList recipes={recipes} />
      </div>
    </div>
  );
}

export default RecipeBrowser;
