import RecipeList from "@/components/RecipeList/RecipeList";
import { getAllRecipes } from "@/services/recipeServices";
import StyledButton from "@/components/Button/StyledButton";
import styled from "styled-components";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { useSession } from "next-auth/react";

export default function HomePage({
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
  const router = useRouter();
  const [search, setSearch] = useState("");
  const { data: session } = useSession();
  const fuseSearch = useMemo(
    () =>
      new Fuse(recipes, {
        keys: ["title", "ingredients.ingredient.name"],
        threshold: 0.3,
      }),
    [recipes]
  );

  if (isLoading || !recipes) return <h1>Loading...</h1>;
  if (error) return <h1>ERROR</h1>;

  const filteredRecipes = search
    ? fuseSearch.search(search).map((result) => result.item)
    : recipes;

  return (
    <>
      <PageContent>
        <PageHeader>
          <PageTitle>Baking Recipes</PageTitle>
          <PageSubtitle>Simple recipes, made with love</PageSubtitle>
        </PageHeader>

        <SearchWrapper>
          <SearchLabel htmlFor="search">
            Search for Title or Ingredient
          </SearchLabel>
          <SearchInput
            type="text"
            id="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </SearchWrapper>

        {/* Add button (desktop) */}
        {session && (
          <AddRecipeButtonWrapper>
            <StyledButton
              variant="pill"
              onClick={() => router.push("/form/create")}
            >
              + Add New Recipe
            </StyledButton>
          </AddRecipeButtonWrapper>
        )}
        <RecipeList
          recipes={filteredRecipes}
          favoriteRecipes={favoriteRecipes}
          handleToggleFavoriteRecipe={handleToggleFavoriteRecipe}
          recipesToShop={recipesToShop}
          handleToggleRecipesToShop={handleToggleRecipesToShop}
        />
      </PageContent>

      {/* Mobile FAB */}
      {session && (
        <FAB
          onClick={() => router.push("/form/create")}
          aria-label="Add new recipe"
        >
          +
        </FAB>
      )}
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

const PageSubtitle = styled.p`
  color: var(--color-text-muted);
  font-size: 15px;
  margin: 0;

  @media (min-width: 641px) {
    font-size: 17px;
  }
`;

const AddRecipeButtonWrapper = styled.div`
  text-align: center;
  margin-bottom: 32px;
  display: none;

  @media (min-width: 641px) {
    display: block;
  }
`;

const FAB = styled.button`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: var(--color-brand);
  color: var(--color-surface-alt);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 300;
  box-shadow: 0 4px 16px var(--color-brand-shadow);
  cursor: pointer;
  z-index: 20;

  @media (min-width: 641px) {
    display: none;
  }
`;

const SearchWrapper = styled.div`
  max-width: 100%;
  margin: 0 0 20px;

  @media (min-width: 641px) {
    max-width: 480px;
    margin: 0 auto 32px;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 18px;
  border: 1px solid var(--color-border);
  border-radius: 40px;
  font-size: 15px;
  font-family: var(--font-body), sans-serif;
  background: var(--color-surface-alt);
  outline: none;
  box-sizing: border-box;
  color: var(--color-text);

  &::placeholder {
    color: var(--color-text-muted);
  }

  @media (min-width: 641px) {
    padding: 14px 20px;
  }
`;

const SearchLabel = styled.label`
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--color-text-muted);
`;
