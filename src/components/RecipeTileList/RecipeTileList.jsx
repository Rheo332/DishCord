import { ThumbsUp, ThumbsDown, Bookmark } from "lucide-react";
import { useState } from "react";
import "./RecipeTileList.css";

const RecipeTileList = ({ recipes }) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleBookmarkClick = (recipeId) => {
    // handle the bookmark click
    console.log(`Bookmark clicked for recipe ID: ${recipeId}`);
  };

  return (
    <>
      <div className="tile-list">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="tile" onClick={() => setSelectedRecipe(recipe)}>
            <Bookmark
              className="bookmark"
              color="yellow"
              size={32}
              onClick={(e) => {
                e.stopPropagation();
                handleBookmarkClick(recipe.id);
              }}
            />
            <div className="tile-content">
              <p className="tile-name">{recipe.name}</p>
              <p className="tile-author">{"- " + recipe.author}</p>
            </div>
            <div className="tile-ratings">
              <div className="tile-rating-icons">
                <ThumbsUp color="green" size={20} />
                <ThumbsDown color="red" size={20} />
              </div>
              <div className="tile-rating-values">
                <span>{77}</span>
                <span>{44}</span>
              </div>
            </div>
            {recipe.imageUrls && recipe.imageUrls.length > 0 && (
              <img
                className="tile-image"
                src={`${import.meta.env.VITE_API_URL}${recipe.imageUrls[0]}`}
                alt={recipe.name}
              />
            )}
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="modal" onClick={() => setSelectedRecipe(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedRecipe.name}</h2>

            <article>
              <div className="ingredient-list">
                <h3>Zutaten</h3>
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="ingredient-item">
                    <span className="ingredient-name">{ingredient.name}</span>
                    <span className="ingredient-amount">{ingredient.amount}</span>
                  </div>
                ))}
              </div>
            </article>

            <article>
              <h3>Zubereitung</h3>
              <p>{selectedRecipe.preparation}</p>
            </article>

            <button
              className="secondary-button floating-close-button"
              onClick={() => setSelectedRecipe(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeTileList;
