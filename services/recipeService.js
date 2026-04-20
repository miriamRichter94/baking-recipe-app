export async function getAllIngredients() {
  const res = await fetch("/api/ingredients");

  if (!res.ok) throw new Error("Faild to fetch recipes");
  return res.json();
}
