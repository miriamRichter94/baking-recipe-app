import RecipeList from "@/components/RecipeList/RecipeList";
import { getAllRecipes } from "@/services/recipeServices";
import useSWR from "swr";

export default function HomePage() {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSWR("/api/recipes", getAllRecipes);

  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return <RecipeList recipes={recipes} />;
}
