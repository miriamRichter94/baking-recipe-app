import { getAllIngredients } from "@/services/recipeService";
import useSWR from "swr";

export default function HomePage() {
  const {
    data: ingredients,
    isLoading,
    error,
  } = useSWR("/api/ingredients", getAllIngredients);

  if (isLoading || !ingredients) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;
  console.log(ingredients);
  return (
    <div>
      <h1>Hello from Next.js</h1>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient._id}>
            {ingredient.name} ({ingredient.nameDe})
          </li>
        ))}
      </ul>
    </div>
  );
}
