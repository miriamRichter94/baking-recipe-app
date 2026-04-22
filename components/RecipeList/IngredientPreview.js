import styled from "styled-components";

export default function IngredientPrview({ ingredients }) {
  return (
    <IngredientsWrapper>
      {ingredients.map((recipeIngredient) => (
        <Ingredient key={recipeIngredient._id}>
          {recipeIngredient.ingredient.name}
        </Ingredient>
      ))}
    </IngredientsWrapper>
  );
}

const IngredientsWrapper = styled.div`
  font-size: 0.75em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
`;

const Ingredient = styled.span`
  border: 1px solid darkslategray;
  background-color: lightgray;
  padding: 4px;
`;
