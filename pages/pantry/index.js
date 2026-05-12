import { useMemo, useState } from "react";
import useSWR from "swr";
import styled from "styled-components";
import Select from "react-select";
import { useSession } from "next-auth/react";
import AccessDenied from "@/components/AccessDenied/AccessDenied";
import { getAllIngredients } from "@/services/ingredientServices";
import { getAllUnits } from "@/services/unitServices";
import {
  addPantryItem,
  deletePantryItem,
  updatePantryItem,
} from "@/services/pantryServices";

export default function Pantry() {
  const { status } = useSession();
  const { data: pantry, isLoading: pantryLoading } = useSWR(
    status === "authenticated" ? "/api/pantry" : null
  );
  const { data: ingredients } = useSWR("/api/ingredients", getAllIngredients);
  const { data: units } = useSWR("/api/units", getAllUnits);

  const [selectedIngredient, setSelectedIngredient] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [amount, setAmount] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editAmount, setEditAmount] = useState("");

  const pantryIngredientIds = useMemo(
    () => new Set((pantry ?? []).map((item) => item.ingredient._id)),
    [pantry]
  );

  if (status === "loading") return <h1>Loading...</h1>;
  if (status !== "authenticated") return <AccessDenied />;
  if (pantryLoading || !ingredients || !units) return <h1>Loading...</h1>;

  const availableIngredients = ingredients.filter(
    (ing) => !pantryIngredientIds.has(ing._id)
  );

  const ingredientOptions = availableIngredients.map((ing) => ({
    value: ing._id,
    label: ing.name,
  }));

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

  function startEdit(item) {
    setEditingId(item.ingredient._id);
    setEditAmount(item.amount);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditAmount("");
  }

  async function handleSaveEdit(ingredientId) {
    if (!editAmount || Number(editAmount) <= 0) return;
    const success = await updatePantryItem(ingredientId, {
      amount: Number(editAmount),
    });
    if (success) cancelEdit();
  }

  async function handleDelete(ingredientId) {
    await deletePantryItem(ingredientId);
    if (editingId === ingredientId) cancelEdit();
  }

  return (
    <PageContent>
      <PageHeader>
        <PageTitle>My Pantry</PageTitle>
        <Subtitle>
          Track what you already have. Pantry amounts are subtracted from your
          shopping list automatically.
        </Subtitle>
      </PageHeader>

      <Card>
        <CardTitle>Add ingredient</CardTitle>
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
          <AddBtn type="submit">Add</AddBtn>
        </AddForm>
      </Card>

      <Card>
        <CardTitle>Your pantry</CardTitle>
        {(pantry ?? []).length === 0 ? (
          <EmptyText>
            Your pantry is empty. Add ingredients above to get started.
          </EmptyText>
        ) : (
          <List>
            {pantry.map((item) => {
              const ingredientId = item.ingredient._id;
              const isEditing = editingId === ingredientId;
              return (
                <Row key={ingredientId}>
                  <Name>{item.ingredient.name}</Name>
                  {isEditing ? (
                    <>
                      <EditAmountInput
                        type="number"
                        min="0"
                        step="any"
                        value={editAmount}
                        onChange={(event) => setEditAmount(event.target.value)}
                      />
                      <UnitLabel>{item.unit.name}</UnitLabel>
                      <RowActions>
                        <SaveBtn
                          type="button"
                          onClick={() => handleSaveEdit(ingredientId)}
                        >
                          Save
                        </SaveBtn>
                        <CancelBtn type="button" onClick={cancelEdit}>
                          Cancel
                        </CancelBtn>
                      </RowActions>
                    </>
                  ) : (
                    <>
                      <Amount>
                        {item.amount} {item.unit.name}
                      </Amount>
                      <RowActions>
                        <EditBtn type="button" onClick={() => startEdit(item)}>
                          Edit
                        </EditBtn>
                        <RemoveBtn
                          type="button"
                          onClick={() => handleDelete(ingredientId)}
                          aria-label={`Remove ${item.ingredient.name}`}
                        >
                          ×
                        </RemoveBtn>
                      </RowActions>
                    </>
                  )}
                </Row>
              );
            })}
          </List>
        )}
      </Card>
    </PageContent>
  );
}

const PageContent = styled.div`
  padding: 24px 20px;
  max-width: 720px;
  margin: 0 auto;

  @media (min-width: 641px) {
    padding: 36px 32px;
  }
`;

const PageHeader = styled.div`
  margin-bottom: 24px;
`;

const PageTitle = styled.h1`
  font-family: var(--heading-font);
  font-size: 28px;
  font-weight: 400;
  margin: 0 0 8px;

  @media (min-width: 641px) {
    font-size: 36px;
  }
`;

const Subtitle = styled.p`
  color: var(--color-text-muted);
  font-size: 14px;
  margin: 0;
  line-height: 1.5;
`;

const Card = styled.section`
  background: var(--color-surface-alt);
  border-radius: 12px;
  padding: 20px 22px;
  box-shadow: 0 2px 12px var(--color-shadow);
  margin-bottom: 20px;
`;

const CardTitle = styled.h2`
  font-family: var(--heading-font);
  font-size: 18px;
  font-weight: 400;
  margin: 0 0 14px;
`;

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

const AddBtn = styled.button`
  background: var(--color-brand);
  color: var(--color-surface-alt);
  border: none;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  height: 38px;
`;

const EmptyText = styled.p`
  color: var(--color-text-muted);
  margin: 0;
  font-size: 14px;
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
`;

const Name = styled.span`
  flex: 1;
  font-size: 15px;
  color: var(--color-text);
`;

const Amount = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: var(--color-brand);
`;

const UnitLabel = styled.span`
  font-size: 14px;
  color: var(--color-text-muted);
`;

const EditAmountInput = styled.input`
  width: 80px;
  padding: 6px 10px;
  background: var(--color-surface);
  border-radius: 6px;
  border: 1px solid var(--color-border);
  font-size: 14px;
  color: var(--color-text);
  outline: none;

  &:focus {
    border-color: var(--color-brand);
  }
`;

const RowActions = styled.div`
  display: flex;
  gap: 8px;
`;

const EditBtn = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--color-text);
  cursor: pointer;
`;

const SaveBtn = styled.button`
  background: var(--color-brand);
  color: var(--color-surface-alt);
  border: none;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
`;

const CancelBtn = styled.button`
  background: none;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 13px;
  color: var(--color-text);
  cursor: pointer;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: var(--color-danger);
  cursor: pointer;
  font-size: 22px;
  line-height: 1;
  padding: 0 4px;
`;
