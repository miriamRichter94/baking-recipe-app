import styled from "styled-components";

export default function IngredientFields({
  ingredients,
  recipeIngredient,
  units,
  onChange,
  onRemove,
}) {
  return (
    <DesktopIngredientRow>
      {/* Ingredient dropdown */}
      <IngredientSelect
        id="ingredient"
        name="ingredient"
        value={recipeIngredient.ingredient}
        onChange={(e) => onChange("ingredient", e.target.value)}
      >
        <option value="">Select ingredient</option>
        {ingredients.map((ing) => (
          <option value={ing._id} key={ing._id}>
            {ing.name}
          </option>
        ))}
      </IngredientSelect>

      {/* Amount */}
      <IngredientInput
        type="number"
        id="amount"
        name="amount"
        placeholder="Amt"
        value={recipeIngredient.amount}
        onChange={(e) => onChange("amount", e.target.value)}
      />

      {/* Unit dropdown */}
      <UnitSelect
        id="unit"
        name="unit"
        value={recipeIngredient.unit}
        onChange={(e) => onChange("unit", e.target.value)}
      >
        <option value="">Unit</option>
        {units.map((unit) => (
          <option value={unit._id} key={unit._id}>
            {unit.name}
          </option>
        ))}
      </UnitSelect>

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

const IngredientInput = styled.input`
  width: 56px;
  padding: 10px 12px;
  background: #faf6f1;
  border-radius: 10px;
  border: 1px solid #e8ddd2;
  font-size: 14px;
  font-family: var(--font-body), sans-serif;
  color: #3d2b1f;
  outline: none;

  @media (min-width: 641px) {
    padding: 10px 12px;
    border: 1px solid #e8ddd2;
    border-radius: 8px;
    font-size: 14px;
    font-family: var(--font-body), sans-serif;
    outline: none;
    color: #3d2b1f;
    flex: 1;
    box-sizing: border-box;
  }

  &:focus {
    border-color: #8b5e3c;
  }
`;

const IngredientSelect = styled.select`
  flex: 2;
  min-width: 0;
  padding: 10px 4px;
  background: #faf6f1;
  border-radius: 10px;
  border: 1px solid #e8ddd2;
  font-size: 14px;
  color: #3d2b1f;

  @media (min-width: 641px) {
    flex: 2;
    padding: 10px 8px;
    border-radius: 8px;
    background: #ffffff;
  }
`;

const UnitSelect = styled.select`
  width: 58px;
  padding: 10px 4px;
  background: #faf6f1;
  border-radius: 10px;
  border: 1px solid #e8ddd2;
  font-size: 14px;
  color: #3d2b1f;

  @media (min-width: 641px) {
    width: 70px;
    padding: 10px 8px;
    border-radius: 8px;
    background: #ffffff;
  }
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #8c7b6b;
  cursor: pointer;
  font-size: 16px;
  padding: 0;
  line-height: 1;
`;
