import styled from "styled-components";
import RecipePreview from "./RecipePreview";

export default function RecipeList({
  recipes,
  favoriteRecipes,
  handleToggleFavoriteRecipe,
  recipesToShop,
  handleToggleRecipesToShop,
}) {
  return (
    <ListGrid>
      {recipes.map((recipe) => (
        <RecipePreview
          key={recipe._id}
          recipe={recipe}
          favoriteRecipes={favoriteRecipes}
          onToggleFavoriteRecipe={handleToggleFavoriteRecipe}
          recipesToShop={recipesToShop}
          onToggleRecipesToShop={handleToggleRecipesToShop}
        />
      ))}
    </ListGrid>
  );
}

const ListGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 641px) {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
`;
