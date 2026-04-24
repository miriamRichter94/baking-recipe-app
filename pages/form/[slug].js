import RecipeForm from "@/components/RecipeFormular/RecipeForm";
import { getAllIngredients } from "@/services/ingredientServices";
import { getRecipeById } from "@/services/recipeServices";
import { getAllUnits } from "@/services/unitServices";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function RecipeFormular() {
  const router = useRouter();
  const { slug } = router.query;

  const recipeId = slug?.split("-")[1];

  const {
    data: ingredients,
    isLoading,
    error,
  } = useSWR("/api/ingredients", getAllIngredients);
  const { data: units } = useSWR("/api/units", getAllUnits);
  const { data: recipe } = useSWR(
    recipeId ? `/api/recipes/${recipeId}` : null,
    getRecipeById
  );

  if (isLoading || !ingredients || !units || !slug) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <h1>Create A recipe</h1>
      <RecipeForm ingredients={ingredients} units={units} recipe={recipe} />
    </>
  );
}
