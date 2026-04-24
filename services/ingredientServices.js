/*
 *
 * Ingredient requests
 *
 */
export async function getAllIngredients() {
  const res = await fetch("/api/ingredients");

  if (!res.ok) throw new Error("Failed to fetch ingredients");
  return res.json();
}
