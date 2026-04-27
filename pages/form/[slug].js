import RecipeForm from "@/components/RecipeFormular/RecipeForm";
import { getAllIngredients } from "@/services/ingredientServices";
import { getRecipeById } from "@/services/recipeServices";
import { getAllUnits } from "@/services/unitServices";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function RecipeFormPage() {
  const router = useRouter();
  const { slug } = router.query;

  // slug is either "create" or "edit-<id>"
  const recipeId = slug?.startsWith("edit-") ? slug.split("edit-")[1] : null;

  const { data: ingredients, isLoading, error } = useSWR("/api/ingredients", getAllIngredients);
  const { data: units } = useSWR("/api/units", getAllUnits);
  const { data: recipe } = useSWR(
    recipeId ? `/api/recipes/${recipeId}` : null,
    getRecipeById
  );

  if (isLoading || !ingredients || !units || !slug) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return <RecipeForm ingredients={ingredients} units={units} recipe={recipe} />;
}
