import toast from "react-hot-toast";
import { mutate } from "swr";

/*
 *
 * Recipe requests
 *
 */
export async function getAllRecipes() {
  const res = await fetch("/api/recipes");

  if (!res.ok) throw new Error("Faild to fetch recipes");
  return res.json();
}

export async function getRecipeById(url) {
  const response = await fetch(url);

  if (!response.ok) throw new Error("Faild to fetch recipe");
  return response.json();
}

export async function addRecipie(recipeData) {
  const response = await fetch(`/api/recipes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recipeData),
  });

  if (response.ok) {
    await mutate("/api/recipes");
    toast.success("Recipe successfully saved!");
  } else {
    toast.error("Failed to save recipe.");
  }
}

/*
 *
 * Ingredient requests
 *
 */
export async function getAllIngredients() {
  const res = await fetch("/api/ingredients");

  if (!res.ok) throw new Error("Faild to fetch ingredients");
  return res.json();
}

/*
 *
 * Units requests
 *
 */
export async function getAllUnits() {
  const res = await fetch("/api/units");

  if (!res.ok) throw new Error("Faild to fetch units");
  return res.json();
}
