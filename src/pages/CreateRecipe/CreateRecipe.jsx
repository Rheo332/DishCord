import { ArrowUpFromLine, X, Minus, Plus, ImageMinus, ImagePlus } from "lucide-react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateRecipe.css";

function CreateRecipe() {
  const navigate = useNavigate();

  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }]);
  const [showPopup, setShowPopUp] = useState(false);
  const [showImagePopup, setShowImagePopUp] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const fileInputRef = useRef(null);

  const create = () => {
    // post recipe to backend
    navigate("/");
  };

  const handleCancelEvent = () => {
    setShowPopUp(true);
  };

  const handleNo = () => {
    setShowPopUp(false);
  };

  const handleYes = () => {
    navigate("/");
    setShowPopUp(false);
  };

  const handleImagePopUpOk = () => {
    setShowImagePopUp(false);
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const addingredient = (e) => {
    e.preventDefault();
    setIngredients([...ingredients, { name: "", amount: "" }]);
  };

  const removeingredient = () => {
    if (ingredients.length <= 1) return;
    setIngredients(ingredients.slice(0, -1));
  };

  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.filter((file) => file.type.startsWith("image/"));
    if (newImages.length !== files.length) {
      setShowImagePopUp(true);
    }

    const combinedImages = [...images, ...newImages];

    const uniqueImages = Array.from(
      new Map(combinedImages.map((file) => [file.name, file])).values()
    );

    setImages(uniqueImages);
    setPreviews([]);

    const preview = uniqueImages.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));
    setPreviews((prev) => [...prev, ...preview]);
  };

  function autoResizeTextarea(e) {
    e.style.height = "auto";
    e.style.height = e.scrollHeight + "px";
  }

  return (
    <>
      <div className="create-recipe-wrapper">
        <h1 className="title create-top-nav">Create A Recipe</h1>

        <div className="create-recipe-body">
          <form className="create-recipe-form">
            <div className="form-group">
              <label htmlFor="recipe-title">Recipe Title</label>
              <input
                className="recipe-title"
                type="text"
                placeholder="Recipe Title"
                minLength="1"
                required
              />
            </div>

            <div className="form-group">
              <div className="ingredients-buttons">
                <label htmlFor="recipe-ingredients">Ingredients</label>
                <button className="add-ingredient" type="button" onClick={addingredient} aria-label="Add ingredient">
                  <Plus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
                </button>
                <button className="remove-ingredient" type="button" onClick={removeingredient} aria-label="Remove ingredient">
                  <Minus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
                </button>
              </div>
              {ingredients.map((ingredient, index) => (
                <div className="group-ingredients" key={index}>
                  <input
                    className="recipe-ingredients-name"
                    type="text"
                    placeholder="Ingredient"
                    minLength="1"
                    required
                    value={ingredient.name}
                    onChange={(e) => {
                      handleIngredientChange(index, "name", e.target.value);
                    }}
                  />
                  <input
                    className="recipe-ingredients-amount"
                    type="text"
                    placeholder="Amount"
                    minLength="1"
                    required
                    value={ingredient.amount}
                    onChange={(e) => {
                      handleIngredientChange(index, "amount", e.target.value);
                    }}
                  />
                </div>
              ))}
            </div>

            <div className="form-group">
              <label htmlFor="recipe-instructions">Instructions</label>
              <textarea
                className="recipe-instructions"
                placeholder="Instructions"
                minLength="1"
                required
                onInput={(e) => autoResizeTextarea(e.target)}
              />
            </div>

            <div className="form-group">
              <div className="recipe-image">
                <label htmlFor="recipe-image">Images</label>
                <button
                  className="recipe-image-upload-button"
                  type="button"
                  onClick={handleImageButtonClick}
                >
                  <ImagePlus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
                </button>
                <button
                  className="recipe-image-upload-button"
                  type="button"
                  onClick={() => {
                    setImages([]);
                    setPreviews([]);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = null;
                    }
                  }}
                >
                  <ImageMinus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
                </button>
                <input
                  className="upload-button"
                  type="file"
                  multiple
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                />
              </div>
              {previews.length > 0 && (
                <div className="image-preview">
                  {previews.map((preview, index) => (
                    <div className="image-preview-item" key={index}>
                      <img src={preview.url} alt={preview.name} className="image-preview-img" />
                    </div>
                  ))}
                  <div className="add-more-images">
                    <button
                      className="add-more-images-button secondary-button"
                      type="button"
                      onClick={handleImageButtonClick}
                    >
                      <Plus absoluteStrokeWidth={1} size={28} color="var(--color-text)" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup">
              Are you sure you want to cancel?
              <div className="popup-buttons">
                <button className="popup-cancel-buttons secondary-button" onClick={handleNo}>
                  No
                </button>
                <button className="popup-cancel-buttons primary-button" onClick={handleYes}>
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}

        {showImagePopup && (
          <div className="popup-overlay">
            <div className="popup">
              None image file deleted. Please select only image files.
              <div className="popup-buttons">
                <button
                  className="popup-cancel-buttons primary-button"
                  onClick={handleImagePopUpOk}
                >
                  Ok
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bottom-nav-create-recipe">
          <button className="cancel-button" onClick={handleCancelEvent}>
            <X size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
          </button>
          <button className="create-button" type="button" onClick={create}>
            <ArrowUpFromLine size={32} color="var(--color-primary)" absoluteStrokeWidth={1} />
          </button>
        </div>
      </div>
    </>
  );
}

export default CreateRecipe;
