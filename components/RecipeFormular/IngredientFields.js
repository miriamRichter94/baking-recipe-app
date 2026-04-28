import {
  DesktopIngredientRow,
  IngredientInput,
  UnitSelect,
  RemoveBtn,
} from "@/styles/components/FormPage.styled";

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
      <UnitSelect
        style={{ width: "auto", flex: 2 }}
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
      </UnitSelect>

      {/* Amount */}
      <IngredientInput
        style={{ flex: 1, boxSizing: "border-box" }}
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
