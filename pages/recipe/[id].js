import RecipeDetails from "@/components/RecipeDetails/RecipeDetails";
import { getRecipeById } from "@/services/recipeServices";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";

export default function DetailsPage({
  favoriteRecipes,
  handleToggleFavoriteRecipe,
  recipesToShop,
  handleToggleRecipesToShop,
}) {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: recipe,
    isLoading,
    error,
  } = useSWR(`/api/recipes/${id}`, getRecipeById);

  if (isLoading || !recipe) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  return (
    <DesktopWrapper>
      <RecipeDetails
        recipe={recipe}
        favoriteRecipes={favoriteRecipes}
        onToggleFavoriteRecipe={handleToggleFavoriteRecipe}
        recipesToShop={recipesToShop}
        onToggleRecipesToShop={handleToggleRecipesToShop}
      />
    </DesktopWrapper>
  );
}

const DesktopWrapper = styled.div`
  @media (min-width: 641px) {
    padding: 36px 40px;
    max-width: 960px;
    margin: 0 auto;
  }
`;
