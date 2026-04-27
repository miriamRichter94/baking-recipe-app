import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import { getRecipeById } from "@/services/recipeServices";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: recipe, isLoading, error } = useSWR(
    id ? `/api/recipes/${id}` : null,
    getRecipeById
  );

  if (isLoading || !recipe) return <p>Loading...</p>;
  if (error) return <p>Something went wrong.</p>;

  return <RecipeDetails recipe={recipe} />;
}
