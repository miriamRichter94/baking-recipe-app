import RecipeList from "@/components/RecipeList/RecipeList";
import { getAllRecipes } from "@/services/recipeServices";
import styled from "styled-components";
import useSWR from "swr";

export default function Favorites({
  favoriteRecipes,
  handleToggleFavoriteRecipe,
  recipesToShop,
  handleToggleRecipesToShop,
}) {
  const {
    data: recipes,
    isLoading,
    error,
  } = useSWR("/api/recipes", getAllRecipes);

  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  console.log(status);

  const favorites = recipes.filter((recipe) =>
    favoriteRecipes.includes(recipe._id)
  );

  return (
    <>
      <PageContent>
        <PageHeader>
          <PageTitle>Your Favorite Baking Recipes</PageTitle>
        </PageHeader>
        {favorites.length > 0 ? (
          <RecipeList
            recipes={favorites}
            favoriteRecipes={favoriteRecipes}
            handleToggleFavoriteRecipe={handleToggleFavoriteRecipe}
            recipesToShop={recipesToShop}
            handleToggleRecipesToShop={handleToggleRecipesToShop}
          />
        ) : (
          <EmptyFavoritesHint>
            Add Recipes as your Favorites!
          </EmptyFavoritesHint>
        )}
      </PageContent>
    </>
  );
}

const PageContent = styled.div`
  padding: 24px 20px;
  max-width: 960px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 40px 32px;
  }
`;

const PageHeader = styled.div`
  text-align: left;
  margin-bottom: 24px;

  @media (min-width: 641px) {
    text-align: center;
    margin-bottom: 40px;
  }
`;

const PageTitle = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  margin: 0 0 8px;
  font-weight: 400;
  color: #3d2b1f;
  white-space: pre-line;

  @media (min-width: 641px) {
    font-size: 42px;
  }
`;

const EmptyFavoritesHint = styled.p`
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  color: var(--danger);
`;
