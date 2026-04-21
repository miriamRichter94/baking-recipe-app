import toast from "react-hot-toast";
import { mutate } from "swr";

export async function getAllIngredients() {
  const res = await fetch("/api/ingredients");

  if (!res.ok) throw new Error("Faild to fetch recipes");
  return res.json();
}

export async function getAllUnits() {
  const res = await fetch("/api/units");

  if (!res.ok) throw new Error("Faild to fetch recipes");
  return res.json();
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
