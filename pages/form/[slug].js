import RecipeForm from "@/components/RecipeFormular/RecipeForm";
import { getAllIngredients, getAllUnits } from "@/services/recipeService";
import useSWR from "swr";

export default function RecipeFormular() {
  const {
    data: ingredients,
    isLoading,
    error,
  } = useSWR("/api/ingredients", getAllIngredients);
  const { data: units } = useSWR("/api/units", getAllUnits);

  if (isLoading || !ingredients || !units) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <>
      <h1>The Formular </h1>
      <p>The Formular page</p>
      <RecipeForm ingredients={ingredients} units={units} />
    </>
  );
}
