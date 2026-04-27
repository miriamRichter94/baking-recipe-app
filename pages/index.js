import RecipeList from "@/components/RecipeList/RecipeList";
import { getAllRecipes } from "@/services/recipeServices";
import useSWR from "swr";

export default function HomePage() {
  const { data: recipes, isLoading, error } = useSWR("/api/recipes", getAllRecipes);

  if (isLoading || !recipes) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return <RecipeList recipes={recipes} />;
}
