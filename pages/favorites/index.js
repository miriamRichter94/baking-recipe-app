import RecipeList from "@/components/RecipeList/RecipeList";
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
    <>
      <PageContent>
        <PageHeader>
          <PageTitle>Your Favorite Baking Recipes</PageTitle>
          {!userSession && (
            <LoginHint>
              💡 <span>Log in to save your favorites across devices.</span>
              <SignInLink onClick={() => signIn("discord")}>Sign in</SignInLink>
            </LoginHint>
          )}
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
  color: var(--color-text);
  white-space: pre-line;

  @media (min-width: 641px) {
    font-size: 42px;
  }
`;

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
