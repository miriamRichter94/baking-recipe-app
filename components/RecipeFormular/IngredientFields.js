import Select from "react-select";
import styled from "styled-components";

export default function IngredientFields({
  ingredients,
  recipeIngredient,
  units,
  onChange,
  onRemove,
}) {
  const ingredientOptions = ingredients.map((ingredients) => ({
    value: ingredients._id,
    label: ingredients.name,
  }));

  const unitOptions = units.map((unit) => ({
    value: unit._id,
    label: unit.name,
  }));

  return (
    <DesktopIngredientRow>
      {/* Ingredient dropdown */}
      <Select
        inputId="ingredient"
        options={ingredientOptions}
        placeholder="Ingredient"
        onChange={(selected) => onChange("ingredient", selected.value)}
        value={
          ingredientOptions.find(
            (o) => o.value === recipeIngredient.ingredient
          ) || null
        }
        required
      />

      {/* Amount */}
      <AmmountInput
        type="number"
        id="amount"
        name="amount"
        placeholder="Amt"
        value={recipeIngredient.amount}
        onChange={(e) => onChange("amount", e.target.value)}
        required
      />

      {/* Unit dropdown */}
      <Select
        inputId="unit"
        options={unitOptions}
        placeholder="Unit"
        onChange={(selected) => onChange("unit", selected.value)}
        value={
          unitOptions.find((o) => o.value === recipeIngredient.unit) || null
        }
        required
      />

      {onRemove && (
        <RemoveBtn type="button" onClick={onRemove} style={{ fontSize: 18 }}>
          ×
        </RemoveBtn>
      )}
    </DesktopIngredientRow>
  );
}

const DesktopIngredientRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  @media (min-width: 641px) {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
    align-items: center;
  }
`;

const AmmountInput = styled.input`
  width: 56px;
  box-sizing: border-box;
  padding: 10px 12px;
  background: var(--color-surface);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text);
  outline: none;

  @media (min-width: 641px) {
    border-radius: 8px;
    flex: 1;
  }

  &:focus {
    border-color: var(--color-brand);
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
`;
