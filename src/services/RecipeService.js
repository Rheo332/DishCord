const API_URL = import.meta.env.VITE_API_URL;

export async function getAllRecipes() {
  const response = await fetch(`${API_URL}/recipes`);
  if (!response.ok) {
    // TODO: maybe log error and show a message to the user
    throw new Error("Failed to fetch recipes");
  }
  const data = await response.json();
  return data;
}

export async function getRecipeById(id) {
  const response = await fetch(`${API_URL}/recipes/${id}`);
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to fetch recipe");
  }
  const data = await response.json();
  return data;
}

export async function createRecipe(recipe) {
  const response = await fetch(`${API_URL}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to create recipe");
  }
  const data = await response.json();
  return data;
}

export async function updateRecipe(id, recipe) {
  const response = await fetch(`${API_URL}/recipes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to update recipe");
  }
  const data = await response.json();
  return data;
}

export async function searchRecipes(query) {
  const response = await fetch(`${API_URL}/recipes/search?query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    // TODO: error handling
    throw new Error("Failed to search recipes");
  }
  const data = await response.json();
  return data;
}
