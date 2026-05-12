import { useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import Card from "@/components/Card/Card";
import StyledButton from "@/components/Button/StyledButton";
import { addPantryItem } from "@/services/pantryServices";

export default function PantryAddForm({ ingredients, units, pantry }) {
  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [amount, setAmount] = useState("");

  const pantryIngredientIds = new Set(
    pantry.map((item) => item.ingredient._id)
  );

  const ingredientOptions = ingredients
    .filter((ing) => !pantryIngredientIds.has(ing._id))
    .map((ing) => ({ value: ing._id, label: ing.name }));

  const unitOptions = units.map((unit) => ({
    value: unit._id,
    label: unit.name,
  }));

  async function handleAdd(event) {
    event.preventDefault();
    if (!selectedIngredient || !selectedUnit || !amount) return;

    const success = await addPantryItem({
      ingredient: selectedIngredient.value,
      amount: Number(amount),
      unit: selectedUnit.value,
    });

    if (success) {
      setSelectedIngredient(null);
      setSelectedUnit(null);
      setAmount("");
    }
  }

  return (
    <Card>
      <Card.Title>Add ingredient</Card.Title>
      <AddForm onSubmit={handleAdd}>
        <Field>
          <label htmlFor="pantry-ingredient">Ingredient</label>
          <Select
            inputId="pantry-ingredient"
            options={ingredientOptions}
            placeholder="Select ingredient"
            value={selectedIngredient}
            onChange={setSelectedIngredient}
            required
          />
        </Field>
        <Field>
          <label htmlFor="pantry-amount">Amount</label>
          <AmountInput
            id="pantry-amount"
            type="number"
            min="0"
            step="any"
            placeholder="0"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            required
          />
        </Field>
        <Field>
          <label htmlFor="pantry-unit">Unit</label>
          <Select
            inputId="pantry-unit"
            options={unitOptions}
            placeholder="Select unit"
            value={selectedUnit}
            onChange={setSelectedUnit}
            required
          />
        </Field>
        <StyledButton variant="primary" type="submit">
          Add
        </StyledButton>
      </AddForm>
    </Card>
  );
}

const AddForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;

  @media (min-width: 641px) {
    grid-template-columns: 2fr 1fr 1fr auto;
    align-items: end;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  color: var(--color-text-muted);
`;

const AmountInput = styled.input`
  padding: 10px 12px;
  background: var(--color-surface);
  border-radius: 8px;
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text);
  outline: none;

  &:focus {
    border-color: var(--color-brand);
  }
`;

