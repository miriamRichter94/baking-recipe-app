import RecipeList from "@/components/RecipeList/RecipeList";
import Page from "@/components/Page/Page";
import { getAllRecipes } from "@/services/recipeServices";
import { signIn, useSession } from "next-auth/react";
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
  const { data: userSession } = useSession();

  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  const favorites = recipes.filter((recipe) =>
    favoriteRecipes.includes(recipe._id)
  );

  return (
    <Page width="wide">
      <Page.Header align="center">
        <Page.Title size="hero">Your Favorite Baking Recipes</Page.Title>
        {!userSession && (
          <LoginHint>
            💡 <span>Log in to save your favorites across devices.</span>
            <SignInLink onClick={() => signIn("discord")}>Sign in</SignInLink>
          </LoginHint>
        )}
      </Page.Header>
      {favorites.length > 0 ? (
        <RecipeList
          recipes={favorites}
          favoriteRecipes={favoriteRecipes}
          handleToggleFavoriteRecipe={handleToggleFavoriteRecipe}
          recipesToShop={recipesToShop}
          handleToggleRecipesToShop={handleToggleRecipesToShop}
        />
      ) : (
        <EmptyFavoritesHint>Add Recipes as your Favorites!</EmptyFavoritesHint>
      )}
    </Page>
  );
}

const EmptyFavoritesHint = styled.p`
  font-size: 28px;
  text-align: center;
  font-weight: bold;
  color: var(--color-danger);
`;

const LoginHint = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--color-brand-light);
  color: var(--color-text);
  font-size: 14px;
  padding: 10px 16px;
  border-radius: 8px;
  margin-bottom: 24px;
`;

const SignInLink = styled.button`
  background: none;
  border: none;
  color: var(--color-brand);
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  font-size: 14px;
  text-decoration: underline;
`;
