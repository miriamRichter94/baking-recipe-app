import styled from "styled-components";

export default function IngredientPreview({ ingredients }) {
  return (
    <IngredientsWrapper>
      {ingredients.slice(0, 4).map((item) => (
        <Ingredient key={item._id}>{item.ingredient.name}</Ingredient>
      ))}
      {ingredients.length > 4 && (
        <Ingredient>+{ingredients.length - 4} more</Ingredient>
      )}
    </IngredientsWrapper>
  );
}

const IngredientsWrapper = styled.div`
  display: none;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
  width: 70%;
  @media (min-width: 900px) {
    display: flex;
  }
`;

const Ingredient = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 40px;
  background: #e8d5c4;
  color: #8b5e3c;
`;
