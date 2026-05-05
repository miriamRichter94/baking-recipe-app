import styled from "styled-components";

export default function RecipeShoppingList({
  shoppingList,
  recipeNames,
  handleCheck,
  checked,
}) {
  return (
    <RecipeGroup>
      <ForLabel>For: {recipeNames}</ForLabel>
      <Divider />

      {shoppingList.map((item) => {
        const key = `${item.name}-${item.unit}`;
        const isChecked = checked.includes(key);
        return (
          <IngredientRow key={key}>
            <Checkbox
              type="checkbox"
              checked={isChecked}
              onChange={() => handleCheck(key)}
            />
            <IngredientName $checked={isChecked}>{item.name}</IngredientName>
            <IngredientAmount $checked={isChecked}>
              {item.amount} {item.unit}
            </IngredientAmount>
          </IngredientRow>
        );
      })}
    </RecipeGroup>
  );
}

const RecipeGroup = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
`;

const ForLabel = styled.p`
  color: #8c7b6b;
  margin: 0 0 14px;
  font-style: italic;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e8ddd2;
  margin: 0 0 14px;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #e8ddd2;

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid #c49a6c;
  cursor: pointer;
  accent-color: #8b5e3c;
  flex-shrink: 0;
`;

const IngredientName = styled.span`
  flex: 1;
  font-size: 15px;
  color: ${({ $checked }) => ($checked ? "#8c7b6b" : "#3d2b1f")};
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
`;

const IngredientAmount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $checked }) => ($checked ? "#8c7b6b" : "#8b5e3c")};
`;
