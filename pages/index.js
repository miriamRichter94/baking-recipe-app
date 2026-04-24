import RecipeList from "@/components/RecipeList/RecipeList";
import { getAllRecipes } from "@/services/recipeServices";
import Link from "next/link";
import useSWR from "swr";

export default function HomePage() {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSWR("/api/recipes", getAllRecipes);

  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <div>
      <h1>Baking Recipes</h1>
      <Link href="/form/create">Add a Recipe here!</Link>
      <RecipeList recipes={recipes} />
    </div>
  );
}
