import styled from "styled-components";

// Shows a compact horizontal list of ingredient names on the recipe card
export default function IngredientPreview({ ingredients }) {
  return (
    <Wrapper>
      {ingredients.slice(0, 4).map((item) => (
        <Tag key={item._id}>{item.ingredient.name}</Tag>
      ))}
      {ingredients.length > 4 && (
        <Tag>+{ingredients.length - 4} more</Tag>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
`;

const Tag = styled.span`
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 40px;
  background: #e8d5c4;
  color: #8b5e3c;
`;
