import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import { getRecipeById } from "@/services/recipeService";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: recipe,
    isLoading,
    error,
  } = useSWR(`/api/recipes/${id}`, getRecipeById);

  if (isLoading || !recipe) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return <RecipeDetails recipe={recipe} />;
}
