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
  background: var(--color-surface-alt);
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 12px rgba(60, 40, 20, 0.07);
`;

const ForLabel = styled.p`
  color: var(--color-text-muted);
  margin: 0 0 14px;
  font-style: italic;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--color-border);
  margin: 0 0 14px;
`;

const IngredientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1.5px solid var(--color-border-alt);
  cursor: pointer;
  accent-color: var(--color-brand);
  flex-shrink: 0;
`;

const IngredientName = styled.span`
  flex: 1;
  font-size: 15px;
  color: ${({ $checked }) =>
    $checked ? "var(--color-text-muted)" : "var(--color-text)"};
  text-decoration: ${({ $checked }) => ($checked ? "line-through" : "none")};
`;

const IngredientAmount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ $checked }) =>
    $checked ? "var(--color-text-muted)" : "var(--color-brand)"};
`;
