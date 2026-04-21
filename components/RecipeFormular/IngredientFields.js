import styled from "styled-components";

export default function IngredientFields({
  ingredients,
  recipeIngredient,
  units,
  onChange,
}) {
  return (
    <StyledFieldSets>
      <label htmlFor="ingredient">Ingredient</label>
      <select
        id="ingredient"
        name="ingredient"
        value={recipeIngredient.ingredient}
        onChange={(event) => onChange("ingredient", event.target.value)}
      >
        <option value="">Select an Ingredient</option>
        {ingredients.map((ingredient) => (
          <option value={ingredient._id} key={ingredient._id}>
            {ingredient.name}
          </option>
        ))}
      </select>

      <label htmlFor="amount">Amount</label>
      <input
        type="number"
        id="amount"
        name="amount"
        value={recipeIngredient.amount}
        onChange={(event) => onChange("amount", event.target.value)}
      />

      <label htmlFor="unit">Unit</label>
      <select
        id="unit"
        name="unit"
        value={recipeIngredient.unit}
        onChange={(event) => onChange("unit", event.target.value)}
      >
        <option value="">Select an Unit</option>
        {units.map((unit) => (
          <option value={unit._id} key={unit._id}>
            {unit.name}
          </option>
        ))}
      </select>
    </StyledFieldSets>
  );
}

const StyledFieldSets = styled.fieldset`
  display: flex;
  flex-direction: column;
`;
