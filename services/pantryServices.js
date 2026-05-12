import toast from "react-hot-toast";
import { mutate } from "swr";

/*
 *
 * Pantry requests
 *
 */
export async function addPantryItem({ ingredient, amount, unit }) {
  const response = await fetch("/api/pantry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredient, amount, unit }),
  });

  if (response.ok) {
    await mutate("/api/pantry");
    toast.success("Ingredient added to pantry!");
    return true;
  }

  if (response.status === 409) {
    toast.error("Ingredient is already in your pantry.");
  } else {
    toast.error("Failed to add ingredient.");
  }
  return false;
}

export async function updatePantryItem(ingredientId, { amount, unit }) {
  const response = await fetch(`/api/pantry/${ingredientId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount, unit }),
  });

  if (response.ok) {
    await mutate("/api/pantry");
    toast.success("Pantry updated!");
    return true;
  }

  toast.error("Failed to update pantry item.");
  return false;
}

export async function deletePantryItem(ingredientId) {
  const response = await fetch(`/api/pantry/${ingredientId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    await mutate("/api/pantry");
    toast.success("Removed from pantry!");
    return true;
  }

  toast.error("Failed to remove ingredient.");
  return false;
}
